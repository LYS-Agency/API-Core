import mongoose from 'mongoose';

export const connectToTheDatabase = async (): Promise<void> => {
  console.log('lol: ', process.env.DATABASE_CONNECT_URL);
  await mongoose
    .connect(
      process.env.DATABASE_CONNECT_URL
        ? process.env.DATABASE_CONNECT_URL
        : 'mongodb://localhost:27017',
    )
    .then(async (): Promise<void> => {
      console.log('Database connection successful');
      await checkDatabaseSize();
    })
    .catch((error: any) => {
      throw new Error('Database error: ' + error.message);
    });
};

export const checkDatabaseSize = async (): Promise<void> => {
  const db = mongoose.connection;
  if (!db || !db.db) return;
  const stats = await db.db.stats();
  const databaseSizeInBytes = stats.dataSize + stats.indexSize;
  const databaseSizeInMB = (databaseSizeInBytes / 1024 / 1024).toFixed(2);
  console.log(`La taille de la base de données est de ${databaseSizeInMB} MB.`);
};
