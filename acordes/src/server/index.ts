import { dbClient } from "@/db";
import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  getProducts: publicProcedure.query(async () => {
    return [1, 2, 3];
  }),
  getUsers: publicProcedure.query(async () => {
    return await dbClient.user.findMany();
  }),
});

export type AppRouter = typeof appRouter;
