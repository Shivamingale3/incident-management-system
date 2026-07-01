import { app } from './app.js';
import { env } from './config/env.js';
import { logger } from './utils/logger.js';

app.listen(env.APP_PORT, () => {
  logger.info(`Server is running on port ${env.APP_PORT}`);
});
