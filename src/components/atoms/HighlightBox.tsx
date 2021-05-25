import styled from "styled-components/native";
import { TouchableHighlight } from "react-native-gesture-handler";

interface IHighlightBoxProps {
  p?: string;
  px?: string;
  py?: string;
}

export const HighlightBox = styled(TouchableHighlight)<IHighlightBoxProps>`
  ${({ p }) => p && `padding: ${p};`}
  ${({ px }) => px && `padding: 0 ${px};`}
  ${({ py }) => py && `padding: ${py} 0;`}
`;
