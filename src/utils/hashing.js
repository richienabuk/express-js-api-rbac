import crypto from 'crypto';

export const hash = (string) => crypto.createHash('sha256').update(string).digest('base64');

export const hash_compare = (first_item, second_item) => Object.is(first_item, second_item);
