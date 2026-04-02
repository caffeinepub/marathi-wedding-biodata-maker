import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart3,
  IndianRupee,
  ShieldCheck,
  Trash2,
  TrendingUp,
  X,
} from "lucide-react";
import { useState } from "react";

interface Order {
  name: string;
  template: string;
  amount: number;
  date: string;
  coupon?: string | null;
}

const ADMIN_PASSWORD = "lagnasetu2024";

function getOrders(): Order[] {
  try {
    return JSON.parse(localStorage.getItem("lagnasetu_orders") || "[]");
  } catch {
    return [];
  }
}

export default function AdminDashboard() {
  const [isAuth, setIsAuth] = useState(() => {
    try {
      return localStorage.getItem("admin_auth") === ADMIN_PASSWORD;
    } catch {
      return false;
    }
  });
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");
  const [orders, setOrders] = useState<Order[]>(getOrders);
  const [showConfirm, setShowConfirm] = useState(false);

  function handleLogin() {
    if (passwordInput === ADMIN_PASSWORD) {
      localStorage.setItem("admin_auth", ADMIN_PASSWORD);
      setIsAuth(true);
      setAuthError("");
    } else {
      setAuthError("चुकीचा पासवर्ड. पुन्हा प्रयत्न करा.");
    }
  }

  function handleLogout() {
    localStorage.removeItem("admin_auth");
    setIsAuth(false);
    setPasswordInput("");
  }

  function handleClearData() {
    localStorage.removeItem("lagnasetu_orders");
    setOrders([]);
    setShowConfirm(false);
  }

  function refreshOrders() {
    setOrders(getOrders());
  }

  const totalRevenue = orders.reduce((sum, o) => sum + (o.amount || 0), 0);
  const templateCounts = orders.reduce(
    (acc, o) => {
      acc[o.template] = (acc[o.template] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );
  const popularTemplate = Object.entries(templateCounts).sort(
    (a, b) => b[1] - a[1],
  )[0];

  if (!isAuth) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-[70px] flex items-center justify-center min-h-screen">
          <div className="max-w-sm w-full mx-auto px-4">
            <div className="bg-card rounded-2xl shadow-card border border-border p-8">
              <div className="text-center mb-6">
                <div className="w-14 h-14 bg-maroon/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <ShieldCheck className="w-7 h-7 text-maroon" />
                </div>
                <h1 className="font-serif-devanagari font-bold text-maroon text-2xl">
                  Admin Panel
                </h1>
                <p className="font-devanagari text-muted-foreground text-sm mt-1">
                  लग्नसेतू - प्रशासक पॅनल
                </p>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="admin-password"
                    className="font-devanagari text-sm font-semibold text-foreground"
                  >
                    पासवर्ड
                  </label>
                  <Input
                    id="admin-password"
                    type="password"
                    placeholder="पासवर्ड टाका"
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      setAuthError("");
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                    data-ocid="admin.password.input"
                  />
                  {authError && (
                    <p
                      className="text-red-500 text-xs font-devanagari"
                      data-ocid="admin.auth.error_state"
                    >
                      {authError}
                    </p>
                  )}
                </div>
                <Button
                  onClick={handleLogin}
                  className="w-full font-devanagari bg-maroon text-amber-50 hover:opacity-90"
                  data-ocid="admin.login.primary_button"
                >
                  लॉगिन करा
                </Button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-[70px]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-serif-devanagari font-bold text-maroon text-2xl md:text-3xl">
                Admin Dashboard
              </h1>
              <p className="font-devanagari text-muted-foreground text-sm mt-1">
                लग्नसेतू - ऑर्डर व महसूल
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={refreshOrders}
                className="font-devanagari text-sm"
                data-ocid="admin.refresh.button"
              >
                ताज़ा करा
              </Button>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="font-devanagari text-sm gap-2"
                data-ocid="admin.logout.button"
              >
                <X className="w-4 h-4" /> लॉगआउट
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
            <Card data-ocid="admin.orders.card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="font-devanagari text-sm font-semibold text-muted-foreground">
                  एकूण ऑर्डर
                </CardTitle>
                <TrendingUp className="w-4 h-4 text-maroon" />
              </CardHeader>
              <CardContent>
                <div className="font-display text-3xl font-bold text-maroon">
                  {orders.length}
                </div>
                <p className="font-devanagari text-xs text-muted-foreground mt-1">
                  एकूण बायोडाटा डाउनलोड
                </p>
              </CardContent>
            </Card>

            <Card data-ocid="admin.revenue.card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="font-devanagari text-sm font-semibold text-muted-foreground">
                  एकूण महसूल
                </CardTitle>
                <IndianRupee className="w-4 h-4 text-maroon" />
              </CardHeader>
              <CardContent>
                <div className="font-display text-3xl font-bold text-maroon">
                  ₹{totalRevenue}
                </div>
                <p className="font-devanagari text-xs text-muted-foreground mt-1">
                  एकूण उत्पन्न
                </p>
              </CardContent>
            </Card>

            <Card data-ocid="admin.popular.card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="font-devanagari text-sm font-semibold text-muted-foreground">
                  लोकप्रिय टेम्पलेट
                </CardTitle>
                <BarChart3 className="w-4 h-4 text-maroon" />
              </CardHeader>
              <CardContent>
                <div className="font-serif-devanagari text-2xl font-bold text-maroon">
                  {popularTemplate ? popularTemplate[0] : "—"}
                </div>
                <p className="font-devanagari text-xs text-muted-foreground mt-1">
                  {popularTemplate
                    ? `${popularTemplate[1]} वेळा निवडले`
                    : "अद्याप ऑर्डर नाही"}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Orders Table */}
          <div className="bg-card rounded-2xl shadow-card border border-border overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h2 className="font-serif-devanagari font-bold text-maroon text-lg">
                अलीकडील ऑर्डर
              </h2>
              {orders.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowConfirm(true)}
                  className="font-devanagari text-xs gap-1.5 text-destructive border-destructive/30 hover:bg-destructive/10"
                  data-ocid="admin.clear.delete_button"
                >
                  <Trash2 className="w-3.5 h-3.5" /> डेटा साफ करा
                </Button>
              )}
            </div>

            {orders.length === 0 ? (
              <div
                className="py-16 text-center font-devanagari text-muted-foreground"
                data-ocid="admin.orders.empty_state"
              >
                अद्याप कोणताही ऑर्डर नाही
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table data-ocid="admin.orders.table">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-devanagari">नाव</TableHead>
                      <TableHead className="font-devanagari">
                        Template
                      </TableHead>
                      <TableHead className="font-devanagari">रक्कम</TableHead>
                      <TableHead className="font-devanagari">तारीख</TableHead>
                      <TableHead className="font-devanagari">कूपन</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[...orders]
                      .reverse()
                      .slice(0, 20)
                      .map((order, idx) => (
                        <TableRow
                          key={`${order.date}-${idx}`}
                          data-ocid={`admin.orders.row.${idx + 1}`}
                        >
                          <TableCell className="font-devanagari font-medium">
                            {order.name}
                          </TableCell>
                          <TableCell className="font-devanagari">
                            {order.template}
                          </TableCell>
                          <TableCell className="font-display font-semibold text-maroon">
                            {order.amount === 0 ? "मोफत" : `₹${order.amount}`}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {order.date}
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground">
                            {order.coupon || "—"}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Confirm Delete Dialog */}
      {showConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          data-ocid="admin.clear.dialog"
        >
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full mx-4 p-6">
            <h3 className="font-serif-devanagari font-bold text-maroon text-xl mb-2">
              डेटा साफ करा?
            </h3>
            <p className="font-devanagari text-muted-foreground text-sm mb-6">
              सर्व ऑर्डर इतिहास कायमचा हटवला जाईल. हे पूर्ववत होणार नाही.
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowConfirm(false)}
                className="flex-1 font-devanagari"
                data-ocid="admin.clear.cancel_button"
              >
                रद्द करा
              </Button>
              <Button
                onClick={handleClearData}
                className="flex-1 font-devanagari bg-destructive text-white hover:bg-destructive/90"
                data-ocid="admin.clear.confirm_button"
              >
                हटवा
              </Button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
