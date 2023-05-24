# express-highstorm

ExpressJS Application Middleware to ingest request data from `morgan` to [highstorm.app](https://highstorm.app).

## Usage

Install the package in your express app.

```bash
npm i express-highstorm
```

Create a HttpLogger Instance

```ts
import { HttpLogger, HttpLoggerOptions } from "express-highstorm";
import dotenv from "dotenv";

dotenv.config();

// these are required options
const options: HttpLoggerOptions = {
  token: process.env.HIGHSTORM_KEY!,
  channelName: "morgan_highstorm",
  format: "combined",
};

// creating new instance
export const httpLogger = new HttpLogger(options);
```

Putting the `httpLogger` inside the express application.

```ts
import { httpLogger } from "./httpLogger";
import express, { Express } from "express";

const app: Express = express();

// calling the middleware option to get the express complaint morgan middleware
const middleware = httpLogger.middleware();
app.use(middleware);

app.get("/", (_, res) => {
  res.json({ message: "hello" });
});

app.listen(3000, () => console.log("server started at port 3000"));
```

## License

This project is under MIT License.
