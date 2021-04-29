import path from "path";
import express, { Request, Response } from "express";
import { ChunkExtractor } from "@loadable/server";
import Helmet, { HelmetData } from "react-helmet";
import compression from "compression";
import "babel-polyfill";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { StaticRouterContext } from "react-router";
import { Provider } from "react-redux";
import { tap, take } from "rxjs/operators";
import { ActionsObservable, ofType } from "redux-observable";

import { configureStore, effects as effects$, MoviesActions, SharedModels, State } from "./app/core";
import App from "./app/App";

function getHTML(html: string, preloadedState: State, helmetData: HelmetData, extractor: ChunkExtractor): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta name="viewport" content="minimum-scale=1,initial-scale=1,width=device-width">
        ${helmetData.meta.toString()}
        ${helmetData.title.toString()}
        ${helmetData.link.toString()}
        ${extractor.getLinkTags()}
        ${extractor.getStyleTags()}
        <base href="/">
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, "\\u003c")}
        </script>
        ${extractor.getScriptTags()}
      </body>
    </html>
  `;
}

const app = express();

app.use(
  compression({
    level: 2, // set compression level from 1 to 9 (6 by default)
    filter: (req: Request, res: Response) => (req.headers["x-no-compression"] ? false : compression.filter(req, res))
  })
);

app.use(express.static(path.resolve(__dirname, "..", "dist")));

app.use((req: Request, res: Response): void => {
  const location = req.url;
  const context: StaticRouterContext = {};
  const { store, runEffects } = configureStore();

  const statsFile = path.resolve(path.resolve(__dirname, "loadable-stats.json"));
  const extractor = new ChunkExtractor({ statsFile });

  const jsx = extractor.collectChunks(
    <Provider store={store}>
      <StaticRouter context={context} location={location}>
        <App />
      </StaticRouter>
    </Provider>
  );

  const observer$ = (action$: ActionsObservable<SharedModels.ActionWithPayload<any>>) =>
    action$.pipe(
      ofType(MoviesActions.loadMoviesComplete),
      tap(() => {
        // Second render for updating context
        renderToString(jsx);

        const helmetData = Helmet.renderStatic();

        if ((context as any).url) {
          res.writeHead(302, { Location: (context as any).url });
          res.end();
          return;
        }

        res
          .status(context.statusCode || 200)
          .send(getHTML(renderToString(jsx), store.getState(), helmetData, extractor));
      }),
      take(1)
    );

  runEffects([effects$, observer$]);

  // First render for starting initial actions
  renderToString(jsx);
});

export { app };
