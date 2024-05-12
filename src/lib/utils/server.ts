import RedisController from '~/lib/redis';
export async function getGroup (id: string) {
    'use server';
    return RedisController.get(id);
}
