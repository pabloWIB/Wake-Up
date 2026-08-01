/* hero.js — splits the wordmark into letters so CSS can stagger the reveal.
   Without this file the wordmark simply renders static: the animation is
   enabled by the .is-animated class, which is only ever added from here. */

(function (namespace) {
  "use strict";

  namespace.initHero = function () {
    const hero = document.querySelector(".hero");

    if (!hero) {
      return;
    }

    const targets = hero.querySelectorAll("[data-split]");
    let index = 0;

    targets.forEach(function (target) {
      const word = target.textContent;
      const fragment = document.createDocumentFragment();

      word.split("").forEach(function (character) {
        const span = document.createElement("span");

        span.className = "hero__letter";
        span.textContent = character;
        span.style.setProperty("--i", index);
        span.setAttribute("aria-hidden", "true");
        fragment.appendChild(span);
        index += 1;
      });

      /* The screen reader reads the intact word, not one letter at a time. */
      const label = document.createElement("span");

      label.className = "visually-hidden";
      label.textContent = word;

      target.textContent = "";
      target.appendChild(label);
      target.appendChild(fragment);
    });

    hero.classList.add("is-animated");
  };
})((window.wakeUp = window.wakeUp || {}));
