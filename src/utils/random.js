import crypto from 'crypto';

export default (length = 6, type = 'alphanumeric') => {
    if (!(length >= 0 && Number.isFinite(length))) {
        throw new TypeError('Expected a `length` to be a non-negative finite number');
    }

    let characters;
    switch (type) {
        case 'numeric':
            characters = '0123456789'.split('');
            break;
        case 'url-safe':
            characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._~'.split('');
            break;
        case 'alphanumeric':
        default:
            characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('');
            break;
    }

    // Generating entropy is faster than complex math operations, so we use the simplest way
    const characterCount = characters.length;
    const maxValidSelector = (Math.floor(0x10000 / characterCount) * characterCount) - 1; // Using values above this will ruin distribution when using modular division
    const entropyLength = 2 * Math.ceil(1.1 * length); // Generating a bit more than required so chances we need more than one pass will be really low
    let string = '';
    let stringLength = 0;

    while (stringLength < length) { // In case we had many bad values, which may happen for character sets of size above 0x8000 but close to it
        const entropy = crypto.randomBytes(entropyLength);
        let entropyPosition = 0;

        while (entropyPosition < entropyLength && stringLength < length) {
            const entropyValue = entropy.readUInt16LE(entropyPosition);
            entropyPosition += 2;
            if (entropyValue > maxValidSelector) { // Skip values which will ruin distribution when using modular division
                // eslint-disable-next-line no-continue
                continue;
            }

            string += characters[entropyValue % characterCount];
            // eslint-disable-next-line no-plusplus
            stringLength++;
        }
    }

    return string;
};
