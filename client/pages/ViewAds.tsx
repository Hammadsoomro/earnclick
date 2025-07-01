import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Eye,
  DollarSign,
  Clock,
  Star,
  Play,
  CheckCircle,
  AlertCircle,
  Zap,
  Target,
  Gift,
  TrendingUp,
} from "lucide-react";

export default function ViewAds() {
  const [selectedAd, setSelectedAd] = useState<any>(null);
  const [isViewingAd, setIsViewingAd] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [earnedToday, setEarnedToday] = useState(12.5);
  const [adsViewedToday, setAdsViewedToday] = useState(24);

  const adCategories = [
    { name: "All", count: 45, active: true },
    { name: "Shopping", count: 12, active: false },
    { name: "Technology", count: 8, active: false },
    { name: "Travel", count: 6, active: false },
    { name: "Food", count: 9, active: false },
    { name: "Finance", count: 5, active: false },
    { name: "Entertainment", count: 5, active: false },
  ];

  const availableAds = [
    {
      id: 1,
      title: "Premium Fashion Sale - 50% Off",
      description: "Discover the latest fashion trends with amazing discounts",
      category: "Shopping",
      payout: 0.75,
      duration: 30,
      difficulty: "Easy",
      rating: 4.8,
      advertiser: "FashionHub",
      image: "/api/placeholder/300/200",
      type: "Banner",
      featured: true,
    },
    {
      id: 2,
      title: "New Tech Gadgets Review",
      description: "Latest smartphone reviews and tech comparisons",
      category: "Technology",
      payout: 1.0,
      duration: 45,
      difficulty: "Medium",
      rating: 4.9,
      advertiser: "TechReview",
      image: "/api/placeholder/300/200",
      type: "Video",
      featured: false,
    },
    {
      id: 3,
      title: "Dream Vacation Deals",
      description: "Explore exotic destinations with unbeatable prices",
      category: "Travel",
      payout: 0.6,
      duration: 25,
      difficulty: "Easy",
      rating: 4.7,
      advertiser: "TravelMore",
      image: "/api/placeholder/300/200",
      type: "Native",
      featured: false,
    },
    {
      id: 4,
      title: "Food Delivery App",
      description: "Order your favorite food with free delivery",
      category: "Food",
      payout: 0.5,
      duration: 20,
      difficulty: "Easy",
      rating: 4.6,
      advertiser: "QuickEats",
      image: "/api/placeholder/300/200",
      type: "Banner",
      featured: false,
    },
    {
      id: 5,
      title: "Investment Opportunities",
      description: "Start investing with as little as $10",
      category: "Finance",
      payout: 1.25,
      duration: 60,
      difficulty: "Hard",
      rating: 4.8,
      advertiser: "InvestSmart",
      image: "/api/placeholder/300/200",
      type: "Direct Link",
      featured: true,
    },
    {
      id: 6,
      title: "Streaming Service Trial",
      description: "Free 30-day trial of premium entertainment",
      category: "Entertainment",
      payout: 0.8,
      duration: 35,
      difficulty: "Easy",
      rating: 4.5,
      advertiser: "StreamFlix",
      image: "/api/placeholder/300/200",
      type: "Video",
      featured: false,
    },
  ];

  const handleViewAd = (ad: any) => {
    setSelectedAd(ad);
    setIsViewingAd(true);
    setCountdown(ad.duration);
  };

  useEffect(() => {
    if (isViewingAd && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (isViewingAd && countdown === 0) {
      // Ad viewing completed
      setEarnedToday(earnedToday + selectedAd.payout);
      setAdsViewedToday(adsViewedToday + 1);
      setIsViewingAd(false);
      setSelectedAd(null);
    }
  }, [isViewingAd, countdown]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500/10 text-green-600";
      case "Medium":
        return "bg-yellow-500/10 text-yellow-600";
      case "Hard":
        return "bg-red-500/10 text-red-600";
      default:
        return "bg-gray-500/10 text-gray-600";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Video":
        return Play;
      case "Banner":
        return Eye;
      case "Native":
        return Target;
      case "Direct Link":
        return TrendingUp;
      default:
        return Eye;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <Header />

      <div className="container py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">View Ads & Earn Money</h1>
          <p className="text-muted-foreground">
            Click on ads below to start earning. Each ad has different payouts
            and viewing times.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Today's Earnings
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    ${earnedToday.toFixed(2)}
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
                    Ads Viewed Today
                  </p>
                  <p className="text-2xl font-bold text-blue-600">
                    {adsViewedToday}
                  </p>
                </div>
                <div className="h-12 w-12 bg-blue-500/10 rounded-full flex items-center justify-center">
                  <Eye className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Available Ads
                  </p>
                  <p className="text-2xl font-bold text-purple-600">
                    {availableAds.length}
                  </p>
                </div>
                <div className="h-12 w-12 bg-purple-500/10 rounded-full flex items-center justify-center">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {adCategories.map((category, index) => (
              <Button
                key={index}
                variant={category.active ? "default" : "outline"}
                size="sm"
                className={category.active ? "gradient-primary" : ""}
              >
                {category.name} ({category.count})
              </Button>
            ))}
          </div>
        </div>

        {/* Available Ads */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Available Ads</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableAds.map((ad) => {
              const TypeIcon = getTypeIcon(ad.type);
              return (
                <Card
                  key={ad.id}
                  className="group hover:shadow-lg transition-all duration-300 relative overflow-hidden"
                >
                  {ad.featured && (
                    <div className="absolute top-4 left-4 z-10">
                      <Badge className="gradient-primary text-primary-foreground border-0">
                        <Star className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    </div>
                  )}

                  <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center space-y-2">
                        <TypeIcon className="h-12 w-12 mx-auto text-primary" />
                        <p className="text-sm font-medium">{ad.type} Ad</p>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-lg line-clamp-2">
                            {ad.title}
                          </h3>
                          <Badge
                            variant="secondary"
                            className={getDifficultyColor(ad.difficulty)}
                          >
                            {ad.difficulty}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {ad.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <DollarSign className="h-4 w-4 text-green-600" />
                            <span className="font-semibold text-green-600">
                              ${ad.payout}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{ad.duration}s</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{ad.rating}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Badge variant="outline">{ad.category}</Badge>
                          <p className="text-xs text-muted-foreground mt-1">
                            by {ad.advertiser}
                          </p>
                        </div>
                      </div>

                      <Button
                        className="w-full gradient-primary"
                        onClick={() => handleViewAd(ad)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Ad & Earn ${ad.payout}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Daily Bonus */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <Gift className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold">Daily Bonus Progress</h3>
                  <p className="text-sm text-muted-foreground">
                    View {Math.max(0, 30 - adsViewedToday)} more ads to claim
                    your $2 daily bonus
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">
                  {adsViewedToday}/30
                </div>
                <Progress
                  value={(adsViewedToday / 30) * 100}
                  className="w-32 mt-2"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ad Viewing Dialog */}
      <Dialog open={isViewingAd} onOpenChange={() => {}}>
        <DialogContent className="max-w-4xl h-[80vh]">
          <DialogHeader>
            <DialogTitle>Viewing Ad - {selectedAd?.title}</DialogTitle>
            <DialogDescription>
              Please wait {countdown} seconds to earn ${selectedAd?.payout}
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 flex flex-col space-y-4">
            {/* Countdown */}
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-primary">{countdown}</div>
              <Progress
                value={
                  selectedAd
                    ? ((selectedAd.duration - countdown) /
                        selectedAd.duration) *
                      100
                    : 0
                }
                className="w-full"
              />
            </div>

            {/* Ad Content */}
            <div className="flex-1 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="text-6xl">🎯</div>
                <h3 className="text-2xl font-bold">{selectedAd?.title}</h3>
                <p className="text-lg text-muted-foreground max-w-md">
                  {selectedAd?.description}
                </p>
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  {selectedAd?.advertiser}
                </Badge>
              </div>
            </div>

            {countdown === 0 && (
              <div className="text-center space-y-2">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto" />
                <p className="text-lg font-semibold text-green-600">
                  Congratulations! You earned ${selectedAd?.payout}
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
