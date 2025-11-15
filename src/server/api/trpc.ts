
import { initTRPC, TRPCError } from "@trpc/server";
import SuperJSON from "superjson";   //???
import { db } from "~/server/db";

interface CreateContextOptions {
  headers: Headers;
  req?: Request | undefined;
  res?: Response | undefined;
}

export const createTRPCContext = async (opts: CreateContextOptions) => {
  let userId: string | null = null;

  try {
    if (opts.headers) {
      const cookieHeader = opts.headers.get("cookie") ?? "";
      console.log("🔍 Cookie header:", cookieHeader);

      const match = /sessionToken=([^;]+)/.exec(cookieHeader);
          userId = match?.[1]?.split(":")?.[0] ?? null;
      if(userId)
        console.log("Found userId from cookie:", userId);
      else {
        console.log(" No sessionToken cookie found");
      }
    }
  } catch (error) {
    console.error("Context error:", error);
  }

  return {
    db,
    userId,
    headers: opts.headers,
  };
};

type Context = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<Context>().create({
  transformer: SuperJSON,               // ← REQUIRED for your client to use a transformer
  isServer: typeof window === "undefined",
  allowOutsideOfServer: true,
  isDev: process.env.NODE_ENV === "development",
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  console.log("🔐 Protected - userId:", ctx.userId);

  if (!ctx.userId) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to access this",
    });
  }

  return next({
    ctx: {
      ...ctx,
      userId: ctx.userId,
    },
  });
});
