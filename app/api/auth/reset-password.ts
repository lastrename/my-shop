import type { User } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const user = (await prisma.user.findUnique({ where: { email } })) as User;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.RESET_PASSWORD_SECRET || "secret",
      { expiresIn: "1h" }
    );

    const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;

    const transporter = nodemailer.createTransport({
      service: "gmail", // Или другая почтовая служба
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Reset Request",
      text: `You requested to reset your password. Click the link below to reset it: ${resetLink}`,
      html: `<p>You requested to reset your password. Click the link below to reset it:</p><a href="${resetLink}">${resetLink}</a>`,
    });

    res.status(200).json({ message: "Password reset link sent" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
}
