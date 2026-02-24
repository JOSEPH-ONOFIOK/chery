import { db } from "./db";
import {
  waitlist,
  type CreateWaitlistRequest,
  type WaitlistResponse
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getWaitlistEntries(): Promise<WaitlistResponse[]>;
  createWaitlistEntry(entry: CreateWaitlistRequest): Promise<WaitlistResponse>;
}

export class DatabaseStorage implements IStorage {
  async getWaitlistEntries(): Promise<WaitlistResponse[]> {
    return await db.select().from(waitlist);
  }

  async createWaitlistEntry(entry: CreateWaitlistRequest): Promise<WaitlistResponse> {
    const [created] = await db.insert(waitlist).values(entry).returning();
    return created;
  }
}

export const storage = new DatabaseStorage();
