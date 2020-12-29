import React from "react";
import {Router} from "react-router-dom";
import renderer from "react-test-renderer";
import browserHistory from "../../browser-history";
import {AuthorizationStatus} from "../../const";
import {Header} from "./header";
import mockAuthInfo from "../../mocks/authData";

describe(`Header snapshot tests`, () => {
  it(`Should Header render correctly main page and no-auth status`, () => {
    const tree = renderer
      .create(
          <Router history={browserHistory}>
            <Header authorizationStatus={AuthorizationStatus.NO_AUTH} authInfo={mockAuthInfo} />
          </Router>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Should Header render correctly main page and no-auth status`, () => {
    const tree = renderer
    .create(
        <Router history={browserHistory}>
          <Header authorizationStatus={AuthorizationStatus.AUTH} authInfo={mockAuthInfo} />
        </Router>
    )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
