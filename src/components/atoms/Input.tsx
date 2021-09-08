import styled from "styled-components/native";
import { TextInput } from "react-native-gesture-handler";
import { styledDimension, styledMargin, styledPadding, styledBorder, styledText } from "./styled";

interface IInputProps extends IDimension, IMargin, IPadding, IBorder, IText {}

export const Input = styled(TextInput)<IInputProps>`
  ${styledDimension({ w: "100%" })}
  ${styledMargin}
  ${styledPadding}
  ${styledBorder({ border: "1px solid gray", radius: "3px" })}
  ${styledText()}
`;
