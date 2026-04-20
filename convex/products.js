import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Create a new task with the given text
export const createProduct = mutation({
  args: {
    title: v.string(),
    price: v.string(),
    imageUrl: v.string(),
    category: v.string(),
    description: v.string(),
    date: v.string(),
  },
  handler: async (ctx, args) => {
    const newTaskId = await ctx.db.insert("products", {
      title: args.title,
      price: args.price,
      imageUrl: args.imageUrl,
      category: args.category,
      description: args.description,
      date: args.date,
    });
    return newTaskId;
  },
});

export const getProduct = query({
  handler: async (ctx) => {
    const tasks = await ctx.db.query("products").order("desc").collect();
    return tasks; // do something with `tasks`
  },
});

export const updateProduct = mutation({
  args: {
    id: v.id("products"),
    title: v.string(),
    price: v.string(),
    imageUrl: v.string(),
    category: v.string(),
    description: v.string(),
    date: v.string(),
  },
  handler: async (ctx, args) => {
    const { id, title, price, imageUrl, category, description, date } = args;

    // { text: "foo", status: { done: true }, _id: ... }

    // Add `tag` and overwrite `status`:
    const updateID = await ctx.db.patch(id, {
      title: title,
      price: price,
      imageUrl: imageUrl,
      category: category,
      description: description,
      date: date,
    });
    // { text: "foo", tag: "bar", status: { archived: true }, _id: ... }
    return updateID;
  },
});

export const deleteProduct = mutation({
  args: { id: v.id("products") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const productInfo = query({
  args: { id: v.id("products") },
  handler: async (ctx, args) => {
    const task = await ctx.db.get(args.id);
    // do something with `task`
    return task; // do something with `task`
  },
});
