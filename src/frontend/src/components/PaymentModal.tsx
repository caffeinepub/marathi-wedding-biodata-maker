import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRazorpay } from "@/hooks/useRazorpay";
import { CheckCircle, Sparkles, Star, Zap } from "lucide-react";

interface Plan {
  id: string;
  name: string;
  nameEng: string;
  price: number;
  icon: React.ReactNode;
  features: string[];
  popular?: boolean;
}

const PLANS: Plan[] = [
  {
    id: "basic",
    name: "बेसिक",
    nameEng: "Basic",
    price: 20,
    icon: <Zap className="w-5 h-5" />,
    features: ["पारंपारिक टेम्पलेट", "बायोडाटा डाउनलोड", "प्रिंट सुविधा"],
  },
  {
    id: "standard",
    name: "स्टँडर्ड",
    nameEng: "Standard",
    price: 50,
    icon: <Star className="w-5 h-5" />,
    features: [
      "पारंपारिक टेम्पलेट",
      "आधुनिक टेम्पलेट",
      "बायोडाटा डाउनलोड",
      "प्रिंट सुविधा",
    ],
    popular: true,
  },
  {
    id: "premium",
    name: "प्रीमियम",
    nameEng: "Premium",
    price: 90,
    icon: <Sparkles className="w-5 h-5" />,
    features: [
      "सर्व ४ टेम्पलेट्स",
      "पारंपारिक + आधुनिक",
      "राजेशाही + पुष्पलता",
      "बायोडाटा डाउनलोड",
      "प्रिंट सुविधा",
    ],
  },
];

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (planId: string) => void;
}

export default function PaymentModal({
  open,
  onOpenChange,
  onSuccess,
}: PaymentModalProps) {
  const { openCheckout } = useRazorpay();

  function handlePay(plan: Plan) {
    openCheckout({
      key: "rzp_live_SUfWmP0Lx3pBvd",
      amount: plan.price * 100,
      currency: "INR",
      name: "लग्नसेतू - बायोडाटा",
      description: "विवाह बायोडाटा डाउनलोड",
      handler: (response: any) => {
        console.log("Payment success:", response);
        sessionStorage.setItem("biodataPaidPlan", plan.id);
        onOpenChange(false);
        onSuccess(plan.id);
      },
      prefill: { name: "", email: "", contact: "" },
      theme: { color: "#7B1C1C" },
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl w-full" data-ocid="payment.dialog">
        <DialogHeader>
          <DialogTitle className="font-serif-devanagari text-maroon text-xl text-center">
            ✦ प्लान निवडा ✦
          </DialogTitle>
          <DialogDescription className="font-devanagari text-center text-sm">
            आपला बायोडाटा डाउनलोड करण्यासाठी खालील प्लान निवडा
          </DialogDescription>
        </DialogHeader>

        <div className="grid sm:grid-cols-3 gap-4 mt-2">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl border-2 p-5 flex flex-col gap-3 transition-shadow hover:shadow-card-hover ${
                plan.popular
                  ? "border-maroon bg-maroon/5 shadow-card"
                  : "border-border bg-card"
              }`}
              data-ocid={`payment.${plan.id}.card`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-maroon text-amber-50 font-devanagari text-xs px-3 py-0.5 shadow">
                  ⭐ लोकप्रिय
                </Badge>
              )}

              <div className="flex items-center gap-2">
                <span
                  className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    plan.popular
                      ? "bg-maroon text-amber-50"
                      : "bg-maroon/10 text-maroon"
                  }`}
                >
                  {plan.icon}
                </span>
                <div>
                  <div className="font-serif-devanagari font-bold text-maroon text-base leading-tight">
                    {plan.name}
                  </div>
                  <div className="text-xs text-muted-foreground font-display">
                    {plan.nameEng}
                  </div>
                </div>
              </div>

              <div className="font-display">
                <span className="text-3xl font-bold text-maroon">
                  ₹{plan.price}
                </span>
                <span className="text-xs text-muted-foreground ml-1">
                  /एकदा
                </span>
              </div>

              <ul className="flex flex-col gap-1.5 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-maroon shrink-0 mt-0.5" />
                    <span className="font-devanagari text-xs text-foreground/80">
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => handlePay(plan)}
                className={`w-full font-devanagari text-sm mt-1 ${
                  plan.popular
                    ? "bg-maroon text-amber-50 hover:opacity-90"
                    : "border-2 border-maroon text-maroon bg-transparent hover:bg-maroon/5"
                }`}
                variant={plan.popular ? "default" : "outline"}
                data-ocid={`payment.${plan.id}.button`}
              >
                पेमेंट करा
              </Button>
            </div>
          ))}
        </div>

        <p className="text-center font-devanagari text-xs text-muted-foreground mt-2">
          🔒 Razorpay द्वारे सुरक्षित पेमेंट — UPI, Credit/Debit Card, Net Banking
        </p>
      </DialogContent>
    </Dialog>
  );
}
