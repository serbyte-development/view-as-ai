export function HomePage() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Controlled public fixtures for View as AI calibration." />
        <title>View as AI Calibration Site</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <main className="page-shell">
          <p className="eyebrow">View as AI</p>
          <h1>Calibration Site</h1>
          <p>
            This site hosts controlled public fixtures used to compare View as AI with AI web
            browsing systems.
          </p>
          <p>
            <a href="/baseline/">Baseline fixture</a>
          </p>
        </main>
      </body>
    </html>
  );
}
