import { useCallback, useEffect, useRef } from "react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export function useRazorpay() {
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (scriptLoaded.current || document.getElementById("razorpay-script")) {
      scriptLoaded.current = true;
      return;
    }
    const script = document.createElement("script");
    script.id = "razorpay-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      scriptLoaded.current = true;
    };
    document.body.appendChild(script);
  }, []);

  const openCheckout = useCallback((options: Record<string, any>) => {
    if (!window.Razorpay) {
      console.error("Razorpay script not loaded yet.");
      return;
    }
    const rzp = new window.Razorpay(options);
    rzp.open();
  }, []);

  return { openCheckout };
}
