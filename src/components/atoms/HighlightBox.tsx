import styled from "styled-components/native";
import { TouchableHighlight } from "react-native-gesture-handler";

interface IHighlightBoxProps extends IPadding {}

export const HighlightBox = styled(TouchableHighlight)<IHighlightBoxProps>`
  ${({ p }) => p && `padding: ${p};`}
  ${({ px }) => px && `padding: 0 ${px};`}
  ${({ py }) => py && `padding: ${py} 0;`}
`;
