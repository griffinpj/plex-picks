import RedisController from '~/lib/redis';
import type { User } from '~/types/user';

const randomAliases = [
    'Fancy Cow',
    'Slippery Snake',
    'Whispering Wind',
    'Golden Goose',
    'Silent Wolf',
    'Sneaky Fox',
    'Mystic Moon',
    'Gentle Tiger',
    'Sapphire Star',
    'Twinkling Dolphin',
    'Velvet Lion',
    'Whirling Storm',
    'Dancing Dragonfly',
    'Sparkling Sparrow',
    'Crimson Phoenix',
    'Shimmering Shark',
    'Majestic Eagle',
    'Enchanted Butterfly',
    'Radiant Raven',
    'Sapphire Serpent',
    'Golden Griffin',
    'Violet Vixen',
    'Echoing Elk',
    'Whispering Willow',
    'Glimmering Gull',
    'Ember Elephant',
    'Luminous Lizard',
    'Twilight Turtle',
    'Gossamer Giraffe'
];

export const getUser = async (sessionId: string): Promise<User> => {
    'use server';
    const redis = await RedisController();
    return redis.get(`session-${sessionId}`);
};

export const setUser = async (sessionId: string, user: User): Promise<void> => {
    'use server';
    const redis = await RedisController();

    return redis.set(`session-${sessionId}`, user);
};

export const createUser = async (sessionId: string): Promise<User> => {
    'use server';
    const randomIndex = Math.floor(Math.random() * randomAliases.length);
    const newUser = { alias: randomAliases[randomIndex] } as User;

    await setUser(sessionId, newUser);
    return new Promise((resolve) => resolve(newUser));
};

export const getAlias = async (sessionId: string) : Promise<string> => {
    'use server';
    const user = (await getUser(sessionId)) as User;
    
    return new Promise((resolve) => resolve(user?.alias));
};

export const setPlexPin = async (sessionId: string, pin: number): Promise<void> => {
    'use server';
    const user = (await getUser(sessionId)) as User;

    const newUser = { ...user, plex_pin: pin } as User;
    return setUser(sessionId, newUser);
};

export const setAlias = async (sessionId: string, alias: string): Promise<void> => {
    'use server';
    let user = (await getUser(sessionId)) as User;

    const newUser = { ...user, alias: alias } as User;
    return setUser(sessionId, newUser);
};


