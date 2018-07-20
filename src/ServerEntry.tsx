import { renderToString } from "react-dom/server";
import { renderStore, renderContainer } from "./appContainer";

const express = require("express");
// const path=require('path');
const app = express();
const port = 3000;
app.use("/static", express.static("static"));
app.use(handlerRender);

function handlerRender(req: any, res: any) {
  const html = renderToString(renderContainer());
  const preloadedState = renderStore().getState();
  res.send(renderFullPage(html, preloadedState));
}

function renderFullPage(html: string, preloadedState: any) {
  return `<!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, "\\\u003c")}
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>`;
}

app.listen(port);