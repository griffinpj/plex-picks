import { createMiddleware } from '@solidjs/start/middleware';
import { attachSession } from './session';

export default createMiddleware({
    onRequest: [
        attachSession
    ]
});
