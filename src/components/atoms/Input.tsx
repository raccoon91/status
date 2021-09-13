import styled from "styled-components/native";
import { TextInput } from "react-native-gesture-handler";
import { dimensionCSS, marginCSS, paddingCSS, borderCSS, textCSS } from "./css";

interface IInputProps extends IDimensionCSS, IMarginCSS, IPaddingCSS, IBorderCSS, ITextCSS {}

export const Input = styled(TextInput)<IInputProps>`
  ${dimensionCSS({ w: "100%" })}
  ${marginCSS}
  ${paddingCSS}
  ${borderCSS({ border: "1px solid gray", radius: "3px" })}
  ${textCSS()}
`;
