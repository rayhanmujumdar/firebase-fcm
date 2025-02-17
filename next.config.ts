import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    async headers() {
        return [
            {
                source: './public/firebase-messaging-sw.js',
                headers: [{ key: 'Service-Worker-Allowed', value: '/' }],
            },
        ];
    },
};

export default nextConfig;
