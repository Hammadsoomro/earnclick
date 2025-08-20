import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AdCashBanner, AdCashSquare } from "@/components/AdCashAd";
import { MonetagBanner } from "@/components/MonetagAd";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Eye,
  EyeOff,
  Coins,
  Mail,
  Lock,
  User,
  ArrowRight,
  Gift,
  Users,
  DollarSign,
  Shield,
} from "lucide-react";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    referralCode: "",
    agreeToTerms: false,
    subscribeNewsletter: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent double submission
    if (isLoading || isSubmitted) {
      console.log("Submission already in progress");
      return;
    }

    setIsLoading(true);
    setIsSubmitted(true);
    setError("");

    try {
      console.log("Starting form validation");

      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      if (formData.password.length < 6) {
        setError("Password must be at least 6 characters long");
        return;
      }

      console.log("Form validation passed, calling register");

      const success = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        referralCode: formData.referralCode,
      });

      console.log("Register result:", success);

      if (success) {
        console.log("Registration successful, navigating to dashboard");
        navigate("/dashboard", { replace: true });
      } else {
        setError("Registration failed. Please try again.");
        setIsSubmitted(false); // Allow retry
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("Registration failed. Please try again.");
      setIsSubmitted(false); // Allow retry
    } finally {
      setIsLoading(false);
    }
  };

  const benefits = [
    {
      icon: DollarSign,
      title: "Instant Earnings",
      description: "Start earning money immediately after registration",
    },
    {
      icon: Users,
      title: "Referral Bonuses",
      description: "Earn 20% commission from your referrals' earnings",
    },
    {
      icon: Gift,
      title: "Welcome Bonus",
      description: "Get $5 welcome bonus when you join today",
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "100% secure with guaranteed daily payments",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <Header />

      <div className="container py-16">
        {/* Ad Banners */}
        <div className="mb-6">
          <AdCashBanner className="rounded-lg overflow-hidden" />
        </div>

        <div className="mb-6">
          <MonetagBanner className="rounded-lg overflow-hidden" />
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Left Side - Benefits */}
            <div className="space-y-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
                    <Coins className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold">Join EarnClick</h1>
                    <p className="text-muted-foreground">
                      Start earning money today
                    </p>
                  </div>
                </div>
                <Badge className="gradient-primary text-primary-foreground border-0 mb-4">
                  🎉 Welcome Bonus: $1 Free
                </Badge>
              </div>

              {/* Benefits */}
              <div className="space-y-4">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-4 rounded-lg border bg-card"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{benefit.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10">
                  <div className="text-2xl font-bold text-primary">50K+</div>
                  <div className="text-sm text-muted-foreground">
                    Happy Members
                  </div>
                </div>
                <div className="text-center p-4 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10">
                  <div className="text-2xl font-bold text-primary">$100K+</div>
                  <div className="text-sm text-muted-foreground">Paid Out</div>
                </div>
              </div>

              {/* Square Ad */}
              <div className="flex justify-center mt-6">
                <AdCashSquare className="rounded-lg overflow-hidden" />
              </div>
            </div>

            {/* Right Side - Registration Form */}
            <Card className="glass-card">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center">
                  Create Account
                </CardTitle>
                <CardDescription className="text-center">
                  Join thousands of users earning money daily
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        className="pl-10"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        className="pl-10"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        className="pl-10 pr-10"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        className="pl-10 pr-10"
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            confirmPassword: e.target.value,
                          })
                        }
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Referral Code */}
                  <div className="space-y-2">
                    <Label htmlFor="referralCode">
                      Referral Code{" "}
                      <span className="text-muted-foreground font-normal">
                        (Optional)
                      </span>
                    </Label>
                    <div className="relative">
                      <Gift className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="referralCode"
                        placeholder="Enter referral code for bonus"
                        className="pl-10"
                        value={formData.referralCode}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            referralCode: e.target.value,
                          })
                        }
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Get extra $1 bonus when you use a referral code
                    </p>
                  </div>

                  {/* Terms Agreement */}
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="terms"
                        checked={formData.agreeToTerms}
                        onCheckedChange={(checked) =>
                          setFormData({
                            ...formData,
                            agreeToTerms: checked as boolean,
                          })
                        }
                        required
                      />
                      <Label
                        htmlFor="terms"
                        className="text-sm font-normal cursor-pointer leading-5"
                      >
                        I agree to the{" "}
                        <Link
                          to="/terms"
                          className="text-primary hover:underline"
                        >
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                          to="/privacy"
                          className="text-primary hover:underline"
                        >
                          Privacy Policy
                        </Link>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="newsletter"
                        checked={formData.subscribeNewsletter}
                        onCheckedChange={(checked) =>
                          setFormData({
                            ...formData,
                            subscribeNewsletter: checked as boolean,
                          })
                        }
                      />
                      <Label
                        htmlFor="newsletter"
                        className="text-sm font-normal cursor-pointer"
                      >
                        Subscribe to newsletter for earning tips & bonuses
                      </Label>
                    </div>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">
                      {error}
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full gradient-primary text-lg py-6"
                    disabled={
                      !formData.agreeToTerms || isLoading || isSubmitted
                    }
                  >
                    {isLoading
                      ? "Creating Account..."
                      : "Create Account & Get $1 Bonus"}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>

                {/* Sign In Link */}
                <div className="text-center mt-6">
                  <p className="text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="font-medium text-primary hover:underline"
                    >
                      Sign in here
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
