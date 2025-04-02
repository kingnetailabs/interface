import "wow.js/css/libs/animate.css";
import "animate.css/animate.min.css";
import WOW from "wow.js";

function initWow() {
  var wow = new WOW({
    boxClass: "wow",
    animateClass: "animated",
    offset: 0,
    mobile: true,
    live: true,
  });
  wow.init();
}
initWow();
