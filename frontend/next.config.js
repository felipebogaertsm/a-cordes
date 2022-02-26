const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  reactStrictMode: true,
  env: {
    SERVER_URL: process.env.SERVER_URL,
  },
  assetPrefix: isProd ? '' : 'http://localhost:8000'
}
