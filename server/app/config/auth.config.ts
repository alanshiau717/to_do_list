import { env } from "process";

export default {
  secret: env.AUTH_KEY,
};
