import * as express from "express";

export const hello_response = async (req: express.Request, res: express.Response) => {
  res.json({ message: "hello" });
};

export const sleep = async (milliseconds: number) => {
  return await new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export const stream_response = async (req: express.Request, res: express.Response) => {
  res.setHeader("Content-Type", "text/event-stream;charset=utf-8");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("X-Accel-Buffering", "no");

  for await (const num of ["1", "2", "3", "4", "5"]) {
    res.write(num + "\n");
    await sleep(1000);
  }

  res.write("___END___");
  res.write("12345");
  return res.end();
};

export const app = express();
app.use(express.json());
app.get("/api/hello", hello_response);
app.get("/v2_api/hello", hello_response);
app.get("/v2_api/stream", stream_response);
