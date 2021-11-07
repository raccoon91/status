import React from "react";
import { BaseToast } from "@src/components/molecules";

export const toastConfig = {
  info: ({ type, text1, text2 }: any) => <BaseToast type={type} title={text1} message={text2} />,
  warn: ({ type, text1, text2 }: any) => <BaseToast type={type} title={text1} message={text2} />,
  error: ({ type, text1, text2 }: any) => <BaseToast type={type} title={text1} message={text2} />,
};
