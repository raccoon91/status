import styled from "styled-components/native";
import { TextInput } from "react-native-gesture-handler";

interface IInputProps {
  w?: string;
  h?: string;
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
  b?: string;
  r?: string;
}

export const Input = styled(TextInput)<IInputProps>`
  width: ${({ w }) => w || "100%"};
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
  border: ${({ b }) => b || "1px solid gray"};
  border-radius: ${({ r }) => r || "3px"};
`;
