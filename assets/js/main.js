/* main.js — single entry point. Modules register themselves on window.wakeUp
   and are started here, in order. Every module is a no-op when the elements
   it needs are absent, so the same bundle is safe on every page. */

(function (namespace) {
  "use strict";

  ["initNav", "initHero"].forEach(function (name) {
    if (typeof namespace[name] === "function") {
      namespace[name]();
    }
  });
})((window.wakeUp = window.wakeUp || {}));
