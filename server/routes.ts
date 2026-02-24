import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post(api.waitlist.create.path, async (req, res) => {
    try {
      const input = api.waitlist.create.input.parse(req.body);
      const entry = await storage.createWaitlistEntry(input);
      res.status(201).json(entry);
    } catch (err) {
      // It might be a zod error or a postgres unique constraint error
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      
      const error = err as Error;
      if (error.message?.includes('unique constraint')) {
        return res.status(400).json({
          message: "Email already registered for the waitlist.",
          field: "email",
        });
      }
      
      throw err;
    }
  });

  return httpServer;
}
