import React, { useState } from "react";
import { PersonComponent } from "./components/person.component";
import { SectionComponent } from "./components/section.component";

export const HomeSectionScreen = ({ title, items, onNavigate }) => {
  const [showContent, setShowContent] = useState(true);

  const onClick = () => {
    const show = !showContent;
    setShowContent(show);
  };

  return (
    <>
      <SectionComponent
        showContent={showContent}
        title={`${title} ${
          title == "Groups" ? items.length - 1 : items.length
        }`}
        onClick={onClick}
      />
      {showContent &&
        items.map((data, index) => {
          return (
            <PersonComponent
              CELLInfo={data}
              key={`data-${index}`}
              onNavigate={onNavigate}
            />
          );
        })}
    </>
  );
};
