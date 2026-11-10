import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb+srv://TeamX-Admin:Inapakolla1@teamx-db.e03gtye.mongodb.net/Portfolio_db?retryWrites=true&w=majority';
const uriDatabase = new URL(uri).pathname.replace(/^\/+/, '');
const databaseName = process.env.MONGODB_DB || decodeURIComponent(uriDatabase) || 'Portfolio_db';

console.log('Connecting to database:', databaseName);
const client = await MongoClient.connect(uri);
const db = client.db(databaseName);
const col = db.collection('portfolio');

const doc = await col.findOne({ _id: 'portfolio' });
if (!doc) {
  console.log('No existing portfolio doc found in database.');
} else {
  console.log('Found existing portfolio document. Updating education and seasons to Academic Details...');
  
  const { education, seasons } = await import('../src/data/portfolio.ts');
  
  const updatedData = {
    ...doc.data,
    education,
    seasons,
  };

  await col.updateOne(
    { _id: 'portfolio' },
    { $set: { data: updatedData, updatedAt: new Date() } }
  );
  console.log('Successfully updated portfolio document in MongoDB with Academic Details!');
}

await client.close();
