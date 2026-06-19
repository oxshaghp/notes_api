import { prisma } from "../config/prisma.config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// 1. Create a user (Register)
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });

        const { password: userPassword, ...userWithoutPassword } = user;

        const token = jwt.sign(
            { userId: user.id }, 
            process.env.JWT_SECRET, 
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        return res.status(201).json({ 
            message: "User registered successfully!", 
            token,
            user: userWithoutPassword 
        });

    } catch (error) {
        next(error);
    }
};


// 2. Login user function
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign(
            { userId: user.id }, 
            process.env.JWT_SECRET, 
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        const { password: userPassword, ...userWithoutPassword } = user;

        return res.status(200).json({ 
            message: "Login successful!", 
            token, 
            user: userWithoutPassword 
        });

    } catch (error) {
        next(error);
    }
};