import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {AuthorizationStatus, AppRoute} from "../../const";

const Header = ({authorizationStatus, authInfo}) => {
  return (
    <header className="page-header">
      <div className="logo">
        <Link to={AppRoute.ROOT} className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>

      <div className="user-block">

        {
          authorizationStatus === AuthorizationStatus.AUTH
            ? <div className="user-block__avatar">
              <Link to={AppRoute.MY_LIST}>
                <img src={authInfo.avatar_url} alt="User avatar" width="63" height="63" />
              </Link>
            </div>
            : <Link className="user-block__link" style={{textDecoration: `none`, color: `inherit`, borderRadius: 0}} to={AppRoute.LOGIN}>Sign In</Link>
        }
      </div>

    </header>
  );
};

Header.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  authInfo: PropTypes.object.isRequired
};

const mapStateToProps = ({USER}) => ({
  authorizationStatus: USER.authorizationStatus,
  authInfo: USER.authInfo
});

export {Header};
export default connect(mapStateToProps)(Header);
