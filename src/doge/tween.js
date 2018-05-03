/**
* @typedef {object} IDrawable
* @property {number} x
* @property {number} y
*/

/**
 * @param {IDrawable} drawalbe
 */
export function tween(drawalbe) {
    return {
        fromPos: {
            x: drawalbe.x,
            y: drawalbe.y
        },
        /** 
         * @param {IDrawable} props
         * @param {number} duration
        */
        to: function (props, duration) {

            return new Promise(function (resolve, reject) {
                // setTimeout(resolve, 100, 'foo');
            });
        }
    }
}