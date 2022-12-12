! function (e) {
    function t(n) {
        if (o[n]) return o[n].exports;
        var i = o[n] = {
            exports: {},
            id: n,
            loaded: !1
        };
        return e[n].call(i.exports, i, i.exports, t), i.loaded = !0, i.exports
    }
    var o = {};
    return t.m = e, t.c = o, t.p = "", t(0)
}([function (e, t) {
    var o = AFRAME.utils.debug,
        n = AFRAME.utils.coordinates,
        i = o("components:look-at:warn"),
        r = n.isCoordinates || n.isCoordinate;
    delete AFRAME.components["look-at"], AFRAME.registerComponent("look-at", {
        schema: {
            default: "0 0 0",
            parse: function (e) {
                return r(e) || "object" == typeof e ? n.parse(e) : e
            },
            stringify: function (e) {
                return "object" == typeof e ? n.stringify(e) : e
            }
        },
        init: function () {
            this.target3D = null, this.vector = new THREE.Vector3, this.cameraListener = AFRAME.utils.bind(this.cameraListener, this), this.el.addEventListener("componentinitialized", this.cameraListener), this.el.addEventListener("componentremoved", this.cameraListener)
        },
        update: function () {
            var e, t = this,
                o = t.data;
            return !o || "object" == typeof o && !Object.keys(o).length ? t.remove() : "object" == typeof o ? this.lookAt(new THREE.Vector3(o.x, o.y, o.z)) : (e = t.el.sceneEl.querySelector(o), e ? e.hasLoaded ? t.beginTracking(e) : e.addEventListener("loaded", function () {
                t.beginTracking(e)
            }) : void i('"' + o + '" does not point to a valid entity to look-at'))
        },
        tick: function () {
            var e = new THREE.Vector3;
            return function (t) {
                var o = this.target3D;
                o && (o.getWorldPosition(e), this.lookAt(e))
            }
        }(),
        remove: function () {
            this.el.removeEventListener("componentinitialized", this.cameraListener), this.el.removeEventListener("componentremoved", this.cameraListener)
        },
        beginTracking: function (e) {
            this.target3D = e.object3D
        },
        cameraListener: function (e) {
            e.detail && "camera" === e.detail.name && this.update()
        },
        lookAt: function (e) {
            var t = this.vector,
                o = this.el.object3D;
            this.el.getObject3D("camera") ? t.subVectors(o.position, e).add(o.position) : t.copy(e), o.lookAt(t)
        }
    })
}]);