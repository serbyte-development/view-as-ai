# view-as-ai

Run View as AI from npm without installing Python, or call it directly from Node.js.

## Node.js API

```js
import { viewAsAI } from "view-as-ai";

const result = await viewAsAI("https://example.com");
console.log(result.text);
```

The result contains `url`, `title`, `text`, and the reference `urls` map. Use
`{ markdownLinks: true }` to convert native-style references into Markdown links.

The matching standalone binary is downloaded and checksum-verified during package install. Runtime
calls reuse that installed executable. If install scripts were disabled, the package can still fetch
and cache the matching binary on first use.

### Next.js on Vercel

Use a normal Node.js Route Handler:

```ts
// app/api/view-as-ai/route.ts
import { viewAsAI } from "view-as-ai";

export async function POST(request: Request) {
  const { url } = await request.json();
  const result = await viewAsAI(url, { timeout: 20 });
  return Response.json(result);
}
```

Keep the package external on the server and include its installed executable in the function trace:

```ts
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["view-as-ai"],
  outputFileTracingIncludes: {
    "/api/view-as-ai": ["./node_modules/view-as-ai/vendor/**/*"],
  },
};

export default nextConfig;
```

Vercel runs this route on the default Node.js runtime. Do not set the route to the Edge runtime.

## CLI

```sh
npx view-as-ai https://example.com
```

For a Next.js app before deployment:

```sh
npm run dev
npx view-as-ai localhost:3000
npx view-as-ai localhost:3000/pricing
```

Or keep it in the project:

```sh
npm install --save-dev view-as-ai
```

```json
{
  "scripts": {
    "ai:view": "view-as-ai localhost:3000"
  }
}
```

Then run `npm run ai:view` while the Next.js dev server is running.

The npm launcher uses the same version-matched standalone View as AI executable from the
[GitHub Release](https://github.com/Serbyte-Development/view-as-ai/releases). Release checksums are
verified before a downloaded binary is used. Python is not required.

All View as AI CLI options are forwarded directly:

```sh
npx view-as-ai localhost:3000 --format text
npx view-as-ai localhost:3000 --format json
npx view-as-ai localhost:3000 -o preview.txt
```

Supported platforms:

- macOS ARM64 and x64
- Linux ARM64 and x64
- Windows ARM64 and x64

View as AI reads the HTTP response your app serves. It does not execute client-side JavaScript,
which makes it useful for finding pages whose meaningful content is missing from the initial HTML.

Source, calibration methodology, and standalone release artifacts:
[Serbyte-Development/view-as-ai](https://github.com/Serbyte-Development/view-as-ai).
