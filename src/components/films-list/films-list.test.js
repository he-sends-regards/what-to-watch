import React from "react";
import renderer from "react-test-renderer";
import {FilmsList} from "./films-list";
import mockFilms from "../../mocks/films";
import {ALL_GENRE} from "../../const";

describe(`Should FilmsList render correctly`, () => {
  const noop = () => {};
  const filmsListComponent = renderer.create(
      <FilmsList
        activeFilmId={1}
        onMouseEnter={noop}
        onMouseLeave={noop}
        activeGenre={ALL_GENRE}
        showFilmsCount={2}
        films={mockFilms}
        doesBelongMoreLikeThis={true}
      />
  );
  it(`Should filmsListComponent render correctly`, () => {
    expect(filmsListComponent.toJSON()).toMatchSnapshot();
  });
});
