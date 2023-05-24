import { Highstorm } from "@highstorm/client";
import morgan, { StreamOptions } from "morgan";
import http from "http";
import type { IncomingMessage, ServerResponse } from "http";

export type LogFormats = "combined" | "common" | "dev" | "short" | "tiny";

export type HttpLoggerOptions = {
  token: string;
  channelName: string;
  format: LogFormats;
  opts?: morgan.Options<
    http.IncomingMessage,
    http.ServerResponse<http.IncomingMessage>
  >;
  eventName?: string;
};

export class HttpLogger {
  protected highstorm: Highstorm;
  protected stream: StreamOptions;
  protected format: LogFormats;
  protected opts?: morgan.Options<
    IncomingMessage,
    ServerResponse<IncomingMessage>
  >;

  constructor({
    token,
    channelName,
    format = "combined",
    opts,
    eventName,
  }: HttpLoggerOptions) {
    this.highstorm = new Highstorm({ token: token });
    this.format = format;
    this.opts = opts;
    this.stream = {
      write: async (message) => {
        await this.highstorm.ingest(channelName, {
          event: eventName || "HTTP",
          content: message,
        });
      },
    };
  }

  middleware() {
    return morgan(this.format, { stream: this.stream, ...this.opts });
  }
}
