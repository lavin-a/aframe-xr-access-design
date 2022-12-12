var first = document.getElementById("first");
var second = document.getElementById("second");
var third = document.getElementById("third");
var fourth = document.getElementById("fourth");
const parent = "parent: #camera";
var flexbox = document.getElementById("flex");
var tempparent = [];
var reduceMotion;
var dndMode;

const Attributes = {
    opacity: "0.8",
    position: "0 +2.5 0",
    "look-at": "#camera",
    scale: "1 1 1",
    animation__start: "property: none; autoplay:false",
    animation__pos: "property: position; to: 0 -0.7 -1; dur: 1000; easing: easeInOutQuint; autoplay: false",
    animation__rot: "property: rotation; to: 0 0 0; dur: 0; delay: 300; easing: linear; autoplay: false",
    animation__scl: "property: scale; to: 0.3 0.3 1; dur: 1000; easing: easeInOutQuint; autoplay: false",
    animation__op: "property: opacity; from: 0.8; to: 0; dur: 1000; easing: easeInOutQuint; autoplay: false",
    animation__op2: "property: opacity; from: 0; to: 0.8; dur: 1000; easing: easeInOutQuint; delay: 300; autoplay: false",
    animation__op3: "property: opacity; from: 0.8; to: 0; dur: 1000; easing: easeInOutQuint; delay: 600; autoplay: false",
    animation__pos2: "property: position; to: 0 -0.5 -1; dur: 500; autoplay: false",
    animation__pos3: "property: position; to: 0 0 -1; dur: 500; autoplay: false",
};


const Activate = {
    "object-parent": parent,
    decay: 500,
    animation__pos: "autoplay: true",
    animation__op: "autoplay: true",
    animation__rot: "autoplay: true",
    animation__scl: "autoplay: true",
    animation__op2: "autoplay: true",
    animation__op3: "autoplay: true",
};

const Floatup = {
    animation__pos2: "autoplay: true",
};

const Decay = {
    animation__pos3: "autoplay: true",
    animation__op3: "autoplay: true",
};

function ActivateCaption(element) {


    //Creating space in flexbox
    var copy = element.cloneNode(false);
    copy.classList.remove("caption");
    copy.removeAttribute("id");
    copy.removeAttribute("look-at");
    copy.removeAttribute("object-parent");
    copy.removeAttribute("position");
    copy.setAttribute("opacity", "0");
    copy.setAttribute("value", " ");
    flexbox.appendChild(copy);


    //Setting animation
    setAttributes(element, Activate);
    element.removeAttribute("look-at");

    //Placing a copy in flexbox
    timer = setTimeout(function () {
        element.setAttribute("position", "0 -1 0");
        var copy = element.cloneNode(false);
        copy.classList.remove("caption");
        copy.removeAttribute("id");
        copy.removeAttribute("look-at");
        copy.removeAttribute("object-parent");
        copy.removeAttribute("position");
        copy.setAttribute("opacity", "0.8");
        flexbox.lastChild.remove();
        flexbox.appendChild(copy);
        clearTimeout(timer);
    }, 1000);

}

function setAttributes(element, attributes) {
    Object.keys(attributes).forEach(attr => {
        element.setAttribute(attr, attributes[attr]);
    });
}

function removeAttributes(element, attributes) {
    attributes.forEach(attr => {
        element.removeAttribute(attr);
    });
}

document.querySelectorAll(".caption").forEach(element => {
    //removeEventListener("animationcomplete__start", () => { });
    setAttributes(element, Attributes);
    tempparent[element.id] = "parent: #" + element.parentElement.id;
    element.addEventListener("animationcomplete__start", startanim, { once: true });

});

document.getElementById("includedScene").addEventListener("loaded", reload);


window.start = function () {
    document.getElementById("start").setAttribute("visible", "false");
    if (dndMode) {
        this.removeEventListener("animationcomplete__start", startanim);
        document.querySelectorAll(".caption").forEach(element => {
            element.setAttribute("in-view", '');
        });
    }
    else {
        flexbox.emit("start");
    }
}

window.restart = function () {
    // $("#includedScene").load('directional_captions_copy.html', function () {
    // reload();
    // });
    window.location.reload();
    // document.querySelectorAll(".caption").forEach(element => {
    //     element.setAttribute("object-parent", tempparent[element.id]);
    //     setAttributes(element, Attributes);
    //     element.removeAttribute("decay");
    //     element.setAttribute("object-parent", tempparent[element.id]);
    //     element.emit("restart");
    // });
};

window.reduce = function () {
    Activate.animation__pos = reduceMotion ? "autoplay: true" : "autoplay: false";
    reduceMotion = !reduceMotion;
};

window.reduce = function () {
    dndMode = !dndMode;
};

function startanim() {
    ActivateCaption(this);
}

function reload() {
    console.log(reduceMotion);
    document.getElementById("reduce").setAttribute("state", reduceMotion);
    document.getElementById("dnd").setAttribute("state", dndMode);
}

