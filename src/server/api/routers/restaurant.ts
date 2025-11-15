// src/server/api/routers/restaurant.ts
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const restaurantRouter = createTRPCRouter({
  // Get all restaurants for current user
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const restaurants = await ctx.db.restaurant.findMany({
      where: { userId: ctx.userId },
      include: {
        _count: {
          select: { categories: true, dishes: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return restaurants;
  }),

  // Get single restaurant by ID
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const restaurant = await ctx.db.restaurant.findUnique({
      where: { id: input.id },
      include: {
        categories: true,
        dishes: {
          include: {
            dishCategories: {
              include: {
                category: true,
              },
            },
          },
        },
      },
    });

      if (!restaurant) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Restaurant not found",
        });
      }

      // Verify ownership
      if (restaurant.userId !== ctx.userId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You don't have access to this restaurant",
        });
      }

      return restaurant;
    }),

  // Create new restaurant
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1, "Restaurant name required"),
        location: z.string().min(1, "Location required"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const restaurant = await ctx.db.restaurant.create({
        data: {
          name: input.name,
          location: input.location,
          userId: ctx.userId,
        },
      });

      return restaurant;
    }),

  // Update restaurant
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1),
        location: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Verify ownership
      const restaurant = await ctx.db.restaurant.findUnique({
        where: { id: input.id },
        select: { userId: true },
      });

      if (!restaurant || restaurant.userId !== ctx.userId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You don't have permission to update this",
        });
      }

      const updated = await ctx.db.restaurant.update({
        where: { id: input.id },
        data: {
          name: input.name,
          location: input.location,
        },
      });

      return updated;
    }),

  // Delete restaurant
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const restaurant = await ctx.db.restaurant.findUnique({
        where: { id: input.id },
        select: { userId: true },
      });

      if (!restaurant || restaurant.userId !== ctx.userId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You don't have permission to delete this",
        });
      }

      await ctx.db.restaurant.delete({
        where: { id: input.id },
      });

      return { success: true };
    }),
});
