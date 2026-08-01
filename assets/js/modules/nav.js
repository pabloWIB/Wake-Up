/* nav.js — mobile menu: open, close, Escape, background scroll lock */

(function (namespace) {
  "use strict";

  const DESKTOP = 768;

  namespace.initNav = function () {
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".site-nav");

    if (!toggle || !nav) {
      return;
    }

    const body = document.body;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;

    function isOpen() {
      return body.classList.contains("nav-open");
    }

    function open() {
      body.classList.add("nav-open");
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Close menu");
      body.style.overflow = "hidden";

      if (scrollbar > 0) {
        body.style.paddingRight = scrollbar + "px";
      }
    }

    function close(returnFocus) {
      body.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
      body.style.overflow = "";
      body.style.paddingRight = "";

      if (returnFocus) {
        toggle.focus();
      }
    }

    toggle.addEventListener("click", function () {
      if (isOpen()) {
        close(false);
      } else {
        open();
      }
    });

    /* Delegated: any link inside the panel closes it. */
    nav.addEventListener("click", function (event) {
      if (isOpen() && event.target.closest("a")) {
        close(false);
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && isOpen()) {
        close(true);
      }
    });

    window.addEventListener("resize", function () {
      if (isOpen() && window.innerWidth >= DESKTOP) {
        close(false);
      }
    });
  };
})((window.wakeUp = window.wakeUp || {}));
