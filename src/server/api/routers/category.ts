// src/server/api/routers/category.ts
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const categoryRouter = createTRPCRouter({
  // Get categories for a restaurant
  getByRestaurant: protectedProcedure
    .input(z.object({ restaurantId: z.string() }))
    .query(async ({ ctx, input }) => {
      // Verify restaurant ownership
      const restaurant = await ctx.db.restaurant.findUnique({
        where: { id: input.restaurantId },
        select: { userId: true },
      });

      if (!restaurant || restaurant.userId !== ctx.userId) {
        throw new TRPCError({
          code: "FORBIDDEN",
        });
      }

      const categories = await ctx.db.category.findMany({
        where: { restaurantId: input.restaurantId },
        include: {
          _count: { select: { dishCategories: true } },
        },
        orderBy: { displayOrder: "asc" },
      });

      return categories;
    }),

  // Create category
  create: protectedProcedure
    .input(
      z.object({
        restaurantId: z.string(),
        name: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Verify ownership
      const restaurant = await ctx.db.restaurant.findUnique({
        where: { id: input.restaurantId },
        select: { userId: true },
      });

      if (!restaurant || restaurant.userId !== ctx.userId) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      const category = await ctx.db.category.create({
        data: {
          name: input.name,
          restaurantId: input.restaurantId,
          displayOrder: 0,
        },
      });

      return category;
    }),

  // Update category
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1),
        displayOrder: z.number().int().min(0),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const category = await ctx.db.category.findUnique({
        where: { id: input.id },
        select: { restaurant: { select: { userId: true } } },
      });

      if (!category || category.restaurant.userId !== ctx.userId) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      const updated = await ctx.db.category.update({
        where: { id: input.id },
        data: {
          name: input.name,
          displayOrder: input.displayOrder,
        },
      });

      return updated;
    }),

  // Delete category
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const category = await ctx.db.category.findUnique({
        where: { id: input.id },
        select: { restaurant: { select: { userId: true } } },
      });

      if (!category || category.restaurant.userId !== ctx.userId) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      await ctx.db.category.delete({
        where: { id: input.id },
      });

      return { success: true };
    }),
});
