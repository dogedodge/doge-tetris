/**
 * 
 * @param {string} type 
 * @param {any} data 
 */
export function EventItem(type, data) {
    return {
        type: type,
        data: data,
        target: null,
        currentTarge: null,
    }
}