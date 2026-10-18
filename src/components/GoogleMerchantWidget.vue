<script setup>
import { onBeforeUnmount, onMounted } from 'vue';
import { COOKIE_CONSENT_EVENT, hasAnalyticsConsent } from '../utils/consentState';

// Enable only after the business has joined Google Customer Reviews / Store Quality.
const enabled = import.meta.env.VITE_GOOGLE_MERCHANT_WIDGET_ENABLED === 'true';
let started = false;

const startWidget = () => {
  if (!enabled || started || !hasAnalyticsConsent()) return;
  started = true;
  const launch = () => window.merchantwidget?.start({
    position: 'LEFT_BOTTOM', bottomMargin: 96, mobileBottomMargin: 96,
  });
  const existing = document.getElementById('merchantWidgetScript');
  if (existing) { if (window.merchantwidget) launch(); else existing.addEventListener('load', launch, { once: true }); return; }
  const script = document.createElement('script');
  script.id = 'merchantWidgetScript';
  script.src = 'https://www.gstatic.com/shopping/merchant/merchantwidget.js';
  script.defer = true;
  script.addEventListener('load', launch, { once: true });
  document.head.appendChild(script);
};

onMounted(() => {
  startWidget();
  window.addEventListener(COOKIE_CONSENT_EVENT, startWidget);
});
onBeforeUnmount(() => window.removeEventListener(COOKIE_CONSENT_EVENT, startWidget));
</script>
