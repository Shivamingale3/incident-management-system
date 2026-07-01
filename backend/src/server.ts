import { app } from './app.js';
import { env } from './config/env.js';

app.listen(env.APP_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${env.APP_PORT}`);
});
