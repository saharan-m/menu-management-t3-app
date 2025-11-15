// src/server/api/root.ts
import { createTRPCRouter } from "./trpc";
import { authRouter } from "./routers/auth";
import { restaurantRouter } from "./routers/restaurant";
import { categoryRouter } from "./routers/category";
import { dishRouter } from "./routers/dish";
import { menuRouter } from "./routers/menu";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  restaurant: restaurantRouter,
  category: categoryRouter,
  dish: dishRouter,
  menu: menuRouter,
});

export type AppRouter = typeof appRouter;
