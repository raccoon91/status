import React, { FC } from "react";
import styled from "styled-components/native";
import { Bold, Text } from "@src/components/atoms";

const color: { [key: string]: string } = {
  info: "#0dcaf0",
  warn: "#ffc107",
  error: "#dc3545",
};

const ToastBox = styled.View<{ type: string }>`
  align-items: flex-start;
  width: 90%;
  min-width: 320px;
  max-width: 720px;
  padding: 8px 16px;
  background-color: white;
  border-left-width: 8px;
  border-left-color: ${({ type }) => color[type]};
  border-radius: 3px;
  shadow-color: black;
  elevation: 5;
`;

interface IBaseToastProps {
  type: string;
  title: string;
  message: string;
}

export const BaseToast: FC<IBaseToastProps> = ({ type, title, message }) => {
  return (
    <ToastBox type={type}>
      <Bold size="sm">{title}</Bold>
      <Text size="xs">{message}</Text>
    </ToastBox>
  );
};
