import { Hono } from "hono";
import { Request as FunctionRequest } from "firebase-functions/v2/https";
import { Response } from "express";

const toFetchRequest = (req: FunctionRequest) => {
  const url = new URL(`${req.protocol}://${req.hostname}${req.url}`);
  const headers = new Headers();
  Object.keys(req.headers).forEach((k) => {
    headers.set(k, req.headers[k] as string);
  });
  if (["GET", "HEAD"].includes(req.method)) {
    return new Request(url, { headers, method: req.method });
  }
  const body = req.body;
  const payload = typeof body === "string" ? body : JSON.stringify(body ?? {});
  return new Request(url, { headers, method: req.method, body: payload });
};

const handle = (app: Hono<any>) => {
  return async (req: FunctionRequest, resp: Response) => {
    const res = await app.fetch(toFetchRequest(req));
    resp.json(await res.json());
  };
};

const app = new Hono();

app.get("/hono_api/test", (c) => c.json({ message: "Hono!" }));

export const server = handle(app);
