import RedisController from '~/lib/redis';

export const setAlias = async (sessionId: string, alias: string): Promise<void> => {
    'use server';
    const redis = await RedisController();
    return redis.set(`session-${sessionId}`, alias, false);
};


