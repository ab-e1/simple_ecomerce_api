import argon2 from "argon2";
import { signToken } from "../utils/jwt.js";
import { User } from "../model/user.js";
import { visibleInfo } from "../utils/response.js";

export const register = async (data) => {
  const duplicate = await User.findOne({
    email: data.email.toLowerCase().trim(),
  });
  if (duplicate) {
    return {
      ok: false,
      error: "email already has been registered",
    };
  }

  const hashPassword = await argon2.hash(data.password);
  const { password, ...dataWithoutPassword } = data;
  const user = await User.create({
    name: data.name,
    email: data.email.trim().toLowerCase(),
    password: hashPassword,
    role: "buyer",
  });
  const token = signToken(dataWithoutPassword);

  return {
    ok: true,
    data: visibleInfo(user),
    token: token,
  };
};

export const login = async (data) => {
  const user = await User.findOne({
    email: data.email.toLowerCase().trim(),
  }).select("+password");

  if (!user) {
    return {
      ok: false,
      error: "email have not been registered, register first",
    };
  }

  const match = await argon2.verify(user.password, data.password);

  if (!match) {
    return { ok: false, error: "invalid email or password" };
  }

  if (match) {
    const token = signToken(visibleInfo(user));
    return {
      ok: true,
      data: visibleInfo(user),
      token: token,
    };
  }
};
