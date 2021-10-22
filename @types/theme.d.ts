import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    fonts: {
      [key in IFontSize]: string;
    };
    colors: {
      [key in IColor]: string;
    };
  }
}
