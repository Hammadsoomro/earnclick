import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Eye,
  DollarSign,
  Users,
  Zap,
  Shield,
  Clock,
  TrendingUp,
  Gift,
  Star,
  CheckCircle,
  ArrowRight,
  PlayCircle,
  Smartphone,
  Globe,
  Award,
  Coins,
} from "lucide-react";

export default function Index() {
  const features = [
    {
      icon: Eye,
      title: "Easy Ad Viewing",
      description: "Simply click on ads and earn money instantly. Very easy and secure.",
      color: "text-blue-500",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Users,
      title: "Referral System",
      description: "Invite friends and earn 25% commission from their earnings forever.",
      color: "text-purple-500",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: DollarSign,
      title: "Instant Payments",
      description: "Fast withdrawals through PayPal, Bank Transfer, and Crypto. No delays.",
      color: "text-green-500",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Shield,
      title: "100% Secure",
      description: "Your data and payments are completely secure. Zero risk guaranteed.",
      color: "text-red-500",
      gradient: "from-red-500 to-orange-500",
    },
    {
      icon: Clock,
      title: "Work 24/7",
      description: "View ads and earn money anytime, day or night. Always available.",
      color: "text-orange-500",
      gradient: "from-orange-500 to-yellow-500",
    },
    {
      icon: TrendingUp,
      title: "Growing Earnings",
      description: "Increase your income with daily bonuses and premium ad rewards.",
      color: "text-cyan-500",
      gradient: "from-cyan-500 to-blue-500",
    },
  ];

  const stats = [
    { label: "Active Users", value: "50K+", icon: Users, color: "text-blue-500" },
    { label: "Ads Viewed", value: "2M+", icon: Eye, color: "text-purple-500" },
    { label: "Paid Out", value: "$100K+", icon: DollarSign, color: "text-green-500" },
    { label: "Success Rate", value: "99.9%", icon: TrendingUp, color: "text-orange-500" },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Student",
      content: "Amazing platform! I've earned over $500 in just 6 months. Perfect for extra income.",
      rating: 5,
      avatar: "👩‍🎓",
      earnings: "$500",
    },
    {
      name: "Mike Chen",
      role: "Freelancer",
      content: "Best way to earn money from home. The referral system is incredible!",
      rating: 5,
      avatar: "👨‍💻",
      earnings: "$350",
    },
    {
      name: "Lisa Rodriguez",
      role: "Teacher",
      content: "I easily earn $50-80 daily. Payments are always on time and reliable.",
      rating: 5,
      avatar: "👩‍🏫",
      earnings: "$750",
    },
  ];

  const paymentMethods = [
    { name: "PayPal", icon: "💳", popular: true },
    { name: "Bank Transfer", icon: "🏦", popular: true },
    { name: "Cryptocurrency", icon: "₿", popular: false },
    { name: "Wire Transfer", icon: "📱", popular: false },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/10 to-purple-500/10">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container relative py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-6">
                <Badge className="gradient-primary text-primary-foreground border-0 px-6 py-2 text-lg">
                  🚀 #1 PTC Platform
                </Badge>
                <h1 className="text-4xl lg:text-7xl font-bold tracking-tight leading-tight">
                  <span className="bg-gradient-to-r from-primary via-accent to-purple-600 bg-clip-text text-transparent">
                    Earn Money
                  </span>
                  <br />
                  <span className="text-foreground">The Easy Way</span>
                </h1>
                <p className="text-xl lg:text-2xl text-muted-foreground max-w-lg leading-relaxed">
                  Simply view ads and earn <span className="font-bold text-primary">thousands daily</span>.
                  Refer friends and get <span className="font-bold text-accent">lifetime commission</span>.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <Button
                  size="lg"
                  asChild
                  className="gradient-primary text-xl px-10 py-7 rounded-2xl shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  <Link to="/register">
                    Start Earning Now
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="text-xl px-10 py-7 rounded-2xl border-2 hover:scale-105 transition-all duration-300"
                >
                  <Link to="/login">
                    <PlayCircle className="mr-3 h-6 w-6" />
                    Login Now
                  </Link>
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-8 pt-6">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-success" />
                  <span className="font-medium">No Hidden Fees</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-success" />
                  <span className="font-medium">Instant Payouts</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-success" />
                  <span className="font-medium">24/7 Support</span>
                </div>
              </div>
            </div>

            <div className="relative animate-slide-in">
              {/* Floating Cards Animation */}
              <div className="relative">
                <Card className="glass-card p-8 rounded-3xl transform rotate-3 hover:rotate-0 transition-all duration-500">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold">Today's Earnings</h3>
                      <Badge variant="secondary" className="animate-pulse">Live</Badge>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-6 bg-success/10 rounded-2xl">
                        <div className="flex items-center space-x-4">
                          <Eye className="h-8 w-8 text-success" />
                          <span className="text-xl font-medium">Ads Viewed</span>
                        </div>
                        <span className="text-4xl font-bold text-success animate-pulse">
                          42
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-6 bg-primary/10 rounded-2xl">
                        <div className="flex items-center space-x-4">
                          <DollarSign className="h-8 w-8 text-primary" />
                          <span className="text-xl font-medium">Today's Earning</span>
                        </div>
                        <span className="text-4xl font-bold text-primary animate-pulse">
                          $125.50
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-6 bg-accent/10 rounded-2xl">
                        <div className="flex items-center space-x-4">
                          <Users className="h-8 w-8 text-accent" />
                          <span className="text-xl font-medium">Referral Bonus</span>
                        </div>
                        <span className="text-4xl font-bold text-accent animate-pulse">
                          $68.30
                        </span>
                      </div>
                    </div>

                    <Button className="w-full gradient-primary text-xl py-6 rounded-2xl">
                      <Gift className="mr-3 h-6 w-6" />
                      Claim Daily Bonus
                    </Button>
                  </div>
                </Card>

                {/* Floating Elements */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center animate-bounce">
                  <Coins className="h-12 w-12 text-white" />
                </div>
                <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center animate-bounce delay-500">
                  <Star className="h-10 w-10 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="text-center space-y-4 group hover:scale-110 transition-all duration-300"
                >
                  <div className="flex justify-center">
                    <div className={`flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r ${stat.color} bg-opacity-10`}>
                      <Icon className={`h-10 w-10 ${stat.color}`} />
                    </div>
                  </div>
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-lg text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container">
          <div className="text-center space-y-6 mb-20">
            <Badge variant="outline" className="px-6 py-2 text-lg">
              Features
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Why Choose EarnClick?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              The most trusted and secure platform where you can easily earn money online
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 border-0 bg-gradient-to-br from-background to-muted/50"
                >
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center group-hover:scale-110 transition-all duration-300`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">Payment Methods</h2>
            <p className="text-xl text-muted-foreground">
              Multiple convenient payment options for your withdrawals
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {paymentMethods.map((method, index) => (
              <div
                key={index}
                className={`relative p-8 rounded-2xl border-2 text-center hover:scale-105 transition-all duration-300 ${
                  method.popular
                    ? "bg-gradient-to-r from-primary/10 to-accent/10 border-primary"
                    : "bg-background border-border"
                }`}
              >
                {method.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 gradient-primary">
                    Popular
                  </Badge>
                )}
                <div className="text-4xl mb-4">{method.icon}</div>
                <h3 className="font-bold text-lg">{method.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="container">
          <div className="text-center space-y-6 mb-20">
            <Badge variant="outline" className="px-6 py-2 text-lg">
              Testimonials
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                What Our Users Say
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="text-center hover:shadow-2xl transition-all duration-500 hover:scale-105">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="text-6xl">{testimonial.avatar}</div>
                    <div className="flex justify-center space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <blockquote className="text-muted-foreground italic text-lg">
                      "{testimonial.content}"
                    </blockquote>
                    <div>
                      <div className="font-bold text-xl">{testimonial.name}</div>
                      <div className="text-muted-foreground">{testimonial.role}</div>
                      <Badge className="mt-2 gradient-primary">
                        Earned: {testimonial.earnings}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary via-accent to-purple-600 text-white">
        <div className="container">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-bold">
              Start Earning Today!
            </h2>
            <p className="text-2xl opacity-90">
              Why wait? Join now and start earning money immediately
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                asChild
                className="bg-white text-primary hover:bg-gray-100 text-xl px-12 py-8 rounded-2xl shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <Link to="/register">
                  Create Free Account
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-2 border-white text-white hover:bg-white hover:text-primary text-xl px-12 py-8 rounded-2xl hover:scale-105 transition-all duration-300"
              >
                <Link to="/login">Login to Account</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
