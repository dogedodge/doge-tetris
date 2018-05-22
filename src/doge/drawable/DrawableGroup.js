import { duang } from '../duang';
import { Drawable } from "./Drawable";
import { Group } from "../Group";

export function DrawableGroup() {
    var _drawable = Drawable();
    var _group = Group();
    return Object.assign(duang(_drawable), _group, {
        /** @param {_drawable} child */
        add: function (child) {
            if (child === void 0 || typeof child['draw'] !== 'function') {
                throw 'error: only drawable can be added';
            } else {
                child.parent = this;
                _group.add.call(this, child);
            }
        },
        draw: function (ctx) {
            _drawable.draw.call(this, ctx);
            this.forEach(function (child) {
                child.draw(ctx);
            });
        }
    });
}