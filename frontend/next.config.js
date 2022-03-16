const isProd = process.env.NODE_ENV === "production"

module.exports = {
    reactStrictMode: true,
    env: {
        SERVER_URL: process.env.SERVER_URL,
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
}
