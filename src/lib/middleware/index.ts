import { createMiddleware } from '@solidjs/start/middleware';
import { attachSession } from './session.ts';

export default createMiddleware({
    onRequest: [
        attachSession
    ]
});
