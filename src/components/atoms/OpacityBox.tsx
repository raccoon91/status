import styled from "styled-components/native";

interface IOpacityBoxProps {
  direction?: string;
  align?: string;
  justify?: string;
  m?: string | null;
  mt?: string | null;
  mb?: string | null;
  mx?: string | null;
  my?: string | null;
  p?: string | null;
  pt?: string | null;
  pb?: string | null;
  px?: string | null;
  py?: string | null;
  bgColor?: string;
}

export const OpacityBox = styled.TouchableOpacity<IOpacityBoxProps>`
  flex-direction: ${({ direction }) => direction || "row"};
  justify-content: ${({ justify }) => justify || "center"};
  align-items: ${({ align }) => align || "center"};
  ${({ m }) => m && `margin: ${m};`}
  ${({ mt }) => mt && `margin-top: ${mt};`}
  ${({ mb }) => mb && `margin-bottom: ${mb};`}
  ${({ mx }) => mx && `margin: 0 ${mx};`}
  ${({ my }) => my && `margin: ${my} 0;`}
  padding: ${({ p }) => p || "12px 16px"};
  ${({ pt }) => pt && `padding-top: ${pt};`}
  ${({ pb }) => pb && `padding-bottom: ${pb};`}
  ${({ px }) => px && `padding: 0 ${px};`}
  ${({ py }) => py && `padding: ${py} 0;`}
  background-color: ${({ bgColor }) => bgColor || "#e2e2e2"};
`;
