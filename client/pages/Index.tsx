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
} from "lucide-react";

export default function Index() {
  const features = [
    {
      icon: Eye,
      title: "View Ads & Earn",
      description:
        "Watch advertisements and earn money instantly. Simple, fast, and reliable.",
      color: "text-blue-500",
    },
    {
      icon: Users,
      title: "Referral System",
      description:
        "Invite friends and earn commission from their earnings. Build your network.",
      color: "text-purple-500",
    },
    {
      icon: DollarSign,
      title: "Instant Payments",
      description:
        "Withdraw your earnings quickly through multiple payment methods.",
      color: "text-green-500",
    },
    {
      icon: Shield,
      title: "Secure & Trusted",
      description:
        "100% secure platform with guaranteed payments and data protection.",
      color: "text-red-500",
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description:
        "Earn money anytime, anywhere. Our platform works around the clock.",
      color: "text-orange-500",
    },
    {
      icon: TrendingUp,
      title: "Growing Earnings",
      description:
        "Increase your income with daily bonuses and premium ad rewards.",
      color: "text-cyan-500",
    },
  ];

  const stats = [
    { label: "Active Users", value: "50K+", icon: Users },
    { label: "Ads Viewed", value: "2M+", icon: Eye },
    { label: "Paid Out", value: "$100K+", icon: DollarSign },
    { label: "Success Rate", value: "99.9%", icon: TrendingUp },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Student",
      content:
        "I've been using EarnClick for 6 months and earned over $500! Perfect for extra income.",
      rating: 5,
      avatar: "👩‍🎓",
    },
    {
      name: "Mike Chen",
      role: "Freelancer",
      content:
        "The referral system is amazing. I earn passive income from my network daily.",
      rating: 5,
      avatar: "👨‍💻",
    },
    {
      name: "Lisa Rodriguez",
      role: "Teacher",
      content:
        "Fast payments and reliable platform. Great way to earn money in my free time.",
      rating: 5,
      avatar: "👩‍🏫",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-purple-500/5">
        <div
          className={
            'absolute inset-0 bg-[url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.1"%3E%3Ccircle cx="6" cy="6" r="6"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')] opacity-20'
          }
        ></div>
        <div className="container relative py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="gradient-primary text-primary-foreground border-0 px-4 py-1">
                  🚀 #1 PTC Platform
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
                  Earn Money by{" "}
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Viewing Ads
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Join thousands of users earning real money daily. View ads,
                  complete tasks, refer friends, and build your income stream
                  with EarnClick.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  asChild
                  className="gradient-primary text-lg px-8 py-6"
                >
                  <Link to="/register">
                    Start Earning Today
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="text-lg px-8 py-6"
                >
                  <Link to="/demo">
                    <PlayCircle className="mr-2 h-5 w-5" />
                    Watch Demo
                  </Link>
                </Button>
              </div>

              <div className="flex items-center space-x-6 pt-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span className="text-sm font-medium">No Hidden Fees</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span className="text-sm font-medium">Instant Payouts</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span className="text-sm font-medium">24/7 Support</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="glass-card p-8 rounded-2xl">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Your Earnings</h3>
                    <Badge variant="secondary">Live</Badge>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-success/10 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Eye className="h-5 w-5 text-success" />
                        <span className="font-medium">Ads Viewed Today</span>
                      </div>
                      <span className="text-2xl font-bold text-success">
                        24
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <DollarSign className="h-5 w-5 text-primary" />
                        <span className="font-medium">Today's Earnings</span>
                      </div>
                      <span className="text-2xl font-bold text-primary">
                        $12.50
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-accent/10 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Users className="h-5 w-5 text-accent" />
                        <span className="font-medium">Referral Bonus</span>
                      </div>
                      <span className="text-2xl font-bold text-accent">
                        $8.30
                      </span>
                    </div>
                  </div>

                  <Button className="w-full gradient-primary">
                    <Gift className="mr-2 h-4 w-4" />
                    Claim Daily Bonus
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center space-y-2">
                  <div className="flex justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="text-2xl md:text-3xl font-bold">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="px-4 py-1">
              Features
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              Why Choose EarnClick?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We provide the most reliable and profitable platform for earning
              money online through advertising.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="group hover:shadow-lg transition-all duration-300"
                >
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 ${feature.color}`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="px-4 py-1">
              Testimonials
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              What Our Users Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of satisfied users who are earning money daily with
              EarnClick.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="text-4xl">{testimonial.avatar}</div>
                    <div className="flex justify-center space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <blockquote className="text-muted-foreground italic">
                      "{testimonial.content}"
                    </blockquote>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center space-y-8 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Start Earning?
            </h2>
            <p className="text-xl text-muted-foreground">
              Join EarnClick today and start building your income stream. It's
              free to join and you can start earning immediately.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                asChild
                className="gradient-primary text-lg px-8 py-6"
              >
                <Link to="/register">
                  Create Free Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="text-lg px-8 py-6"
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
