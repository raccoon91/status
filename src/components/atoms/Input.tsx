import styled from "styled-components/native";
import { styledMargin, styledPadding } from "./styled";
import { TextInput } from "react-native-gesture-handler";

interface IInputProps extends IDimension, IMargin, IPadding, IBorder {
  align?: string;
}

export const Input = styled(TextInput)<IInputProps>`
  width: ${({ w }) => w || "100%"};
  ${({ h }) => h && `height: ${h};`}
  ${styledMargin}
  ${styledPadding}
  border: ${({ border }) => border || "1px solid gray"};
  border-radius: ${({ radius }) => radius || "3px"};
  ${({ align }) => align && `text-align: ${align};`}
`;
