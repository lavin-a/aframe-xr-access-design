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
    el.setAttribute('timestamp', new Date().getSeconds()/100+new Date().getMinutes());
  },
  tick: function () {
    const el = this.el;
    const time = el.getAttribute('timestamp');
    const currentTime = (new Date().getSeconds()/100+new Date().getMinutes());
    if ((currentTime - time) > this.data.decay/10000) {
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
      console.log(dist);
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
  tick: function() {
   if (this.el.sceneEl.camera) {
      var cam = this.el.sceneEl.camera
      var frustum = new THREE.Frustum();
      frustum.setFromProjectionMatrix(new THREE.Matrix4().multiplyMatrices(cam.projectionMatrix, 
      cam.matrixWorldInverse));  
      // Your 3d point to check
      var pos = new THREE.Vector3(this.el.parentElement.getAttribute("position").x, this.el.parentElement.getAttribute("position").y, this.el.parentElement.getAttribute("position").z);
      if (frustum.containsPoint(pos)) {
        // Do something with the position...
        this.el.emit("animationcomplete__start");
      }
   }
  }
})