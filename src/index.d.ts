import type { Highstorm } from "@highstorm/client";
import type { StreamOptions, Options } from "morgan";
import type { LogFormats } from "./index";
import type { IncomingMessage, ServerResponse } from "http";

type Handler<
  Request extends IncomingMessage,
  Response extends ServerResponse
> = (req: Request, res: Response, callback: (err?: Error) => void) => void;

export class HttpLogger {
  protected highstorm: Highstorm;
  protected stream: StreamOptions;
  protected format: LogFormats;
  protected opts: Options<IncomingMessage, ServerResponse<IncomingMessage>>;

  constructor(
    token: string,
    channelName: string,
    format: LogFormats,
    opts: Options<IncomingMessage, ServerResponse<IncomingMessage>>
  );

  middleware(): Handler<IncomingMessage, ServerResponse<IncomingMessage>>;
}
