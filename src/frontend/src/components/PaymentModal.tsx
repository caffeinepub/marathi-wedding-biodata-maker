import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRazorpay } from "@/hooks/useRazorpay";
import { CheckCircle } from "lucide-react";

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (planId: string) => void;
}

const FEATURES = ["सर्व ६ टेम्पलेट्स", "PDF डाउनलोड"];

export default function PaymentModal({
  open,
  onOpenChange,
  onSuccess,
}: PaymentModalProps) {
  const { openCheckout } = useRazorpay();

  function handlePay() {
    openCheckout({
      key: "rzp_live_SUfWmP0Lx3pBvd",
      amount: 49 * 100,
      currency: "INR",
      name: "लग्नसेतू - बायोडाटा",
      description: "विवाह बायोडाटा डाउनलोड",
      handler: (response: any) => {
        console.log("Payment success:", response);
        sessionStorage.setItem("biodataPaidPlan", "basic");
        onOpenChange(false);
        onSuccess("basic");
      },
      prefill: { name: "", email: "" },
      theme: { color: "#7B1C1C" },
    });
  }

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
            <span className="text-5xl font-bold text-maroon font-display">
              ₹49
            </span>
            <span className="text-sm text-muted-foreground ml-1 font-devanagari">
              /एकदा
            </span>
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

          <Button
            onClick={handlePay}
            className="w-full font-devanagari text-base bg-maroon text-amber-50 hover:opacity-90 mt-1"
            data-ocid="payment.pay.button"
          >
            पेमेंट करा
          </Button>
        </div>

        <p className="text-center font-devanagari text-xs text-muted-foreground">
          🔒 Razorpay द्वारे सुरक्षित पेमेंट — UPI, Credit/Debit Card, Net Banking
        </p>
      </DialogContent>
    </Dialog>
  );
}
