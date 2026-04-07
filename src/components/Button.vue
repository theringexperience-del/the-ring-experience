<template>
    <button :type="props.type" :disabled="props.disabled"
        :class="[baseClasses, sizeClasses[props.size], variantClasses[props.variant]]">
        <span class="transition-all duration-300 ease-out group-hover:italic group-hover:tracking-[0.12em]">
            <slot />
        </span>
    </button>
</template>

<script setup>
const props = defineProps({
    variant: {
        type: String,
        default: 'solid',
        validator: (value) => ['solid', 'outline', 'nav', 'navLight'].includes(value)
    },
    size: {
        type: String,
        default: 'md',
        validator: (value) => ['sm', 'md'].includes(value)
    },
    type: {
        type: String,
        default: 'button'
    },
    disabled: {
        type: Boolean,
        default: false
    }
});

const baseClasses =
    'group inline-flex cursor-pointer items-center justify-center rounded-full whitespace-nowrap uppercase tracking-[0.08em] transition-colors duration-300 ease-out active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60';

const sizeClasses = {
    sm: 'px-4 py-2 text-xs md:text-sm',
    md: 'px-6 py-3 text-sm md:text-base'
};

const variantClasses = {
    solid:
        'noisette text-white hover:brightness-105',
    outline:
        'border border-[#B08942] text-[#B08942] bg-transparent hover:bg-[#B08942] hover:text-white',
    nav:
        'border border-[#2A1E17] bg-[#2A1E17] text-[#F4EFE8] hover:bg-[#3B2B21]',
    navLight:
        'border border-[#F4EFE8]/80 bg-[#F4EFE8]/10 text-[#F4EFE8] hover:bg-[#F4EFE8]/20'
};

</script>
