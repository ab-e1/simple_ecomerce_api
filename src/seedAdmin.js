import argon2 from "argon2";
import { User } from "./model/user.js";
import mongoose from "mongoose";
import { mongoDbUri } from "./config/loadEnv.js";

const adminName = "admin";
const adminPassword = "Im_the_admin11";
const adminEmail = "admin1@email.com"

const createAdmin = async () => {
  const connect = mongoose.connect(mongoDbUri);
  const duplicate = User.findOne({
    email: adminEmail,
  })
  if (duplicate && duplicate.role ==="admin") {
    console.log('email already register as admin'),
      await mongoose.disconnect();
    return;
  }
  if (duplicate && duplicate.role ==="buyer") {
    console.log('email already register as buyer'),
      await mongoose.disconnect();
    return;
  }
  if (duplicate && duplicate.role ==="seller") {
    console.log('email already register as seller'),
      await mongoose.disconnect();
    return;
  }
  const hashPassword = await argon2.hash(adminPassword);
  await User.create({
    name: adminName,
    email: adminEmail,
    password: hashPassword,
    role: "admin",
    emailVerified: true,
  })

  console.log("admin seeded successfully");
  await mongoose.disconnect();
}

try {
  createAdmin();
} catch (err) {
  console.error("seed failed: ",  err);
}
