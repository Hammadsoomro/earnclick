import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  DollarSign,
  Eye,
  Users,
  TrendingUp,
  Clock,
  Gift,
  Calendar,
  Wallet,
  Target,
  Award,
  ArrowUpRight,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const user = {
    name: "John Doe",
    email: "john@example.com",
    joinDate: "2024-01-15",
    level: "Silver",
    totalEarnings: 245.8,
    todayEarnings: 12.5,
    pendingEarnings: 8.3,
    adsViewed: 156,
    referrals: 12,
    nextLevelProgress: 65,
  };

  const quickStats = [
    {
      title: "Total Earnings",
      value: `$${user.totalEarnings}`,
      change: "+12.5%",
      icon: DollarSign,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Today's Earnings",
      value: `$${user.todayEarnings}`,
      change: "+8.3%",
      icon: TrendingUp,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Ads Viewed",
      value: user.adsViewed.toString(),
      change: "+24",
      icon: Eye,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Referrals",
      value: user.referrals.toString(),
      change: "+3",
      icon: Users,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
  ];

  const recentActivities = [
    {
      action: "Viewed Ad",
      amount: "+$0.50",
      time: "2 min ago",
      type: "earning",
    },
    {
      action: "Referral Bonus",
      amount: "+$2.00",
      time: "15 min ago",
      type: "referral",
    },
    {
      action: "Daily Bonus",
      amount: "+$1.00",
      time: "1 hour ago",
      type: "bonus",
    },
    {
      action: "Viewed Ad",
      amount: "+$0.50",
      time: "2 hours ago",
      type: "earning",
    },
    {
      action: "Level Up Bonus",
      amount: "+$5.00",
      time: "1 day ago",
      type: "bonus",
    },
  ];

  const availableAds = [
    {
      title: "Fashion Sale",
      payout: "$0.75",
      duration: "30s",
      category: "Shopping",
    },
    {
      title: "Tech Review",
      payout: "$1.00",
      duration: "45s",
      category: "Technology",
    },
    {
      title: "Travel Deal",
      payout: "$0.60",
      duration: "25s",
      category: "Travel",
    },
    {
      title: "Food Delivery",
      payout: "$0.50",
      duration: "20s",
      category: "Food",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <Header />

      <div className="container py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold">
                Welcome back, {user.name}! 👋
              </h1>
              <p className="text-muted-foreground mt-1">
                Here's your earning overview for today
              </p>
            </div>
            <div className="flex items-center space-x-3 mt-4 md:mt-0">
              <Badge variant="outline" className="flex items-center space-x-1">
                <Star className="h-3 w-3" />
                <span>{user.level} Member</span>
              </Badge>
              <Button className="gradient-primary">
                <Gift className="mr-2 h-4 w-4" />
                Claim Daily Bonus
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p
                        className={`text-xs ${stat.color} flex items-center mt-1`}
                      >
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        {stat.change}
                      </p>
                    </div>
                    <div className={`p-3 rounded-full ${stat.bgColor}`}>
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Available Ads */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <Eye className="h-5 w-5" />
                      <span>Available Ads</span>
                    </CardTitle>
                    <CardDescription>
                      Click on ads to start earning money
                    </CardDescription>
                  </div>
                  <Button variant="outline" asChild>
                    <Link to="/ads">View All</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {availableAds.map((ad, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <Eye className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{ad.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {ad.category} • {ad.duration}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge variant="secondary" className="text-green-600">
                          {ad.payout}
                        </Badge>
                        <Button size="sm" className="gradient-primary">
                          View Ad
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Recent Activities</span>
                </CardTitle>
                <CardDescription>
                  Your latest earning activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full ${
                            activity.type === "earning"
                              ? "bg-blue-500/10 text-blue-500"
                              : activity.type === "referral"
                                ? "bg-purple-500/10 text-purple-500"
                                : "bg-green-500/10 text-green-500"
                          }`}
                        >
                          {activity.type === "earning" ? (
                            <Eye className="h-4 w-4" />
                          ) : activity.type === "referral" ? (
                            <Users className="h-4 w-4" />
                          ) : (
                            <Gift className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-sm">
                            {activity.action}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                      <div className="text-green-600 font-medium">
                        {activity.amount}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Level Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5" />
                  <span>Level Progress</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {user.level}
                  </div>
                  <p className="text-sm text-muted-foreground">Current Level</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress to Gold</span>
                    <span>{user.nextLevelProgress}%</span>
                  </div>
                  <Progress value={user.nextLevelProgress} className="h-2" />
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  Earn $54.20 more to reach Gold level
                </p>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline" asChild>
                  <Link to="/ads">
                    <Eye className="mr-2 h-4 w-4" />
                    View More Ads
                  </Link>
                </Button>
                <Button className="w-full" variant="outline" asChild>
                  <Link to="/referrals">
                    <Users className="mr-2 h-4 w-4" />
                    Invite Friends
                  </Link>
                </Button>
                <Button className="w-full" variant="outline" asChild>
                  <Link to="/withdraw">
                    <Wallet className="mr-2 h-4 w-4" />
                    Withdraw Funds
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Earnings Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>This Month</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Total Earned</span>
                    <span className="font-medium">${user.totalEarnings}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Pending</span>
                    <span className="font-medium text-orange-500">
                      ${user.pendingEarnings}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Withdrawn</span>
                    <span className="font-medium text-green-500">$180.00</span>
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <div className="flex justify-between text-sm font-medium">
                    <span>Available Balance</span>
                    <span className="text-primary">
                      $
                      {(
                        user.totalEarnings -
                        user.pendingEarnings -
                        180
                      ).toFixed(2)}
                    </span>
                  </div>
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
