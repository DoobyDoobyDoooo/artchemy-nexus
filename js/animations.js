// js/animations.js
window.addEventListener("load", () => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion || !window.gsap) {
    document.querySelectorAll(".reveal-up, .split-text .word span").forEach((item) => {
      item.style.opacity = "1";
      item.style.transform = "none";
    });

    document.querySelectorAll(".reveal-image").forEach((item) => {
      item.style.clipPath = "none";
    });

    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  if (window.Lenis) {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  }

  document.querySelectorAll(".split-text").forEach((heading) => {
    const words = heading.textContent.trim().split(/\s+/);
    heading.innerHTML = words.map((word) => `<span class="word"><span>${word}</span></span>`).join(" ");

    gsap.to(heading.querySelectorAll(".word span"), {
      y: 0,
      duration: 1.2,
      ease: "power4.out",
      stagger: 0.045,
      delay: 0.25
    });
  });

  gsap.to(".home-hero__media img", {
    scale: 1,
    duration: 2.4,
    ease: "power3.out"
  });

  gsap.to("[data-parallax] img", {
    yPercent: 10,
    ease: "none",
    scrollTrigger: {
      trigger: ".home-hero",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });

  gsap.utils.toArray(".reveal-up").forEach((element) => {
    gsap.to(element, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 86%",
        once: true
      }
    });
  });

  gsap.utils.toArray(".reveal-image").forEach((element) => {
    gsap.to(element, {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 82%",
        once: true
      }
    });
  });

  gsap.utils.toArray("[data-count]").forEach((counter) => {
    const target = Number(counter.dataset.count || 0);
    const state = { value: 0 };

    gsap.to(state, {
      value: target,
      duration: 1.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: counter,
        start: "top 86%",
        once: true
      },
      onUpdate: () => {
        counter.textContent = Math.round(state.value);
      }
    });
  });

  gsap.to(".market-map__line", {
    rotate: 348,
    duration: 18,
    repeat: -1,
    ease: "none",
    transformOrigin: "center"
  });

  gsap.utils.toArray(".market-dot").forEach((dot, index) => {
    gsap.fromTo(dot,
      { opacity: 0, y: 16 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: index * 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".market-map",
          start: "top 72%",
          once: true
        }
      }
    );
  });
});