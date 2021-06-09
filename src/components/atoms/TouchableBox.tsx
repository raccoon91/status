import styled from "styled-components/native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

interface ITouchableBoxProps extends IFlex, IDimension, IMargin, IPadding, IBorder {
  bgColor?: string;
  color?: string;
}

export const TouchableBox = styled(TouchableWithoutFeedback)<ITouchableBoxProps>`
  align-items: ${({ align }) => align || "center"};
  justify-content: ${({ justify }) => justify || "center"};
  ${({ w }) => w && `width: ${w};`}
  ${({ h }) => h && `height: ${h};`}
  ${({ m }) => m && `margin: ${m};`}
  ${({ mt }) => mt && `margin-top: ${mt};`}
  ${({ mb }) => mb && `margin-bottom: ${mb};`}
  ${({ mx }) => mx && `margin: 0 ${mx};`}
  ${({ my }) => my && `margin: ${my} 0;`}
  ${({ p }) => p && `padding: ${p};`}
  ${({ pt }) => pt && `padding-top: ${pt};`}
  ${({ pb }) => pb && `padding-bottom: ${pb};`}
  ${({ px }) => px && `padding: 0 ${px};`}
  ${({ py }) => py && `padding: ${py} 0;`}
  ${({ border }) => border && `border: ${border};`}
  border-radius: ${({ radius }) => radius || "3px"};
  ${({ bgColor }) => bgColor && `background-color: ${bgColor};`}
`;
