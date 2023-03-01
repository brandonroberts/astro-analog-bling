export const document = () => `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <title>AnalogApp</title>
      <base href="/" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      <link rel="icon" type="image/x-icon" href="/src/favicon.ico" />
      <link href="/src/styles.css" rel="stylesheet" />
    </head>
    <body>
      <analogjs-root></analogjs-root>
      <script type="module" src="/src/app/main.ts"></script>
    </body>
  </html>
`;