import type { ReactNode } from "react";

interface DocumentProps {
  body: ReactNode;
  head?: ReactNode;
  lang?: string;
}

export function Document({ body, head, lang = "en" }: DocumentProps) {
  return (
    <html lang={lang}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {head}
      </head>
      <body>{body}</body>
    </html>
  );
}
