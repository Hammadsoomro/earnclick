import { connectDatabase } from "./database";
import { User } from "./models/User";
import bcrypt from "bcryptjs";

const createAdminUser = async () => {
  try {
    await connectDatabase();

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: "Hammad@earnclick.com" });
    
    if (existingAdmin) {
      console.log("✅ Admin user already exists");
      return;
    }

    // Create admin user
    const adminUser = new User({
      email: "Hammad@earnclick.com",
      password: "Hammad1992@@",
      name: "Hammad Admin",
      level: "Platinum",
      isAdmin: true,
      availableBalance: 10000, // Give admin some initial balance
      totalEarnings: 10000,
    });

    await adminUser.save();
    console.log("✅ Admin user created successfully");
    console.log("📧 Email: Hammad@earnclick.com");
    console.log("🔑 Password: Hammad1992@@");
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating admin user:", error);
    process.exit(1);
  }
};

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  createAdminUser();
}

export { createAdminUser };
