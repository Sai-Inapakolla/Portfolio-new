import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const databaseName = process.env.MONGODB_DB || 'portfolio';
const username = process.env.LEETCODE_USERNAME || 'user_x_576';

function normalizeBadgeIcon(icon) {
  if (icon.startsWith('//')) return `https:${icon}`;
  if (icon.startsWith('/')) return `https://leetcode.com${icon}`;
  return icon;
}

if (!uri) throw new Error('MONGODB_URI is required');

const query = `
  query userAchievements($username: String!) {
    matchedUser(username: $username) {
      username
      submitStats: submitStatsGlobal { acSubmissionNum { difficulty count } }
      badges { displayName icon creationDate }
    }
    recentSubmissionList(username: $username, limit: 10) {
      title titleSlug timestamp statusDisplay
    }
  }
`;

const response = await fetch('https://leetcode.com/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Referer: `https://leetcode.com/u/${encodeURIComponent(username)}/`,
    'User-Agent': 'portfolio-achievements-updater/1.0',
  },
  body: JSON.stringify({ query, variables: { username } }),
});
if (!response.ok) throw new Error(`LeetCode returned HTTP ${response.status}`);

const payload = await response.json();
const matchedUser = payload.data?.matchedUser;
if (!matchedUser) throw new Error(`LeetCode user not found: ${username}`);

const counts = Object.fromEntries(matchedUser.submitStats.acSubmissionNum.map((entry) => [entry.difficulty.toLowerCase(), entry.count]));
const data = {
  username: matchedUser.username,
  total: Number(counts.all || 0),
  easy: Number(counts.easy || 0),
  medium: Number(counts.medium || 0),
  hard: Number(counts.hard || 0),
  recent: (payload.data.recentSubmissionList || [])
    .filter((submission) => submission.statusDisplay === 'Accepted')
    .map((submission) => ({
      title: submission.title,
      url: `https://leetcode.com/problems/${submission.titleSlug}/`,
      solvedAt: new Date(Number(submission.timestamp) * 1000).toISOString(),
    })),
  badges: matchedUser.badges.map((badge) => ({
    name: badge.displayName,
    icon: normalizeBadgeIcon(badge.icon),
    earnedAt: badge.creationDate,
  })),
  fetchedAt: new Date().toISOString(),
};

const client = new MongoClient(uri, { maxPoolSize: 2, connectTimeoutMS: 5000, serverSelectionTimeoutMS: 5000 });
try {
  await client.connect();
  await client.db(databaseName).collection('leetcode').updateOne(
    { _id: 'achievements' },
    { $set: { data, updatedAt: new Date() }, $setOnInsert: { _id: 'achievements' } },
    { upsert: true },
  );
  console.log(`Updated LeetCode achievements for ${data.username}: ${data.total} solved`);
} finally {
  await client.close();
}
