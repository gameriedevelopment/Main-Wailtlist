// import type { NextConfig } from "next";
// import path from "node:path";

// const LOADER = path.resolve(__dirname, 'src/visual-edits/component-tagger-loader.js');

// const nextConfig: NextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: '**',
//       },
//       {
//         protocol: 'http',
//         hostname: '**',
//       },
//     ],
//   },
//   outputFileTracingRoot: path.resolve(__dirname, '../../'),
//   turbopack: {
//     rules: {
//       "*.{jsx,tsx}": {
//         loaders: [LOADER]
//       }
//     }
//   }
// };

// export default nextConfig;

import type { NextConfig } from "next";
import path from "node:path";

const LOADER = path.resolve(__dirname, "src/visual-edits/component-tagger-loader.js");

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
  // Remove or simplify this unless you're in a monorepo
  // outputFileTracingRoot: path.resolve(__dirname, "../../"),
  ...(isDev && {
    turbopack: {
      rules: {
        "*.{jsx,tsx}": {
          loaders: [LOADER],
        },
      },
    },
  }),
};

export default nextConfig;

