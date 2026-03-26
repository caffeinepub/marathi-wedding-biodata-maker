import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useRazorpay } from "@/hooks/useRazorpay";
import { CheckCircle, Tag } from "lucide-react";
import { useState } from "react";

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (planId: string) => void;
}

const BASE_PRICE = 49;

const COUPONS: Record<
  string,
  { type: "percent" | "flat"; value: number; label: string }
> = {
  LAGNA10: { type: "percent", value: 10, label: "10% सूट" },
  WELCOME20: { type: "percent", value: 20, label: "20% सूट" },
  FIRST49: { type: "flat", value: 49, label: "₹49 सूट (मोफत!)" },
  NEWUSER: { type: "flat", value: 10, label: "₹10 सूट" },
};

const FEATURES = ["सर्व ६ टेम्पलेट्स", "PDF डाउनलोड"];

export default function PaymentModal({
  open,
  onOpenChange,
  onSuccess,
}: PaymentModalProps) {
  const { openCheckout } = useRazorpay();
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState("");

  function getDiscountedPrice(): number {
    if (!appliedCoupon) return BASE_PRICE;
    const c = COUPONS[appliedCoupon];
    if (!c) return BASE_PRICE;
    if (c.type === "percent") {
      return Math.max(0, Math.round(BASE_PRICE * (1 - c.value / 100)));
    }
    return Math.max(0, BASE_PRICE - c.value);
  }

  function handleApplyCoupon() {
    const code = couponInput.trim().toUpperCase();
    if (COUPONS[code]) {
      setAppliedCoupon(code);
      setCouponError("");
    } else {
      setAppliedCoupon(null);
      setCouponError("अवैध कूपन कोड");
    }
  }

  function handleRemoveCoupon() {
    setAppliedCoupon(null);
    setCouponInput("");
    setCouponError("");
  }

  function handlePay() {
    const finalPrice = getDiscountedPrice();

    // Free - skip Razorpay
    if (finalPrice === 0) {
      sessionStorage.setItem("biodataPaidPlan", "basic");
      onOpenChange(false);
      onSuccess("basic");
      return;
    }

    openCheckout({
      key: "rzp_live_SUfWmP0Lx3pBvd",
      amount: finalPrice * 100,
      currency: "INR",
      name: "लग्नसेतू - बायोडाटा",
      description: "विवाह बायोडाटा डाउनलोड",
      handler: (response: any) => {
        console.log("Payment success:", response);
        sessionStorage.setItem("biodataPaidPlan", "basic");
        onOpenChange(false);
        onSuccess("basic");
      },
      prefill: { name: "", email: "", contact: "9999999999" },
      config: {
        display: {
          hide: [{ method: "paylater" }],
          preferences: { show_default_blocks: true },
        },
      },
      theme: { color: "#7B1C1C" },
    });
  }

  const finalPrice = getDiscountedPrice();
  const couponData = appliedCoupon ? COUPONS[appliedCoupon] : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm w-full" data-ocid="payment.dialog">
        <DialogHeader>
          <DialogTitle className="font-serif-devanagari text-maroon text-xl text-center">
            ✦ बायोडाटा डाउनलोड ✦
          </DialogTitle>
          <DialogDescription className="font-devanagari text-center text-sm">
            आपला बायोडाटा डाउनलोड करण्यासाठी पेमेंट करा
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-2xl border-2 border-maroon bg-maroon/5 p-6 flex flex-col gap-4 mt-2">
          <div className="text-center">
            {appliedCoupon && finalPrice < BASE_PRICE ? (
              <div className="flex items-center justify-center gap-3">
                <span className="text-3xl font-bold text-muted-foreground line-through font-display">
                  ₹{BASE_PRICE}
                </span>
                <span className="text-5xl font-bold text-maroon font-display">
                  {finalPrice === 0 ? "मोफत" : `₹${finalPrice}`}
                </span>
              </div>
            ) : (
              <div>
                <span className="text-5xl font-bold text-maroon font-display">
                  ₹49
                </span>
                <span className="text-sm text-muted-foreground ml-1 font-devanagari">
                  /एकदा
                </span>
              </div>
            )}
          </div>

          <ul className="flex flex-col gap-2">
            {FEATURES.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 shrink-0 text-maroon" />
                <span className="font-devanagari text-sm text-foreground/80">
                  {f}
                </span>
              </li>
            ))}
          </ul>

          {/* Coupon section */}
          <div className="space-y-2">
            {!appliedCoupon ? (
              <div className="flex gap-2">
                <Input
                  placeholder="कूपन कोड टाका"
                  value={couponInput}
                  onChange={(e) => {
                    setCouponInput(e.target.value.toUpperCase());
                    setCouponError("");
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                  className="font-mono text-sm uppercase"
                  data-ocid="payment.coupon.input"
                />
                <Button
                  variant="outline"
                  onClick={handleApplyCoupon}
                  className="shrink-0 font-devanagari border-maroon text-maroon hover:bg-maroon/10"
                  data-ocid="payment.coupon.apply_button"
                >
                  <Tag className="w-3.5 h-3.5 mr-1" />
                  लागू
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-between p-2 rounded-lg bg-green-50 border border-green-200">
                <span className="text-green-700 text-sm font-semibold">
                  ✓ {couponData?.label} लागली!
                </span>
                <button
                  type="button"
                  onClick={handleRemoveCoupon}
                  className="text-xs text-muted-foreground hover:text-destructive ml-2"
                  data-ocid="payment.coupon.remove_button"
                >
                  काढा ✕
                </button>
              </div>
            )}
            {couponError && (
              <p
                className="text-red-500 text-xs font-devanagari"
                data-ocid="payment.coupon.error_state"
              >
                {couponError}
              </p>
            )}
          </div>

          <Button
            onClick={handlePay}
            className="w-full font-devanagari text-base bg-maroon text-amber-50 hover:opacity-90 mt-1"
            data-ocid="payment.pay.button"
          >
            {finalPrice === 0 ? "मोफत डाउनलोड करा ✓" : `₹${finalPrice} पेमेंट करा`}
          </Button>
        </div>

        <p className="text-center font-devanagari text-xs text-muted-foreground">
          🔒 Razorpay द्वारे सुरक्षित पेमेंट — UPI, Credit/Debit Card, Net Banking
        </p>
      </DialogContent>
    </Dialog>
  );
}
