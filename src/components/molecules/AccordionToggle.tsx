import React, { FC, useState } from "react";

interface IAccordionToggle {
  children: React.ReactElement[];
}

export const ArccodionToggle: FC<IAccordionToggle> = ({ children }) => {
  const [activeKey, setActiveKey] = useState<number | null>(null);

  const changeActvieKey = (selectedActiveKey: number) => {
    if (selectedActiveKey === activeKey) {
      setActiveKey(null);
    } else {
      setActiveKey(selectedActiveKey);
    }
  };

  return <>{React.Children.map(children, (child) => React.cloneElement(child, { activeKey, changeActvieKey }))}</>;
};
