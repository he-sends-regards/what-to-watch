import React from "react";
import renderer from "react-test-renderer";
import {AddReview} from "./add-review";
import mockFilms from "../../mocks/films";
import {AuthorizationStatus} from "../../const";
import {Router} from "react-router-dom";
import browserHistory from "../../browser-history";
import mockAuthInfo from "../../mocks/authData";

describe(`Should AddReview render correctly`, () => {
  const addReviewComponent = renderer.create(
      <Router history={browserHistory}>
        <AddReview onSubmitAction={() => {}} filmId={1} films={mockFilms} authorizationStatus={AuthorizationStatus.NO_AUTH} authInfo={mockAuthInfo} />
      </Router>
  );
  it(`Should addReviewComponent render correctly`, () => {
    expect(addReviewComponent.toJSON()).toMatchSnapshot();
  });
});
