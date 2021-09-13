import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    fonts: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xx: string;
      ti: string;
    };
    colors: {
      white: string;
      black: string;
      gray: string;
      gray50: string;
      gray100: string;
      gray200: string;
      gray300: string;
      gray400: string;
      gray500: string;
    };
  }
}
