/**
 * generate random number in [from, to]
 * @param {number} from 
 * @param {number} to 
 */
export function randomInt(from, to) {
    from = Math.floor(from);
    to = Math.floor(to);
    return Math.floor(Math.random() * (to - from) + from);
}