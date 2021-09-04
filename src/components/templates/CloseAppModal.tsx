import React, { FC } from "react";
import { Modal } from "react-native";
import { Box, Text } from "@src/components/atoms";

interface ICloseAppModalProps {
  show: boolean;
  close: () => void;
  exit: () => void;
}
export const CloseAppModal: FC<ICloseAppModalProps> = ({ show, close, exit }) => {
  return (
    <Modal animationType="fade" transparent={true} visible={show} onRequestClose={close}>
      <Box w="100%" h="100%">
        <Box
          align="flex-start"
          justify="flex-start"
          w="50%"
          minWidth="250px"
          minHeight="150px"
          p="20px 30px"
          bgColor="white"
          border="1px solid #e8e8e8"
          radius="5px"
        >
          <Text size="20px" weight="bold">
            Confirm
          </Text>
          <Text weight="bold" mt="20px">
            Do you want to Exit?
          </Text>

          <Box d="row" justify="flex-end" w="100%" mt="30px">
            <Text color="blue" weight="bold" onPress={close}>
              Cancel
            </Text>
            <Text color="blue" weight="bold" m="0 0 0 40px" onPress={exit}>
              OK
            </Text>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
