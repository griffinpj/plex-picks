import { useSession } from "vinxi/http";

export async function attachSession (req: RequestMiddleware) {
    const session = await useSession({
        password: import.meta.env.VITE_SESSION_SECRET
    });

    // issue on mobile, session changing every refresh...

    req.locals.session = session;
}
