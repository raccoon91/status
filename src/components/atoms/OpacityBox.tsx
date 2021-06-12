import styled from "styled-components/native";

interface IOpacityBoxProps extends IFlex, IDimension, IMargin, IPadding, IBorder {
  bgColor?: string;
  color?: string;
}

export const OpacityBox = styled.TouchableOpacity<IOpacityBoxProps>`
  flex-direction: ${({ d }) => d || "row"};
  justify-content: ${({ justify }) => justify || "center"};
  align-items: ${({ align }) => align || "center"};
  ${({ w }) => w && `width: ${w};`}
  ${({ h }) => h && `height: ${h};`}
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
  ${({ border }) => border && `border: ${border};`}
  border-radius: ${({ radius }) => radius || "3px"};
  background-color: ${({ bgColor }) => bgColor || "#f8f8f8"};
`;
