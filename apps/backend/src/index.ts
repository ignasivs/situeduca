import { ExpressServer } from "./infrastructure/ExpressServer";

const port = process.env.PORT ? parseInt(process.env.PORT) : 3001;

const server = new ExpressServer(port);
server.listen();
