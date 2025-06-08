import React from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  VStack,
  Textarea
} from '@chakra-ui/react';

interface LogActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LogActivityModal: React.FC<LogActivityModalProps> = ({ isOpen, onClose }) => {
  const initialRef = React.useRef(null);

  return (
    <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Log Your Activity</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Distance</FormLabel>
              <InputGroup>
                <Input ref={initialRef} type="number" placeholder="e.g., 5.5" />
                <InputRightAddon>km</InputRightAddon>
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Duration (Optional)</FormLabel>
               <InputGroup>
                <Input type="number" placeholder="e.g., 30" />
                <InputRightAddon>minutes</InputRightAddon>
              </InputGroup>
            </FormControl>
             <FormControl>
              <FormLabel>Notes (Optional)</FormLabel>
              <Textarea placeholder="How did it go?" />
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="orange" onClick={onClose}>
            Log Activity
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
