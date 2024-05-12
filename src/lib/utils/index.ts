import { nanoid } from 'nanoid';

export function generateCode (length: number) {
    return nanoid(length);    
}

export function navigateTo (url: string) {
    window.location = url;
}
