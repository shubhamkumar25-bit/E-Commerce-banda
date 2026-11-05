import app from './src/app';
import { connectDatabase } from './src/config/database';

const PORT = process.env.PORT || 5000;

async function bootstrap() {
  await connectDatabase();
  app.listen(PORT, () => {
    console.log(`🌿 JEEVAN SHAILI Ayurvedic E-Commerce Server is running on port ${PORT}`);
    console.log(`📍 Origin: Banda, Uttar Pradesh, India`);
    console.log(`🚀 Ready for orders, payments & admin management`);
  });
}

bootstrap().catch((err) => {
  console.error('Fatal startup error: MongoDB connection is required before starting the API.', err instanceof Error ? err.message : err);
  process.exitCode = 1;
});
