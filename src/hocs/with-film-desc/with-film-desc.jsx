import React from "react";

const withFilmDesc = (Component) => (props) => {
  const [activeSection, setActiveSection] = React.useState(`Overview`);

  const handleActiveSectionChange = (evt) => {
    if (evt.target.tagName !== `A`) {
      return;
    }
    evt.preventDefault();
    setActiveSection(evt.target.textContent);
  };

  return (
    <Component
      {...props}
      activeSection={activeSection}
      onActiveSectionChange={handleActiveSectionChange}
    >
    </Component>
  );
};

export {withFilmDesc};
