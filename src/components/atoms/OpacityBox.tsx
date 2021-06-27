import styled from "styled-components/native";
import { styledDimension, styledMargin } from "./styled";

interface IOpacityBoxProps extends IFlex, IDimension, IMargin, IPadding, IBorder {
  bgColor?: string;
  color?: string;
}

export const OpacityBox = styled.TouchableOpacity<IOpacityBoxProps>`
  flex-direction: ${({ d }) => d || "row"};
  justify-content: ${({ justify }) => justify || "center"};
  align-items: ${({ align }) => align || "center"};
  ${styledDimension}
  ${styledMargin}
  padding: ${({ p }) => p || "12px 16px"};
  ${({ pt }) => pt && `padding-top: ${pt};`}
  ${({ pb }) => pb && `padding-bottom: ${pb};`}
  ${({ px }) => px && `padding: 0 ${px};`}
  ${({ py }) => py && `padding: ${py} 0;`}
  ${({ border }) => border && `border: ${border};`}
  border-radius: ${({ radius }) => radius || "3px"};
  background-color: ${({ bgColor }) => bgColor || "#f8f8f8"};
`;
