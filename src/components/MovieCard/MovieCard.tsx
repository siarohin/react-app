import React, { ReactElement, useState } from "react";
import { Card, CardActionArea, CardMedia, CardContent } from "@material-ui/core";

import "./MovieCard.scss";
import { getFullYear } from "../../utils";
import { EditMovieMenu } from "../EditMovieMenu";
import { DialogAction } from "../../core";
import { IMovieCardProps } from "./models";

export const MovieCard = (props: IMovieCardProps): ReactElement<IMovieCardProps> => {
  const [isOpenedMovieMenu, setIsOpenedMovieMenu] = useState(false);

  const handleMenuAction = (action: DialogAction) => {
    const editableAction = {
      movie: { ...props.movie },
      action
    };
    props.editableAction(editableAction);
  };

  const handleCardClick = () => {
    const isClosedMovieMenu: boolean = !isOpenedMovieMenu;
    if (isClosedMovieMenu) {
      props.onClick(props.movie);
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
          <CardMedia className="app-movie-card__poster" image={props?.movie?.posterPath} title={props?.movie?.title} />
          <CardContent className="app-movie-card__content">
            <h3 className="app-movie-card__content-title">{props?.movie?.title}</h3>
            <div className="app-movie-card__content-genres">{props?.movie?.genres?.join(", ")}</div>
            <div className="app-movie-card__content-date">{getFullYear(props?.movie?.releaseDate)}</div>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};
