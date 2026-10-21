<template>
    <component :is="props.as" :type="props.as === 'button' ? props.type : undefined" :disabled="props.as === 'button' ? props.disabled : undefined"
        :class="[baseClasses, sizeClasses[props.size], variantClasses[props.variant]]">
        <span class="transition-opacity duration-300 ease-out ">
            <slot />
        </span>
    </component>
</template>

<script setup>
const props = defineProps({
    as: { type: String, default: 'button', validator: (value) => ['button', 'span'].includes(value) },
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
    'ui-button group whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-60';

const sizeClasses = {
    sm: 'px-4 py-2 text-xs md:text-sm',
    md: 'px-6 py-3 text-sm'
};

const variantClasses = {
    solid:
        'ui-button-solid',
    outline:
        'ui-button-outline',
    nav:
        'ui-button-solid',
    navLight:
        'ui-button-light'
};

</script>
