import type { TRPCPanelMeta } from "trpc-ui";
import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod/v4";

import { db } from "@acme/db";

// import type { auth } from "@clerk/nextjs/server";

// export type AuthContext = Awaited<ReturnType<typeof auth>>;

export const createTRPCContext = (opts: {
  headers: Headers;
  // auth: AuthContext;
}) => {
  return {
    db,
    ...opts,
  };
};

const t = initTRPC
  .context<typeof createTRPCContext>()
  .meta<TRPCPanelMeta>()
  .create({
    transformer: superjson,
    errorFormatter({ shape, error }) {
      return {
        ...shape,
        data: {
          ...shape.data,
          zodError:
            error.cause instanceof ZodError ? error.cause.flatten() : null,
        },
      };
    },
  });

export type TRPCContext = ReturnType<typeof createTRPCContext>;

export const createCallerFactory = t.createCallerFactory;
export const createTRPCRouter = t.router;
export const middleware = t.middleware;
export const procedure = t.procedure;
