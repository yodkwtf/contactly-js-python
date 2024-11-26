import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import { BiAddToQueue } from 'react-icons/bi';

const AddContactModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} colorScheme="teal" variant="outline" mr={4}>
        Add Contact
        <BiAddToQueue style={{ marginLeft: '8px' }} />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Contact</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input placeholder="John Doe" />

              <FormLabel mt={4}>Phone</FormLabel>
              <Input placeholder="9991119119" />

              <FormLabel mt={4}>Occupation</FormLabel>
              <Input placeholder="Detective" />

              <FormLabel mt={4}>Address</FormLabel>
              <Textarea placeholder="Gotham City" />

              <FormLabel mt={4}>Gender</FormLabel>
              <RadioGroup>
                <Stack direction="row">
                  <Radio value="male">Male</Radio>
                  <Radio value="female">Female</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} border={true} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="teal">Add</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default AddContactModal;
