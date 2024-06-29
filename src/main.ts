import { createApp } from 'h3';
import { createRouter } from 'h3';

import languageModels from './handlers/language-models';

const app = createApp();
const router = createRouter();

router.post('/lm/rpc', languageModels);

app.use(router);

export default app;
