import React from "react";
import { Bold } from "@src/components/atoms";
import { BasicScreenTemplate } from "@src/components/templates";

export const Welcome = () => {
  return (
    <BasicScreenTemplate p="20px 10px">
      <Bold size="xx">Welcome Status</Bold>
    </BasicScreenTemplate>
  );
};
