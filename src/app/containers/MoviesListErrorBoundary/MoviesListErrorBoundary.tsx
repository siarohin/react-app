import React, { Component, ReactNode } from "react";

import "./MoviesListErrorBoundary.scss";
import { IMoviesListErrorBoundaryState } from "./models";

export class MoviesListErrorBoundary extends Component<unknown, IMoviesListErrorBoundaryState> {
  constructor(props: unknown) {
    super(props);
    this.state = { hasError: false };
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        <h2 className="app-movies-list-error-boundary">
          It&apos;s not a faith in technology. It&apos;s faith in people.
        </h2>
      );
    }

    return this.props.children;
  }

  public static getDerivedStateFromError(error: Error): IMoviesListErrorBoundaryState {
    return { hasError: !!error };
  }
}
