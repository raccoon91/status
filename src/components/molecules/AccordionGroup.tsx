import React, { FC, useState } from "react";

interface IAccordionGroup {
  children: React.ReactChildren | React.ReactElement | React.ReactElement[];
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

  return (
    <>
      {React.Children.map(children, (child: any) => {
        if (child) {
          return React.cloneElement(child, { activeKey, changeActvieKey });
        }

        return null;
      })}
    </>
  );
};
