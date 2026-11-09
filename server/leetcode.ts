type LeetCodeAchievements = {
  username: string;
  total: number;
  easy: number;
  medium: number;
  hard: number;
  recent: { title: string; url: string; solvedAt: string }[];
  badges: { name: string; icon: string; earnedAt: string }[];
  fetchedAt: string;
};

const LEETCODE_GRAPHQL_URL = 'https://leetcode.com/graphql';

function normalizeBadgeIcon(icon: string) {
  if (icon.startsWith('//')) return `https:${icon}`;
  if (icon.startsWith('/')) return `https://leetcode.com${icon}`;
  return icon;
}

const QUERY = `
  query userAchievements($username: String!) {
    matchedUser(username: $username) {
      username
      submitStats: submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
        }
      }
      badges {
        displayName
        icon
        creationDate
      }
    }
    recentSubmissionList(username: $username, limit: 10) {
      title
      titleSlug
      timestamp
      statusDisplay
    }
  }
`;

type GraphQLResponse = {
  data?: {
    matchedUser?: {
      username: string;
      submitStats: { acSubmissionNum: { difficulty: string; count: number }[] };
      badges: { displayName: string; icon: string; creationDate: string }[];
    } | null;
    recentSubmissionList?: { title: string; titleSlug: string; timestamp: string; statusDisplay: string }[];
  };
};

export async function fetchLeetCodeAchievements(username: string): Promise<LeetCodeAchievements> {
  const response = await fetch(LEETCODE_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Referer: `https://leetcode.com/u/${encodeURIComponent(username)}/`,
      'User-Agent': 'portfolio-achievements-updater/1.0',
    },
    body: JSON.stringify({ query: QUERY, variables: { username } }),
  });

  if (!response.ok) throw new Error(`LeetCode returned HTTP ${response.status}`);
  const payload = await response.json() as GraphQLResponse;
  const matchedUser = payload.data?.matchedUser;
  if (!matchedUser) throw new Error(`LeetCode user not found: ${username}`);

  const counts = Object.fromEntries(matchedUser.submitStats.acSubmissionNum.map((entry) => [entry.difficulty.toLowerCase(), entry.count]));
  const recent = (payload.data?.recentSubmissionList || [])
    .filter((submission) => submission.statusDisplay === 'Accepted')
    .map((submission) => ({
      title: submission.title,
      url: `https://leetcode.com/problems/${submission.titleSlug}/`,
      solvedAt: new Date(Number(submission.timestamp) * 1000).toISOString(),
    }));

  return {
    username: matchedUser.username,
    total: Number(counts.all || 0),
    easy: Number(counts.easy || 0),
    medium: Number(counts.medium || 0),
    hard: Number(counts.hard || 0),
    recent,
    badges: matchedUser.badges.map((badge) => ({
      name: badge.displayName,
      icon: normalizeBadgeIcon(badge.icon),
      earnedAt: badge.creationDate,
    })),
    fetchedAt: new Date().toISOString(),
  };
}
