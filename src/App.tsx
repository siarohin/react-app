import React, { ComponentType, ReactElement, useCallback, useMemo, useState } from "react";
import { connect } from "react-redux";
import includes from "lodash/includes";
import sortBy from "lodash/sortBy";

import "./App.scss";
import { Footer } from "./components";
import {
  MainLayout,
  MoviesFilter,
  MoviesList,
  MoviesListErrorBoundary,
  Header,
  HeaderLayout,
  MovieDialog
} from "./containers";
import { DialogTitle, DEFAULT_GENRE, FilterOptions, DialogAction, MoviesModels, MoviesActions, State } from "./core";
import { IDialogSettings, IMovieAction } from "./models";
import { getEnumKey } from "./utils";
import { useComponentDidMount, useHeader } from "./hooks";
import { AppState } from "./AppState";

const App = (props: MoviesModels.IMoviesState & MoviesModels.IDispatchAction): ReactElement => {
  const { movies, isLoading, dispatch } = props;

  const [movieDialog, setMovieDialog] = useState(AppState.movieDialog);
  const [genres, setGenres] = useState(AppState.genres);
  const [sortingOptions, setSortingOptions] = useState(AppState.sortingOptions);

  useComponentDidMount(() => dispatch(MoviesActions.loadMovies()));

  const handleCloseDialog = useCallback((): void => setMovieDialog({ dialogSettings: undefined, open: false }), [
    movieDialog
  ]);

  const handleEditableAction = useCallback(
    (action: IMovieAction): void => {
      try {
        const actionType: string = getEnumKey(DialogAction, action?.action);
        const dialogSettings: IDialogSettings = { title: DialogTitle[actionType], values: action?.movie };
        setMovieDialog({ dialogSettings, open: true });
      } catch {
        return;
      }
    },
    [movieDialog]
  );

  const handleSelectedGenre = useCallback((selected: string): void => setGenres({ ...genres, selected }), [genres]);

  const handleChangeSorting = useCallback(
    (selected: string): void => setSortingOptions({ ...sortingOptions, selected }),
    [sortingOptions]
  );

  const [header, setHeader] = useHeader(<Header editableAction={handleEditableAction} />);
  const handleMovieClick = useCallback((movie?: MoviesModels.IMovie): void => setHeader(movie), [header]);

  const getSortedMovies = useMemo((): Array<MoviesModels.IMovie> => {
    try {
      const sortedOption: string = getEnumKey(FilterOptions, sortingOptions?.selected);
      return sortBy(movies, [sortedOption]);
    } catch {
      return movies;
    }
  }, [movies, sortingOptions]);

  const getFilteredAndSortedMovies = useMemo((): Array<MoviesModels.IMovie> => {
    const sortedMovies: Array<MoviesModels.IMovie> = getSortedMovies;
    const isGenreSelected: boolean = !!genres.selected && genres.selected !== DEFAULT_GENRE;
    return isGenreSelected ? sortedMovies?.filter((movie) => includes(movie.genres, genres.selected)) : sortedMovies;
  }, [getSortedMovies, genres]);

  const getMoviesCount = useMemo((): string => {
    const movies: Array<MoviesModels.IMovie> = getFilteredAndSortedMovies;
    return movies?.length?.toString();
  }, [getFilteredAndSortedMovies]);

  const getDialog = useMemo((): ReactElement<typeof MovieDialog> | null => {
    const hasNotDialog: boolean = !movieDialog.dialogSettings;
    return hasNotDialog ? null : (
      <MovieDialog
        genres={genres.all}
        dialogSettings={movieDialog.dialogSettings}
        open={movieDialog.open}
        onClose={handleCloseDialog}
      />
    );
  }, [movieDialog]);

  return (
    <>
      <HeaderLayout container={header} />
      <MainLayout>
        <MoviesFilter
          isLoading={isLoading}
          count={getMoviesCount}
          genres={genres}
          sortingOptions={sortingOptions}
          selected={handleSelectedGenre}
          changeSorting={handleChangeSorting}
        />
        <MoviesListErrorBoundary>
          <MoviesList
            isLoading={isLoading}
            handleMovieClick={handleMovieClick}
            movies={getFilteredAndSortedMovies}
            editableAction={handleEditableAction}
          />
        </MoviesListErrorBoundary>
        {getDialog}
      </MainLayout>
      <Footer />
    </>
  );
};

const mapStateToProps = (state: State): MoviesModels.IMoviesState => {
  return {
    movies: state.movieList.movies,
    isLoading: state.movieList.isLoading
  };
};

export default connect(mapStateToProps)(App as ComponentType<any>);
