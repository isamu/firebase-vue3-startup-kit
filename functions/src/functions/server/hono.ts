import { Hono } from "hono";
import { Request as FunctionRequest, Response } from "firebase-functions";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handle = (app: Hono<any>) => {
  return async (req: FunctionRequest, resp: Response) => {
    const url = new URL(`${req.protocol}://${req.hostname}${req.url}`);

    const headers = new Headers()

    Object.keys(req.headers).forEach((k) => {
      headers.set(k, req.headers[k] as string);
    })
    const body = req.body;
    
    const newRequest = ["GET", "HEAD"].includes(req.method) ? new Request(url, {
      headers,
      method: req.method,
    }) : new Request(url, {
      headers,
      method: req.method,
      body: Buffer.from((typeof body === "string") ? body : JSON.stringify(body || {})),
    }) 
    const res = await app.fetch(newRequest);
    resp.json(await res.json());
  };
};

const app = new Hono();

app.get("/hono_api/test", (c) => c.json({message: "Hono!"}));

export const server = handle(app);
