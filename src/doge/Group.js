export function Group(children) {
    return {
        children: Array.isArray(children) ? children : [],
        add: function (child) {
            this.children.push(child);
        },
        remove: function (child) {
            var index = this.children.indexOf(child);
            this.children.splice(0, 1);
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
}

