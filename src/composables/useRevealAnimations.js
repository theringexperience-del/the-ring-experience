import { onBeforeUnmount } from 'vue';

let gsapLoader = null;

async function loadGsap() {
    if (!gsapLoader) {
        gsapLoader = Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([gsapModule, scrollTriggerModule]) => {
            const { gsap } = gsapModule;
            gsap.registerPlugin(scrollTriggerModule.ScrollTrigger);
            return gsap;
        });
    }

    return gsapLoader;
}

export function useRevealAnimations(rootRef, options = {}) {
    const selectors = Array.isArray(options.selectors) && options.selectors.length
        ? options.selectors
        : ['[data-reveal]'];
    const start = options.start || 'top 90%';
    const y = Number.isFinite(options.y) ? options.y : 16;
    const duration = Number.isFinite(options.duration) ? options.duration : 0.68;
    const stagger = Number.isFinite(options.stagger) ? options.stagger : 0.06;

    let animationContext = null;
    let mediaMatcher = null;
    let isDisposed = false;

    const setupRevealAnimations = async () => {
        if (!rootRef.value) return;
        mediaMatcher?.revert();
        animationContext?.revert();

        const gsap = await loadGsap();
        if (isDisposed || !rootRef.value) return;

        animationContext = gsap.context(() => {
            mediaMatcher = gsap.matchMedia();
            mediaMatcher.add('(prefers-reduced-motion: reduce)', () => {
                selectors.forEach((selector) => gsap.set(selector, { clearProps: 'all' }));
            });
            mediaMatcher.add('(prefers-reduced-motion: no-preference)', () => {
                selectors.forEach((selector) => {
                    gsap.utils.toArray(selector).forEach((element) => {
                        gsap.from(element, {
                            y,
                            duration,
                            ease: 'power2.out',
                            stagger,
                            overwrite: 'auto',
                            immediateRender: false,
                            scrollTrigger: {
                                trigger: element,
                                start,
                                toggleActions: 'play none none none',
                                once: true
                            }
                        });
                    });
                });
            });
        }, rootRef.value);
    };

    onBeforeUnmount(() => {
        isDisposed = true;
        mediaMatcher?.revert();
        animationContext?.revert();
    });

    return { setupRevealAnimations };
}
