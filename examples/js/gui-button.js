/* global AFRAME, THREE */
if (typeof AFRAME === 'undefined') {
    throw new Error('Component attempted to register before AFRAME was available.');
  }
  /*
  AFRAME.registerComponent('vibration', {
    schema: {
      duration: {type: 'int', default: 200},
      value: {type: 'number', default: 0.5}
    },
    init: function() {
      this.onClick = this.onClick.bind(this);
      this.el.addEventListener('click', this.onClick);
    },
    onClick: function(e) {
      navigator.vibrate(this.data.duration);
      var gamepads = navigator.getGamepads && navigator.getGamepads();
      for (var i = 0; gamepads.length; i++) {
        var gamepad = gamepads[i];
        gamepad.hapticActuators[0].pulse(this.data.value, this.data.duration);
      }
    }
  });
  */
  
  AFRAME.registerComponent('gui-object', {
    schema: {
      on: {default: 'click'},
      speech: {type: 'boolean', default: false},
      hoverColor: {type: 'string', default: '#f00'},
      activeColor: {type: 'string', default: '#00f'},
      clickAction: {type: 'string'},
      hoverAction: {type: 'string'},
      label: {type: 'string'},
      labelwidth: {type: 'float', default: 1, is: 'uniform'},
      labelheight: {type: 'float', default: 0.275, is: 'uniform'},
      role: {type: 'string', default: 'button'},
      height: {type: 'float', default: 1, is: 'uniform'},
      width: {type: 'float', default: 1, is: 'uniform'},
      depth: {type: 'float', default: 1, is: 'uniform'},
      sndIn: {type: 'string', default: '#blip'},
      sndOut: {type: 'string', default: '#blop'}
    },
    init: function() {
  
      var data = this.data;
      var el = this.el;
      
  //    var cameraEl = document.querySelector('#camera');  
  //    var helperline = document.getElementById('helper-lines');
  //    var worldPos = new THREE.Vector3();
      
      el.setAttribute('geometry', `primitive:box; height: ${data.height}; width: ${data.width}; depth: ${data.depth};`);
      el.setAttribute('material', `wireframe: true; side:back; color: ${data.hoverColor}; opacity: 0;`);  
      //el.setAttribute('vibration','');
  
      
  //     var inSound = document.createElement("a-entity");
  //     inSound.setAttribute('sound', `src: ${data.sndIn};`);   
  //     el.appendChild(inSound);
      
      // var outSound = document.createElement("a-entity");
      // outSound.setAttribute('sound', `src: ${data.sndOut};`);   
      // el.appendChild(outSound);
      
      
    //   // Howl Workaround
    //   var inSnd = new window.Howl({
    //       src: `https://cdn.glitch.com/f2d55546-c372-4b99-b28f-91c8f8a3e2ed%2Fsblip.mp3?v=1610420175408`,
    //       autoplay: true,
    //       loop: false,
    //       volume: 0.9,
    //       onend: function() {
  
    //       }
    //     });
  
    //   var outSnd = new window.Howl({
    //       src: `https://cdn.glitch.com/f2d55546-c372-4b99-b28f-91c8f8a3e2ed%2Fsblop.mp3?v=1610420150327`,
    //       autoplay: true,
    //       loop: false,
    //       volume: 0.9,
    //       onend: function() {
  
    //       }
    //     });
  
      var panel = document.createElement("a-entity");
      panel.setAttribute('geometry', `primitive:plane; height: ${data.labelheight}; width: ${data.labelwidth};`);
      panel.setAttribute('material', 'color:#222; shader:flat;');      
      panel.setAttribute('position', `0 -${data.labelheight/2 + data.height/2 + 0.1} 0`); 
      panel.setAttribute('visible', 'false');
      panel.setAttribute('look-at', '[camera]');
      el.appendChild(panel);
  
      var textlabel = document.createElement("a-text");
      textlabel.setAttribute('value', data.label);
      textlabel.setAttribute('align', 'center');
      textlabel.setAttribute('color', '#eee');
      textlabel.setAttribute('position', '0 0 0.01');
      panel.appendChild(textlabel);
  
      el.addEventListener('mouseenter', function(event) {
        el.setAttribute('material', `wireframe: true; color: ${data.hoverColor}; opacity: 1;`);
        el.setAttribute('scale', '1.1 1.1 1.1');
        panel.setAttribute('visible', 'true');
        var hoverActionFunctionName = data.hoverAction;
        var hoverActionFunction = window[hoverActionFunctionName];
        if (typeof hoverActionFunction === "function") hoverActionFunction(event); 
         // inSound.components.sound.playSound();
        // inSnd.play();
        
      });
      el.addEventListener('mouseleave', function(event) {
        el.setAttribute('material', `wireframe: true; color: ${data.hoverColor}; opacity: 0;`);
        el.setAttribute('scale', '1 1 1');
        panel.setAttribute('visible', 'false');
        // outSound.components.sound.playSound();      
        // outSnd.play();
      });
  
      el.addEventListener('focus', function(event) {
        el.setAttribute('material', `wireframe: true; color: ${data.activeColor}; opacity: 1;`);
        panel.setAttribute('visible', 'true');
       // inSound.components.sound.playSound();
        // inSnd.play();
  
  /*      
        if(helperline){
            worldPos.setFromMatrixPosition(el.object3D.matrixWorld);
            var newY = worldPos.y - 1.6;
            var objPos = worldPos.x+' '+newY+' '+worldPos.z;
            console.log(objPos);
  
            helperline.setAttribute('line__target','color: red; start: 0, 0, 0; end:'+ objPos);
        }
  */      
      });
  
      el.addEventListener('blur', (event) => {
        el.setAttribute('material', `wireframe: true; color: ${data.hoverColor}; opacity: 0;`);          
        panel.setAttribute('visible', 'false');
      });      
  
  
      el.addEventListener(data.on, function(event) {
        el.setAttribute('material', `wireframe: true; color: ${data.activeColor}; opacity: 1;`);
  
        if(data.speech){
  
          /* this only works on desktop
          var speechContent = data.label;
          var msg = new SpeechSynthesisUtterance(speechContent);
          window.speechSynthesis.speak(msg);
          */
          
          //loading responsiveVoice.js in header
          var utter = data.label;
          // speak
          responsiveVoice.setDefaultVoice("US English Male");
          responsiveVoice.speak(utter);
          
        }
        
        var clickActionFunctionName = data.clickAction;
        var clickActionFunction = window[clickActionFunctionName];
        if (typeof clickActionFunction === "function") clickActionFunction(event); 
  
      });
  
  
      el.addEventListener("keyup", function (event){
        console.log("testing key");
        console.log(event.key);
  
        if (event.isComposing || event.keyCode === 229) {
          return;
        }
  
        if (event.keyCode == 13 || event.keyCode == 32){
          el.emit('click');            
        }
        event.preventDefault();
  
      });          
  
      
      ////WAI ARIA Support
      el.setAttribute('role', data.role);
      el.setAttribute('aria-label',data.label);
      el.setAttribute('title',data.label);
      el.setAttribute('tabindex','0');                  
  
    }
  
  });