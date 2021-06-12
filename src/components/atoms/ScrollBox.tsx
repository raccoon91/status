import styled from "styled-components/native";

interface IScrollBoxProps extends IFlex, IDimension, IMargin, IPadding {
  bgColor?: string;
}

export const ScrollBox = styled.ScrollView<IScrollBoxProps>`
  ${({ f }) => f && `flex: ${f};`}
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
  ${({ py }) => py && `padding: ${py} 0;`}\
  ${({ bgColor }) => bgColor && `background-color: ${bgColor};`}
`;
