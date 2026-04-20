import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Create a new task with the given text
export const createOrder = mutation({
  args: {
    productId: v.string(),
    name: v.string(),
    address: v.string(),
    pincode: v.string(),
    phoneNumber: v.string(),
    date: v.string(),
    title: v.string(),
    price: v.string(),
    imageUrl: v.string(),
    category: v.string(),
    description: v.string(),
    email: v.string(),
    userId: v.string(),
    paymentId: v.string(),
  },
  handler: async (ctx, args) => {
    const newTaskId = await ctx.db.insert("orders", {
      productId: args.productId,
      title: args.title,
      price: args.price,
      imageUrl: args.imageUrl,
      category: args.category,
      description: args.description,
      date: args.date,
      name: args.name,
      address: args.address,
      pincode: args.pincode,
      phoneNumber: args.phoneNumber,
      email: args.email,
      userId: args.userId,
      paymentId: args.paymentId,
    });
    return newTaskId;
  },
});

export const getOrder = query({
  handler: async (ctx) => {
    const tasks = await ctx.db.query("orders").order("desc").collect();
    return tasks; // do something with `tasks`
  },
});
