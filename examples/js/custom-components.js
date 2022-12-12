AFRAME.registerComponent('reparent', {
  schema: {
    parent: { type: 'selector', default: null },
  },
  update: function () {
    const el = this.el;
    const parent = this.data.parent;
    if (el.parentElement == parent) {
      // We're already a child of the intended parent, do nothing
      return;
    };
    // Reparent, once object3D is ready
    reparent = function () {
      // Attach the object3D to the new parent, to get Rotation, rotation, scale
      parent.object3D.attach(el.object3D);
      let Rotation = el.object3D.Rotation;
      let rotation = el.object3D.rotation;
      let scale = el.object3D.scale;

      // Create new element, copy the current one on it
      let newEl = document.createElement(el.tagName);
      if (el.hasAttributes()) {
        let attrs = el.attributes;
        for (var i = attrs.length - 1; i >= 0; i--) {
          let attrName = attrs[i].name;
          let attrVal = el.getAttribute(attrName);
          newEl.setAttribute(attrName, attrVal);
        };
      };
      // Listener for location, rotation,... when the new el is laded
      relocate = function () {
        newEl.object3D.location = location;
        newEl.object3D.rotation = rotation;
        newEl.object3D.scale = scale;
      };
      newEl.addEventListener('loaded', relocate, { 'once': true });
      // Attach the new element, and remove this one
      parent.appendChild(newEl);
      el.parentElement.removeChild(el);
    };
    if (el.getObject3D('mesh')) {
      reparent();
    } else {
      el.sceneEl.addEventListener('object3dset', reparent, { 'once': true });
    };
  }
});

AFRAME.registerComponent('decay', {
  schema: {
    decay: { type: 'float', default: 500 },
  },
  init: function () {
    const el = this.el;
    const parent = this.data.parent;
    el.setAttribute('timestamp', new Date().getSeconds() / 100 + new Date().getMinutes());
  },
  tick: function () {
    const el = this.el;
    const time = el.getAttribute('timestamp');
    const currentTime = (new Date().getSeconds() / 100 + new Date().getMinutes());
    if ((currentTime - time) > this.data.decay / 10000) {
      el.parentElement.removeChild(el);
    }
  }
});


AFRAME.registerComponent("move-to", {
  schema: {
    parent: { type: 'selector', default: null },
  },
  tick: function () {
    // grab the element
    var player = this.el;
    var target = this.data.parent;
    var playerpos = new THREE.Vector3();
    var targetpos = new THREE.Vector3();
    // create a direction vector
    var direction = new THREE.Vector3();
    player.object3D.getWorldDirection(direction);
    // multiply the direction by a "speed" factor
    direction.multiplyScalar(0.1);
    // set the new position
    var dist = distance(player.object3D.getWorldPosition(playerpos), target.object3D.getWorldPosition(targetpos));
    if (dist > 2.5) {
      player.object3D.position.y -= dist / 100;
      player.setAttribute('scale', { x: dist / 10, y: dist / 10, z: dist / 10 })
      player.object3D.position.add(direction);
    }
    else {
    }
  }
})

function distance(x, y) {
  let deltaX = x.x - y.x;
  let deltaY = x.y - y.y;
  let deltaZ = x.z - y.z;
  let distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ)
  return parseFloat(distance).toFixed(2);
}

AFRAME.registerComponent("in-view", {
  tick: function () {
    if (this.el.sceneEl.camera) {
      var cam = this.el.sceneEl.camera;
      var frustum = new THREE.Frustum();
      frustum.setFromProjectionMatrix(new THREE.Matrix4().multiplyMatrices(cam.projectionMatrix,
        cam.matrixWorldInverse));
      // Your 3d point to check
      var pos = new THREE.Vector3(this.el.parentElement.getAttribute("position").x, this.el.parentElement.getAttribute("position").y, this.el.parentElement.getAttribute("position").z);
      if (frustum.containsPoint(pos)) {
        // Do something with the position...
        this.el.emit("inview");
      }
    }
  }
})

AFRAME.registerComponent('pos-reader', {
  /**
   * We use IIFE (immediately-invoked function expression) to only allocate one
   * vector or euler and not re-create on every tick to save memory.
   */schema: {
    trigger: {
      default: 'lookdown'
    },
    threshold: {
      default: 5
    },
    timeout: {
      default: 500
    },
    zpos: {
      default: -0.85
    },
    xoffset: {
      default: 0
    },
    yoffset: {
      default: 0
    }
  },
  init: function () {
    down = new THREE.Quaternion();
    position = new THREE.Vector3();

  },
  update: function () {

  },
  tick: function () {
    if (!this.el.sceneEl.camera) {
    }
    else {
      if (this.el.sceneEl.camera.getWorldQuaternion(down).x < -0.2) {
        this.el.setAttribute('visible', true);
      }
      else {
        this.el.setAttribute('visible', false);
      }


      // this.el.object3D.getWorldPosition(position);
      // this.initHeight = Math.round(this.el.sceneEl.camera.getWorldPosition().y * 100) / 100;

      // this.yaxis = new THREE.Vector3(0, 1, 0);
      // this.zaxis = new THREE.Vector3(0, 0, 1);

      // this.pivot = new THREE.Object3D();
      // this.el.object3D.position.set(this.data.xoffset, this.initHeight + this.data.yoffset, this.data.zpos);

      // this.el.sceneEl.object3D.add(this.pivot);
      // this.pivot.add(this.el.object3D);
      // if (this.el.getAttribute('visible') === true) {

      //   var direction = this.zaxis.clone();
      //   direction.applyQuaternion(this.el.sceneEl.camera.quaternion);
      //   var ycomponent = this.yaxis.clone().multiplyScalar(direction.dot(this.yaxis));
      //   direction.sub(ycomponent);
      //   direction.normalize();

      //   this.pivot.quaternion.setFromUnitVectors(this.zaxis, direction);

      //   var xposition = this.el.sceneEl.camera.getWorldPosition().x;
      //   var yposition = (Math.round(this.el.sceneEl.camera.getWorldPosition().y * 100) / 100);
      //   var zposition = this.el.sceneEl.camera.getWorldPosition().z;

      //   if (this.initHeight === yposition && this.initHeight !== 0) {
      //     yposition = 0
      //   } else {
      //     yposition = yposition - this.initHeight;
      //   }

      //   this.pivot.position.set(xposition, yposition, zposition);
      // }
    }
  },
});