import type { NextConfig } from "next";

// セミコロン区切りの環境変数ALLOWED_DEV_ORIGINを取得し、配列に変換する
// ALLOWED_DEV_ORIGIN環境変数は、source ./setup-env.shで設定される
const env_allowed_dev_origins = process.env.ALLOWED_DEV_ORIGIN
const allowedDevOrigins = env_allowed_dev_origins ? env_allowed_dev_origins.split(';') : [];

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
};
module.exports = {
  allowedDevOrigins,
}

export default nextConfig;
