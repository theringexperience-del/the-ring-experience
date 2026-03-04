import { onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useRevealAnimations(rootRef, options = {}) {
    const selectors = Array.isArray(options.selectors) && options.selectors.length
        ? options.selectors
        : ['[data-reveal]'];

    let animationContext = null;
    let mediaMatcher = null;

    const setupRevealAnimations = () => {
        if (!rootRef.value) return;
        mediaMatcher?.revert();
        animationContext?.revert();

        animationContext = gsap.context(() => {
            mediaMatcher = gsap.matchMedia();
            mediaMatcher.add('(prefers-reduced-motion: reduce), (prefers-reduced-motion: no-preference)', () => {
                selectors.forEach((selector) => gsap.set(selector, { clearProps: 'all' }));
            });
        }, rootRef.value);
    };

    onBeforeUnmount(() => {
        mediaMatcher?.revert();
        animationContext?.revert();
    });

    return { setupRevealAnimations };
}
