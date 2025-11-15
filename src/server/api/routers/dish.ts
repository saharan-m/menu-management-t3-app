import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc';
import { TRPCError } from '@trpc/server';

export const dishRouter = createTRPCRouter({
 
  update: protectedProcedure
    .input(
      z.object({
        dishId: z.string(),
        name: z.string().min(1),
        description: z.string().min(1),
        imageUrl: z.string().optional(),
        spiceLevel: z.number().min(0).max(5).optional(),
        price: z.number().min(0), // Add this
        dishType: z.enum(['VEG', 'NON_VEG', 'EGG']), // Add this
        categoryIds: z.array(z.string()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const dish = await ctx.db.dish.update({
        where: { id: input.dishId },
        data: {
          name: input.name,
          description: input.description,
          imageUrl: input.imageUrl,
          spiceLevel: input.spiceLevel,
          price: input.price, // Add this
          dishType: input.dishType, // Add this
          dishCategories: {
            deleteMany: {},
            create: input.categoryIds.map((categoryId) => ({
              categoryId,
            })),
          },
        },
        include: {
          dishCategories: {
            include: {
              category: true,
            },
          },
        },
      });

      return dish;
    }),

  create: protectedProcedure
    .input(
      z.object({
        restaurantId: z.string(),
        name: z.string().min(1),
        description: z.string().min(1),
        imageUrl: z.string().optional(),
        spiceLevel: z.number().min(0).max(5).optional(),
        price: z.number().min(0), // Add this
        dishType: z.enum(['VEG', 'NON_VEG', 'EGG']), // Add this
        categoryIds: z.array(z.string()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const dish = await ctx.db.dish.create({
        data: {
          restaurantId: input.restaurantId,
          name: input.name,
          description: input.description,
          imageUrl: input.imageUrl,
          spiceLevel: input.spiceLevel,
          price: input.price, // Add this
          dishType: input.dishType, // Add this
          dishCategories: {
            create: input.categoryIds.map((categoryId) => ({
              categoryId,
            })),
          },
        },
        include: {
          dishCategories: {
            include: {
              category: true,
            },
          },
        },
      });

      return dish;
    }),

  delete: protectedProcedure
    .input(z.object({ dishId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const dish = await ctx.db.dish.findFirst({
        where: {
          id: input.dishId,
          restaurant: { userId: ctx.userId },
        },
      });

      if (!dish) {
        throw new TRPCError({ code: 'FORBIDDEN', message: 'Dish not found' });
      }

      await ctx.db.dish.delete({ where: { id: input.dishId } });
      return { success: true };
    }),
});
