// functions-src/api.ts
import serverless from "serverless-http";

// Sahi path lagayein — shayad aapka server file yahan hai
import { createServer } from "../server/node-build"; // ya "../server" agar root mein hai

// Error handling ke sath
const app = createServer();
const handler = serverless(app);

export const handler = async (event: any, context: any) => {
  try {
    return await handler(event, context);
  } catch (error) {
    console.error("Serverless handler error:", error);
    throw error;
  }
};
