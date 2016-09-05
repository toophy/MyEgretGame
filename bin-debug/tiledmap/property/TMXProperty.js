var tiled;
(function (tiled) {
    /**
     * 属性VO,存储map、tileset、tile相关属性数据
     */
    var TMXProperty = (function () {
        function TMXProperty() {
            /**
             * id
             * @version Egret 3.0.3
             * */
            this.gid = 0;
        }
        var d = __define,c=TMXProperty,p=c.prototype;
        return TMXProperty;
    }());
    tiled.TMXProperty = TMXProperty;
    egret.registerClass(TMXProperty,'tiled.TMXProperty');
})(tiled || (tiled = {}));
//# sourceMappingURL=TMXProperty.js.map