import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// 🔹 Add Testimonial
export const addTestimonial = mutation({
  args: {
    name: v.string(),
    designation: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("testimonials", {
      name: args.name,
      designation: args.designation,
      message: args.message,
      createdAt: Date.now(),
    });
  },
});

// 🔹 Get All Testimonials
export const getTestimonials = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("testimonials")
      .order("desc")
      .collect();
  },
});