// src/server/api/routers/menu.ts
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const menuRouter = createTRPCRouter({
  // Get full menu for a restaurant (PUBLIC - no auth needed)
  getByRestaurantId: publicProcedure
    .input(z.object({ restaurantId: z.string() }))
    .query(async ({ ctx, input }) => {
      const restaurant = await ctx.db.restaurant.findUnique({
        where: { id: input.restaurantId },
        include: {
          categories: {
            include: {
              dishCategories: {
                include: {
                  dish: {
                    select: {
                      id: true,
                      name: true,
                      description: true,
                      imageUrl: true,
                      spiceLevel: true,
                      price: true,
                      dishType: true
                    },
                  },
                },
                orderBy: { displayOrder: "asc" },
              },
            },
            orderBy: { displayOrder: "asc" },
          },
        },
      });

      if (!restaurant) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Restaurant not found",
        });
      }

      return {
        id: restaurant.id,
        name: restaurant.name,
        location: restaurant.location,
        categories: restaurant.categories.map((cat) => ({
          id: cat.id,
          name: cat.name,
          displayOrder: cat.displayOrder,
          dishes: cat.dishCategories.map((dc) => dc.dish),
        })),
      };
    }),

  // Search dishes in restaurant (PUBLIC)
  search: publicProcedure
    .input(
      z.object({
        restaurantId: z.string(),
        query: z.string().min(1),
      })
    )
    .query(async ({ ctx, input }) => {
      const dishes = await ctx.db.dish.findMany({
        where: {
          restaurantId: input.restaurantId,
          OR: [
            { name: { contains: input.query, mode: "insensitive" } },
            { description: { contains: input.query, mode: "insensitive" } },
          ],
        },
      });

      return dishes;
    }),
});
