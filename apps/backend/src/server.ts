import mongoose from 'mongoose';
import app from './app';
import config from './app/config';


async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    
    app.listen(config.port, () =>
      console.log(`🚀 Server running on port ${config.port}`))
    
  } catch (err) {
    console.log(err);
  }
}

main();

// process.on('unhandledRejection', () => {
//   console.log(`Unhandled Rejection denoted. server is shuting down...`);
//   if (server) {
//     server.close(() => {
//       process.exit(1);
//     });
//   }
//   process.exit(1);
// });

// process.on('uncaughtException', () => {
//   process.exit(1);
// });