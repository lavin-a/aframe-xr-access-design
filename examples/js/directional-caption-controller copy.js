const Attributes = {
    animation__start: "property: none; autoplay:false",
    animation__pos: "property: position; to: 0 -0.7 -1; dur: 1000; easing: easeInOutQuint; autoplay: false",
    animation__rot: "property: rotation; from: 100 100 100; to: 0 0 0; dur: 200; easing: linear; delay: 500; autoplay: false",
    animation__scl: "property: scale; to: 0.3 0.3 1; dur: 1000; easing: easeInOutQuint; autoplay: false",
    animation__op: "property: opacity; from: 1; to: 0; dur: 1000; easing: easeInOutQuint; delay: 200; autoplay: false",
    animation__op2: "property: opacity; from: 0; to: 1; dur: 1000; easing: easeInOutQuint; delay: 400; autoplay: false",
    animation__op3: "property: opacity; from: 1; to: 0; dur: 1000; easing: easeInOutQuint; delay: 200; autoplay: false",
    animation__pos2: "property: position; to: 0 -0.5 -1; dur: 500; autoplay: false",
    animation__pos3: "property: position; to: 0 0 -1; dur: 500; autoplay: false",
};

const Activate = {
    "object-parent": "parent:#camera",
    animation__pos: "autoplay: true",
    //animation__rot: "autoplay: true",
    animation__scl: "autoplay: true",
    animation__op: "autoplay: true",
    animation__op2: "autoplay: true",
};

const Floatup = {
    animation__pos2: "autoplay: true",
};

const Decay = {
    animation__pos3: "autoplay: true",
    animation__op3: "autoplay: true",
};

function ActivateCaption(element) {
    setAttributes(element, Activate);
    
}

function AppendCaption(element, element2) {
    setAttributes(element, Floatup);
    ActivateCaption(element2);
}

function ReplaceCaption(element, element2, element3) {
    setAttributes(element, Decay);
    element.parentNode.removeChild(element);
    AppendCaption(element2, element3);
}

var first = document.getElementById("first");
var second = document.getElementById("second");
var third = document.getElementById("third");
var fourth = document.getElementById("fourth");
const camera = "parent:#camera";
setAttributes(first, Attributes);
setAttributes(second, Attributes);
setAttributes(third, Attributes);
setAttributes(fourth, Attributes);

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

first.addEventListener("animationcomplete__start", function () {
    ActivateCaption(first);
});

second.addEventListener("animationcomplete__start", function () {
    AppendCaption(first, second);
});
var third = document.getElementById("third");
third.addEventListener("animationcomplete__start", function () {
    ReplaceCaption(first, second, third);
});
var fourth = document.getElementById("fourth");
fourth.addEventListener("animationcomplete__start", function () {
    ReplaceCaption(second, third, fourth);
});