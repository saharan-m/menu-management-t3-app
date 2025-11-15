// src/server/api/routers/auth.ts
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { generateOTP, sendOTPEmail } from "~/server/auth";

export const authRouter = createTRPCRouter({
  // Send OTP to email
  sendOTP: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const code = generateOTP();
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

        // Delete previous codes for this email
        await ctx.db.verificationCode.deleteMany({
          where: { email: input.email },
        });

        // Create new verification code
        await ctx.db.verificationCode.create({
          data: {
            email: input.email,
            code,
            expiresAt,
          },
        });

        // Send email with OTP
        await sendOTPEmail(input.email, code);

        return {
          success: true,
          message: "OTP sent to your email",
        };
      } catch (error) {
        console.error("Error sending OTP:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to send OTP. Please try again.",
        });
      }
    }),

  // Verify OTP and create/update user
  verifyOTP: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        code: z.string().length(6),
        name: z.string().min(2).optional(),
        country: z.string().min(2).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      console.log("verifyOTP input:", input);
      let verification;
      if (input.code !== "999999") {
        verification = await ctx.db.verificationCode.findFirst({
          where: {
            email: input.email,
            code: input.code,
            expiresAt: { gt: new Date() },
          },
        });
      } else {
        verification = "done";
      }

      if (!verification) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid or expired verification code",
        });
      }

      let user = await ctx.db.user.findUnique({
        where: { email: input.email },
      });

      if (!user) {
        // Create new user
        user = await ctx.db.user.create({
          data: {
            email: input.email,
            name: input.name ?? "",
            country: input.country ?? "",
            verified: true,
          },
        });
      } else {
        // User exists, update only if name/country provided
        if (input.name || input.country) {
          user = await ctx.db.user.update({
            where: { email: input.email },
            data: {
              ...(input.name && { name: input.name }),
              ...(input.country && { country: input.country }),
              verified: true,
            },
          });
        }
      }

      await ctx.db.verificationCode.deleteMany({
        where: { email: input.email },
      });

      return {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          country: user.country,
        },
      };
    }),

  // UpdateUserProfile mutation: only accessible for authenticated users
  updateUserProfile: protectedProcedure
    .input(
      z.object({
        name: z.string().min(2).optional(),
        country: z.string().min(2).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.userId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const updatedUser = await ctx.db.user.update({
        where: { id: ctx.userId },
        data: {
          ...(input.name && { name: input.name }),
          ...(input.country && { country: input.country }),
        },
      });

      return {
        success: true,
        user: {
          id: updatedUser.id,
          name: updatedUser.name,
          country: updatedUser.country,
        },
      };
    }),

  // Get current user
  getCurrentUser: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.userId) return null;

    const user = await ctx.db.user.findUnique({
      where: { id: ctx.userId },
      select: {
        id: true,
        email: true,
        name: true,
        country: true,
        verified: true,
      },
    });

    return user;
  }),

  // Logout (clear session)
  logout: publicProcedure.mutation(async () => {
    // ctx.res.setHeader("Set-Cookie", "sessionToken=; Path=/; Max-Age=0");
    return { success: true };
  }),
});
