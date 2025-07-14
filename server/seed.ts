import { connectDatabase } from "./database";
import { Ad } from "./models/Ad";

const initialAds = [
  {
    title: "Premium Offers & Rewards",
    description: "High-converting premium offers with instant rewards",
    url: "https://www.profitableratecpm.com/d2j586tys?key=89f7c2c680b39d6d0bb2f4e12f5f8a24",
    category: "Shopping",
    payout: 0.85,
    duration: 10,
    type: "Direct Link",
    advertiser: "Adsterra",
    difficulty: "Easy",
    featured: true,
  },
  {
    title: "Exclusive Gaming Offers",
    description: "Top gaming platforms and exclusive bonuses",
    url: "https://www.profitableratecpm.com/hftzqqd1t?key=db2c37affb6056fc6e81c50984a5c9f0",
    category: "Entertainment",
    payout: 0.95,
    duration: 10,
    type: "Direct Link",
    advertiser: "Adsterra",
    difficulty: "Easy",
    featured: true,
  },
  {
    title: "Financial Services & Apps",
    description: "Best financial apps and investment platforms",
    url: "https://www.profitableratecpm.com/s8d9m4rh9?key=ab6e0251610d024fabee48e7426b0f4f",
    category: "Finance",
    payout: 1.15,
    duration: 15,
    type: "Direct Link",
    advertiser: "Adsterra",
    difficulty: "Medium",
    featured: true,
  },
  {
    title: "Technology & Software",
    description: "Latest tech products and software solutions",
    url: "https://www.profitableratecpm.com/wgytz0b63m?key=9f277b8a79cf1893dec2ec9e4e268769",
    category: "Technology",
    payout: 1.25,
    duration: 15,
    type: "Direct Link",
    advertiser: "Adsterra",
    difficulty: "Medium",
    featured: true,
  },
  {
    title: "Health & Wellness Products",
    description: "Premium health and wellness offers",
    url: "https://example.com/health-offers",
    category: "Health",
    payout: 0.75,
    duration: 20,
    type: "Banner",
    advertiser: "Health Partners",
    difficulty: "Easy",
    featured: false,
  },
  {
    title: "Travel Deals & Booking",
    description: "Exclusive travel offers and booking discounts",
    url: "https://example.com/travel-deals",
    category: "Travel",
    payout: 0.65,
    duration: 25,
    type: "Native",
    advertiser: "Travel Network",
    difficulty: "Easy",
    featured: false,
  },
];

export const seedDatabase = async () => {
  try {
    await connectDatabase();

    // Clear existing ads
    await Ad.deleteMany({});

    // Insert initial ads
    await Ad.insertMany(initialAds);

    console.log("✅ Database seeded successfully with initial ads");
    process.exit(0);
  } catch (error) {
    console.error("❌ Database seeding error:", error);
    process.exit(1);
  }
};

// Run seeder if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase();
}
