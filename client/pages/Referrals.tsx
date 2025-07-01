import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Users,
  DollarSign,
  Copy,
  Share2,
  TrendingUp,
  Star,
  Calendar,
  Gift,
  Target,
  Award,
  ExternalLink,
  CheckCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Referrals() {
  const { toast } = useToast();
  const [referralCode] = useState("EARN123456");

  const stats = {
    totalReferrals: 12,
    activeReferrals: 8,
    totalCommissions: 156.8,
    thisMonthCommissions: 42.5,
    conversionRate: 85,
    level: "Silver",
  };

  const recentReferrals = [
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      joinDate: "2024-01-15",
      status: "Active",
      totalEarnings: 45.2,
      yourCommission: 9.04,
      level: "Bronze",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      joinDate: "2024-01-12",
      status: "Active",
      totalEarnings: 78.6,
      yourCommission: 15.72,
      level: "Silver",
    },
    {
      id: 3,
      name: "Mike Chen",
      email: "mike@example.com",
      joinDate: "2024-01-10",
      status: "Active",
      totalEarnings: 124.5,
      yourCommission: 24.9,
      level: "Gold",
    },
    {
      id: 4,
      name: "Lisa Rodriguez",
      email: "lisa@example.com",
      joinDate: "2024-01-08",
      status: "Active",
      totalEarnings: 67.3,
      yourCommission: 13.46,
      level: "Bronze",
    },
    {
      id: 5,
      name: "David Wilson",
      email: "david@example.com",
      joinDate: "2024-01-05",
      status: "Inactive",
      totalEarnings: 23.1,
      yourCommission: 4.62,
      level: "Bronze",
    },
  ];

  const commissionHistory = [
    {
      id: 1,
      referralName: "John Smith",
      amount: 2.25,
      type: "Ad Commission",
      date: "2024-01-20",
    },
    {
      id: 2,
      referralName: "Sarah Johnson",
      amount: 3.93,
      type: "Ad Commission",
      date: "2024-01-20",
    },
    {
      id: 3,
      referralName: "Mike Chen",
      amount: 6.25,
      type: "Level Bonus",
      date: "2024-01-19",
    },
    {
      id: 4,
      referralName: "Lisa Rodriguez",
      amount: 1.68,
      type: "Ad Commission",
      date: "2024-01-19",
    },
    {
      id: 5,
      referralName: "John Smith",
      amount: 5.0,
      type: "Signup Bonus",
      date: "2024-01-15",
    },
  ];

  const commissionRates = [
    { level: "Bronze", rate: 20, description: "0-10 referrals" },
    { level: "Silver", rate: 25, description: "11-25 referrals" },
    { level: "Gold", rate: 30, description: "26-50 referrals" },
    { level: "Platinum", rate: 35, description: "51+ referrals" },
  ];

  const shareLinks = [
    {
      platform: "WhatsApp",
      icon: "💬",
      color: "bg-green-500",
      url: `https://wa.me/?text=Join EarnClick and start earning money by viewing ads! Use my referral code: ${referralCode} to get a $5 bonus. Sign up here: https://earnclick.com/register?ref=${referralCode}`,
    },
    {
      platform: "Facebook",
      icon: "📘",
      color: "bg-blue-600",
      url: `https://www.facebook.com/sharer/sharer.php?u=https://earnclick.com/register?ref=${referralCode}`,
    },
    {
      platform: "Twitter",
      icon: "🐦",
      color: "bg-blue-400",
      url: `https://twitter.com/intent/tweet?text=Join me on EarnClick and start earning money! Use code ${referralCode} for a bonus: https://earnclick.com/register?ref=${referralCode}`,
    },
    {
      platform: "Telegram",
      icon: "✈️",
      color: "bg-blue-500",
      url: `https://t.me/share/url?url=https://earnclick.com/register?ref=${referralCode}&text=Join EarnClick with my referral code ${referralCode} and get a bonus!`,
    },
  ];

  const copyReferralLink = () => {
    const link = `https://earnclick.com/register?ref=${referralCode}`;
    navigator.clipboard.writeText(link);
    toast({
      title: "Copied!",
      description: "Referral link copied to clipboard",
    });
  };

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast({
      title: "Copied!",
      description: "Referral code copied to clipboard",
    });
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Bronze":
        return "bg-orange-500/10 text-orange-600";
      case "Silver":
        return "bg-gray-500/10 text-gray-600";
      case "Gold":
        return "bg-yellow-500/10 text-yellow-600";
      case "Platinum":
        return "bg-purple-500/10 text-purple-600";
      default:
        return "bg-gray-500/10 text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <Header />

      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Referral Program</h1>
          <p className="text-muted-foreground">
            Invite friends and earn 20-35% commission from their earnings
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Referrals
                  </p>
                  <p className="text-2xl font-bold">{stats.totalReferrals}</p>
                  <p className="text-xs text-green-600">
                    {stats.activeReferrals} active
                  </p>
                </div>
                <div className="h-12 w-12 bg-blue-500/10 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Commissions
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    ${stats.totalCommissions}
                  </p>
                  <p className="text-xs text-green-600">
                    +${stats.thisMonthCommissions} this month
                  </p>
                </div>
                <div className="h-12 w-12 bg-green-500/10 rounded-full flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Conversion Rate
                  </p>
                  <p className="text-2xl font-bold text-purple-600">
                    {stats.conversionRate}%
                  </p>
                  <p className="text-xs text-muted-foreground">Above average</p>
                </div>
                <div className="h-12 w-12 bg-purple-500/10 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Current Level
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    {stats.level}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    25% commission
                  </p>
                </div>
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Award className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Share Your Referral Link */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Share2 className="h-5 w-5" />
                  <span>Share Your Referral Link</span>
                </CardTitle>
                <CardDescription>
                  Share your unique link and earn commission from every person
                  who joins
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Referral Code */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Your Referral Code
                  </label>
                  <div className="flex space-x-2">
                    <Input
                      value={referralCode}
                      readOnly
                      className="bg-muted font-mono"
                    />
                    <Button onClick={copyReferralCode} variant="outline">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Referral Link */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Your Referral Link
                  </label>
                  <div className="flex space-x-2">
                    <Input
                      value={`https://earnclick.com/register?ref=${referralCode}`}
                      readOnly
                      className="bg-muted text-sm"
                    />
                    <Button onClick={copyReferralLink} variant="outline">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Social Share Buttons */}
                <div>
                  <label className="text-sm font-medium mb-3 block">
                    Share on Social Media
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {shareLinks.map((social, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="h-auto p-4 flex flex-col items-center space-y-2"
                        onClick={() => window.open(social.url, "_blank")}
                      >
                        <div className="text-2xl">{social.icon}</div>
                        <span className="text-xs">{social.platform}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Referrals Data */}
            <Tabs defaultValue="referrals" className="space-y-4">
              <TabsList>
                <TabsTrigger value="referrals">My Referrals</TabsTrigger>
                <TabsTrigger value="history">Commission History</TabsTrigger>
              </TabsList>

              <TabsContent value="referrals">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Referrals</CardTitle>
                    <CardDescription>
                      People who joined using your referral code
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User</TableHead>
                          <TableHead>Level</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Their Earnings</TableHead>
                          <TableHead>Your Commission</TableHead>
                          <TableHead>Join Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentReferrals.map((referral) => (
                          <TableRow key={referral.id}>
                            <TableCell>
                              <div>
                                <div className="font-medium">
                                  {referral.name}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {referral.email}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant="secondary"
                                className={getLevelColor(referral.level)}
                              >
                                {referral.level}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  referral.status === "Active"
                                    ? "default"
                                    : "secondary"
                                }
                                className={
                                  referral.status === "Active"
                                    ? "bg-green-500/10 text-green-600"
                                    : ""
                                }
                              >
                                {referral.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="font-medium">
                              ${referral.totalEarnings}
                            </TableCell>
                            <TableCell className="font-medium text-green-600">
                              ${referral.yourCommission}
                            </TableCell>
                            <TableCell>{referral.joinDate}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history">
                <Card>
                  <CardHeader>
                    <CardTitle>Commission History</CardTitle>
                    <CardDescription>
                      Your recent commission earnings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Referral</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {commissionHistory.map((commission) => (
                          <TableRow key={commission.id}>
                            <TableCell className="font-medium">
                              {commission.referralName}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{commission.type}</Badge>
                            </TableCell>
                            <TableCell className="font-medium text-green-600">
                              +${commission.amount}
                            </TableCell>
                            <TableCell>{commission.date}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Commission Rates */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>Commission Rates</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {commissionRates.map((rate, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border ${
                      rate.level === stats.level
                        ? "bg-primary/10 border-primary"
                        : "bg-muted/50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{rate.level}</span>
                      <span className="text-lg font-bold text-primary">
                        {rate.rate}%
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {rate.description}
                    </p>
                    {rate.level === stats.level && (
                      <div className="flex items-center mt-2 text-sm text-primary">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Current Level
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* How It Works */}
            <Card>
              <CardHeader>
                <CardTitle>How It Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium">Share Your Link</h4>
                    <p className="text-sm text-muted-foreground">
                      Send your referral link to friends and family
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium">They Join & Get Bonus</h4>
                    <p className="text-sm text-muted-foreground">
                      Your referral gets $5 welcome bonus when they sign up
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium">You Earn Commission</h4>
                    <p className="text-sm text-muted-foreground">
                      Earn 20-35% commission from their ad viewing earnings
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                    4
                  </div>
                  <div>
                    <h4 className="font-medium">Lifetime Earnings</h4>
                    <p className="text-sm text-muted-foreground">
                      Continue earning as long as they remain active
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="h-5 w-5" />
                  <span>Pro Tips</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="space-y-2">
                  <h4 className="font-medium">💡 Maximize Your Earnings</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Share on social media regularly</li>
                    <li>• Explain the benefits clearly</li>
                    <li>• Help new referrals get started</li>
                    <li>• Target people interested in earning</li>
                  </ul>
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
