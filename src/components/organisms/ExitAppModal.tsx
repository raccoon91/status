import React, { FC } from "react";

import Modal from "react-native-modal";
import { Flex, Block, Bold, Button } from "@src/components/atoms";

interface IExitAppModalProps {
  show: boolean;
  close: () => void;
  exit: () => void;
}
export const ExitAppModal: FC<IExitAppModalProps> = ({ show, close, exit }) => {
  return (
    <Modal isVisible={show} backdropTransitionOutTiming={0} onBackdropPress={close} onBackButtonPress={close}>
      <Flex w="100%" h="100%">
        <Block
          w="60%"
          minWidth="250px"
          minHeight="150px"
          p="20px 30px"
          bgColor="white"
          border="1px solid #e8e8e8"
          radius="5px"
        >
          <Bold size="lg">Confirm</Bold>
          <Bold size="sm" mt="20px">
            Do you want to Exit?
          </Bold>

          <Flex d="row" justify="space-between" w="100%" mt="30px">
            <Button variant="outline-gray" w="45%" h="36px" weight="bold" onPress={close}>
              Cancel
            </Button>
            <Button variant="black" w="45%" h="36px" weight="bold" onPress={exit}>
              OK
            </Button>
          </Flex>
        </Block>
      </Flex>
    </Modal>
  );
};
