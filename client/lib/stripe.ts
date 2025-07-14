import { loadStripe } from "@stripe/stripe-js";

// Load Stripe with publishable key
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ||
    "pk_test_51RhHXdL0UpZsIVb3IctCgT1rLn8nxc2NQmX6ubEUUEXdA2oKtgL9BNprGfkOZPAKAkVO1bs5KXPxm43Xmn0DpiSZ00rvETO9NG",
);

export { stripePromise };

// Stripe configuration for different payment types
export const stripeConfig = {
  publishableKey:
    import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ||
    "pk_test_51RhHXdL0UpZsIVb3IctCgT1rLn8nxc2NQmX6ubEUUEXdA2oKtgL9BNprGfkOZPAKAkVO1bs5KXPxm43Xmn0DpiSZ00rvETO9NG",
  currency: "usd",
  locale: "en",
};

// Payment method types supported
export const supportedPaymentMethods = [
  "card",
  "paypal",
  "apple_pay",
  "google_pay",
] as const;

export type SupportedPaymentMethod = (typeof supportedPaymentMethods)[number];
