import React from "react";
import renderer from "react-test-renderer";
import {ShowMoreBtn} from "./show-more-btn";
import mockFilms from "../../mocks/films";

describe(`Should ShowMoreBtn render correctly`, () => {
  const showMoreBtnComponent = renderer.create(
      <ShowMoreBtn showMoreFilmsAction={() => {}} showFilmsCount={8} filmsLength={mockFilms.length} />
  );
  it(`Should showMoreBtnComponent render correctly`, () => {
    expect(showMoreBtnComponent.toJSON()).toMatchSnapshot();
  });
});
