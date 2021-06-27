import styled from "styled-components/native";
import { styledPadding } from "./styled";
import { TouchableHighlight } from "react-native-gesture-handler";

interface IHighlightBoxProps extends IPadding {}

export const HighlightBox = styled(TouchableHighlight)<IHighlightBoxProps>`
  ${styledPadding}
`;
