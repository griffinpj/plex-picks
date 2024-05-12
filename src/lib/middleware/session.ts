import { useSession } from "vinxi/http";

export async function attachSession (request: Request) {
    const session = await useSession({
        password: import.meta.env.VITE_SESSION_SECRET
    });

    // TODO be able to let user attach session name ....
    // persist with session id ?

    request.locals = {};
    request.locals.session = session;
}
