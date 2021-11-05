import React from "react";
import { BaseToast } from "@src/components/molecules";

export const toastConfig = {
  info: ({ text1, text2 }: any) => <BaseToast type="info" title={text1} message={text2} />,
  warn: ({ text1, text2 }: any) => <BaseToast type="warn" title={text1} message={text2} />,
  error: ({ text1, text2 }: any) => <BaseToast type="error" title={text1} message={text2} />,
};
