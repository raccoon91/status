import React, { FC, useState } from "react";

interface IAccordionGroup {
  children: React.ReactElement[];
}

export const ArccodionGroup: FC<IAccordionGroup> = ({ children }) => {
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
