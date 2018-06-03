import { Group } from "../Group";

export function EventEmitter() {
    return {
        /**
         * @type {{[x:string]:IGroup<EventCallbackFn>}}
         */
        callbackGroupMap: {},
        /**
         * @param {EventItem} item
         */
        emit: function (item) {
            var group = this.callbackGroupMap[item.type];
            if (group === void 0) {
                console.warn(`Type: ${type} never been registered!`);
            } else {
                if (item.target === null) {
                    item.target = this;
                }
                item.currentTarget = this;
                group.forEach(function (callback) {
                    callback.apply(null, item);
                });
            }
        },
        /**
         * @param {string} type
         * @param {EventCallbackFn} callback
         * @param {*} thisArg
         */
        on: function (type, callback) {
            var group = this.callbackGroupMap[type];
            if (group === void 0) {
                group = Group();
                this.callbackGroupMap[type] = group;
            }
            group.add(callback);
        },
        once: function (type, callback) {
            var that = this;
            var wrapperFn = function (item) {
                that.off(wrapperFn);
                callback.apply(null, item);
            }
            this.on(type, wrapperFn);
        },
        off: function (type, callback) {
            var group = this.callbackGroupMap[type];
            if (group === void 0) {
                console.warn(`Type: ${type} never been registered!`);
            } else {
                group.remove(callback);
            }
        }
    };
}

