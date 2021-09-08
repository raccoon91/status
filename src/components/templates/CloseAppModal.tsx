import React, { FC } from "react";
import { Modal } from "react-native";
import { Flex, Block, Bold, Button } from "@src/components/atoms";

interface ICloseAppModalProps {
  show: boolean;
  close: () => void;
  exit: () => void;
}
export const CloseAppModal: FC<ICloseAppModalProps> = ({ show, close, exit }) => {
  return (
    <Modal animationType="fade" transparent={true} visible={show} onRequestClose={close}>
      <Flex w="100%" h="100%">
        <Block
          w="50%"
          minWidth="250px"
          minHeight="150px"
          p="20px 30px"
          bgColor="white"
          border="1px solid #e8e8e8"
          radius="5px"
        >
          <Bold size="20px">Confirm</Bold>
          <Bold mt="20px">Do you want to Exit?</Bold>

          <Flex d="row" justify="flex-end" w="100%" mt="30px">
            <Button variant="outline-gray" h="30px" px="12px" onPress={close}>
              Cancel
            </Button>
            <Button variant="black" h="30px" px="12px" ml="20px" onPress={exit}>
              OK
            </Button>
          </Flex>
        </Block>
      </Flex>
    </Modal>
  );
};
