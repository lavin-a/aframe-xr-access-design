window.apps = function () {
    element = document.getElementById("applib");
    element.getAttribute("visible") == true ? element.setAttribute("visible", false) : element.setAttribute("visible", true);
}

window.settings = function () {
    element = document.getElementById("settings");
    element.getAttribute("visible") == true ? element.setAttribute("visible", false) : element.setAttribute("visible", true);
}

window.teams = function () {
    element = document.getElementById("teamsoption");
    element.getAttribute("visible") == true ? element.setAttribute("visible", false) : element.setAttribute("visible", true);
}

window.battery = function () {
    element = document.getElementById("battery");
    element.getAttribute("visible") == true ? element.setAttribute("visible", false) : element.setAttribute("visible", true);
}

window.secondtask = function () {
    element = document.getElementById("teamsettingspanel");
    element.getAttribute("visible") == true ? element.setAttribute("visible", false) : element.setAttribute("visible", true);
    document.getElementById("teamsoption").setAttribute("visible", false);

}