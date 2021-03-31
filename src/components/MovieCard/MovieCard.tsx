import React, { ReactElement, useState } from "react";

import "./MovieCard.scss";
import { Card, CardActionArea, CardMedia, CardContent } from "../../shared";
import { getFullYear } from "../../utils";
import { DialogAction } from "../../core";
import { useFallbackImage } from "../../hooks";
import { EditMovieMenu } from "../EditMovieMenu";
import { IMovieCardProps } from "./models";

export const MovieCard = (props: IMovieCardProps): ReactElement<IMovieCardProps> => {
  const { movie, editableAction, onClick } = props;

  const [isOpenedMovieMenu, setIsOpenedMovieMenu] = useState(false);

  const imgProps = useFallbackImage(movie?.posterPath, "./public/assets/noposter.png");

  const handleMenuAction = (action: DialogAction) => editableAction({ movie, action });

  const handleCardClick = () => {
    const isClosedMovieMenu: boolean = !isOpenedMovieMenu;
    if (isClosedMovieMenu) {
      onClick(movie);
    }
  };

  return (
    <>
      <Card onClick={handleCardClick} className="app-movie-card">
        <EditMovieMenu
          handleMenuOpen={setIsOpenedMovieMenu}
          handleMenuAction={handleMenuAction}
          className="app-movie-card__movie-menu"
        />
        <CardActionArea>
          <CardMedia className="app-movie-card__poster" component="img" title={movie?.title} {...imgProps} />
          <CardContent className="app-movie-card__content">
            <h3 className="app-movie-card__content-title">{movie?.title}</h3>
            <div className="app-movie-card__content-genres">{movie?.genres?.join(", ")}</div>
            <div className="app-movie-card__content-date">{getFullYear(movie?.releaseDate)}</div>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};
