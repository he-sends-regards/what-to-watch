import React from "react";

const withFilmsList = (Component) => (props) => {
  const [activeFilmId, setActiveFilmId] = React.useState(-1);

  const onMouseEnter = (evt) => {
    evt.preventDefault();
    setTimeout(setActiveFilmId(Number(evt.currentTarget.dataset.id), 1000));
  };

  const onMouseLeave = (evt) => {
    evt.preventDefault();
    setActiveFilmId(-1);
  };

  return (
    <Component
      {...props}
      activeFilmId={activeFilmId}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
    </Component>
  );
};

export {withFilmsList};
