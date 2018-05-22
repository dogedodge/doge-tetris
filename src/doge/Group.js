export function Group(children) {
    var self = {
        children: Array.isArray(children) ? children : [],
        add: function (child) {
            this.children.push(child);
        },
        remove: function (child) {
            var index = this.children.indexOf(child);
            if (index >= 0) {
                this.children.splice(index, 1);
            } else {
                console.warn('child not found', child);
            }
        },
        removeAll: function () {
            this.children = [];
        },
        /**
         * @returns {number}
         */
        size: function () {
            return this.children.length;
        },
        /**
         * @param {(value:any, index:number, array:any[])=>void} callbackfn
         */
        forEach: function (callbackfn, thisArg) {
            // avoid splice while for loop
            this.children.slice().forEach(callbackfn, thisArg);
        }
    }

    return self;
}