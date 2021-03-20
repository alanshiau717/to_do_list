require("dotenv").config();

const config = {
  secret: process.env.AUTH_KEY,
};

export default config;
