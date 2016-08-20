var xstl;
(function (xstl) {
    var Dictionary = (function () {
        function Dictionary(toStrFunction) {
            this.table = {};
            this.nElements = 0;
            this.toStr = toStrFunction || xstl.defaultToString;
        }
        var d = __define,c=Dictionary,p=c.prototype;
        p.getValue = function (key) {
            var pair = this.table['$' + this.toStr(key)];
            if (xstl.isUndefined(pair)) {
                return undefined;
            }
            return pair.value;
        };
        p.setValue = function (key, value) {
            if (xstl.isUndefined(key) || xstl.isUndefined(value)) {
                return undefined;
            }
            var ret;
            var k = '$' + this.toStr(key);
            var previousElement = this.table[k];
            if (xstl.isUndefined(previousElement)) {
                this.nElements++;
                ret = undefined;
            }
            else {
                ret = previousElement.value;
            }
            this.table[k] = {
                key: key,
                value: value
            };
            return ret;
        };
        p.remove = function (key) {
            var k = '$' + this.toStr(key);
            var previousElement = this.table[k];
            if (!xstl.isUndefined(previousElement)) {
                delete this.table[k];
                this.nElements--;
                return previousElement.value;
            }
            return undefined;
        };
        p.keys = function () {
            var array = [];
            for (var name_1 in this.table) {
                if (xstl.has(this.table, name_1)) {
                    var pair = this.table[name_1];
                    array.push(pair.key);
                }
            }
            return array;
        };
        p.values = function () {
            var array = [];
            for (var name_2 in this.table) {
                if (xstl.has(this.table, name_2)) {
                    var pair = this.table[name_2];
                    array.push(pair.value);
                }
            }
            return array;
        };
        p.forEach = function (callback) {
            for (var name_3 in this.table) {
                if (xstl.has(this.table, name_3)) {
                    var pair = this.table[name_3];
                    var ret = callback(pair.key, pair.value);
                    if (ret === false) {
                        return;
                    }
                }
            }
        };
        p.containsKey = function (key) {
            return !xstl.isUndefined(this.getValue(key));
        };
        p.clear = function () {
            this.table = {};
            this.nElements = 0;
        };
        p.size = function () {
            return this.nElements;
        };
        p.isEmpty = function () {
            return this.nElements <= 0;
        };
        p.toString = function () {
            var toret = '{';
            this.forEach(function (k, v) {
                toret += "\n\t" + k + " : " + v;
            });
            return toret + '\n}';
        };
        return Dictionary;
    }());
    xstl.Dictionary = Dictionary;
    egret.registerClass(Dictionary,'xstl.Dictionary');
     // End of dictionary
})(xstl || (xstl = {}));
//# sourceMappingURL=Dictionary.js.map