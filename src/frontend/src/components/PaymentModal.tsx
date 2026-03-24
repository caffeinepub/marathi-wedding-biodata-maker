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
import { CheckCircle, Crown, Sparkles, Star, Zap } from "lucide-react";

interface Plan {
  id: string;
  name: string;
  nameEng: string;
  price: number;
  icon: React.ReactNode;
  features: string[];
  popular?: boolean;
  highlight?: boolean;
}

const PLANS: Plan[] = [
  {
    id: "basic",
    name: "बेसिक",
    nameEng: "Basic",
    price: 29,
    icon: <Zap className="w-5 h-5" />,
    features: ["२ टेम्पलेट्स", "पारंपारिक + आधुनिक", "डाउनलोड + प्रिंट"],
  },
  {
    id: "standard",
    name: "स्टँडर्ड",
    nameEng: "Standard",
    price: 69,
    icon: <Star className="w-5 h-5" />,
    features: [
      "४ टेम्पलेट्स",
      "पारंपारिक + आधुनिक",
      "राजेशाही + पुष्पलता",
      "डाउनलोड + प्रिंट",
    ],
    popular: true,
  },
  {
    id: "premium",
    name: "प्रीमियम",
    nameEng: "Premium",
    price: 149,
    icon: <Crown className="w-5 h-5" />,
    features: [
      "सर्व ८ टेम्पलेट्स ✦",
      "श्रेष्ठ + दैवी + उत्सव + शुभ",
      "एक्सक्लुसिव्ह डिझाइन्स",
      "डाउनलोड + प्रिंट",
    ],
    highlight: true,
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
                plan.highlight
                  ? "border-yellow-500 bg-gradient-to-b from-yellow-50 to-amber-50 shadow-lg ring-2 ring-yellow-400/40"
                  : plan.popular
                    ? "border-maroon bg-maroon/5 shadow-card"
                    : "border-border bg-card"
              }`}
              data-ocid={`payment.${plan.id}.card`}
            >
              {plan.highlight && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-devanagari text-xs px-3 py-0.5 shadow-lg border-0">
                  👑 सर्वोत्तम
                </Badge>
              )}
              {plan.popular && !plan.highlight && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-maroon text-amber-50 font-devanagari text-xs px-3 py-0.5 shadow">
                  ⭐ लोकप्रिय
                </Badge>
              )}

              <div className="flex items-center gap-2">
                <span
                  className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    plan.highlight
                      ? "bg-gradient-to-br from-yellow-400 to-amber-500 text-white"
                      : plan.popular
                        ? "bg-maroon text-amber-50"
                        : "bg-maroon/10 text-maroon"
                  }`}
                >
                  {plan.icon}
                </span>
                <div>
                  <div
                    className={`font-serif-devanagari font-bold text-base leading-tight ${
                      plan.highlight ? "text-yellow-700" : "text-maroon"
                    }`}
                  >
                    {plan.name}
                  </div>
                  <div className="text-xs text-muted-foreground font-display">
                    {plan.nameEng}
                  </div>
                </div>
              </div>

              <div className="font-display">
                <span
                  className={`text-3xl font-bold ${
                    plan.highlight ? "text-yellow-700" : "text-maroon"
                  }`}
                >
                  ₹{plan.price}
                </span>
                <span className="text-xs text-muted-foreground ml-1">
                  /एकदा
                </span>
              </div>

              <ul className="flex flex-col gap-1.5 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-1.5">
                    <CheckCircle
                      className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                        plan.highlight ? "text-yellow-600" : "text-maroon"
                      }`}
                    />
                    <span className="font-devanagari text-xs text-foreground/80">
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => handlePay(plan)}
                className={`w-full font-devanagari text-sm mt-1 ${
                  plan.highlight
                    ? "bg-gradient-to-r from-yellow-500 to-amber-600 text-white hover:opacity-90 shadow-md border-0"
                    : plan.popular
                      ? "bg-maroon text-amber-50 hover:opacity-90"
                      : "border-2 border-maroon text-maroon bg-transparent hover:bg-maroon/5"
                }`}
                variant={plan.popular || plan.highlight ? "default" : "outline"}
                data-ocid={`payment.${plan.id}.button`}
              >
                {plan.highlight ? "👑 " : ""}पेमेंट करा
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
