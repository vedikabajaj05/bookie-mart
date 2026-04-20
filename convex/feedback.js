import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const addFeedback = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("feedback", {
      name: args.name,
      email: args.email,
      message: args.message,
      date: new Date().toISOString(),
    });
  },
});