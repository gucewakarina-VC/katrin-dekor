(() => {
  const reveals = document.querySelectorAll('.reveal');

  if (!reveals.length) {
    return;
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    reveals.forEach((element) => {
      element.classList.add('is-visible');
    });
    document.documentElement.classList.add('js');
    return;
  }

  reveals.forEach((element) => {
    const rect = element.getBoundingClientRect();
    const isInView = rect.top < window.innerHeight && rect.bottom > 0;

    if (isInView) {
      element.classList.add('is-visible');
    }
  });

  document.documentElement.classList.add('js');

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -8% 0px',
    }
  );

  reveals.forEach((element) => {
    if (!element.classList.contains('is-visible')) {
      observer.observe(element);
    }
  });
})();
