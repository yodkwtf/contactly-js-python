import { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  IconButton,
  Textarea,
} from '@chakra-ui/react';
import { FaEdit as EditIcon } from 'react-icons/fa';

const EditContactModal = ({ contact, onSave }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState(contact);

  const handleSave = () => {
    onSave({ ...contact, ...formData });
    onClose();
  };

  return (
    <>
      <IconButton
        icon={<EditIcon />}
        colorScheme="teal"
        variant="ghost"
        size="sm"
        aria-label="Edit"
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Contact</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="name">
              <FormLabel>Name</FormLabel>
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </FormControl>

            <FormControl id="phone" mt={4}>
              <FormLabel>Phone</FormLabel>
              <Input
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </FormControl>

            <FormControl id="occupation" mt={4}>
              <FormLabel>Occupation</FormLabel>
              <Input
                value={formData.occupation}
                onChange={(e) =>
                  setFormData({ ...formData, occupation: e.target.value })
                }
              />
            </FormControl>

            <FormControl id="address" mt={4}>
              <FormLabel>Address</FormLabel>
              <Textarea
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} border={true} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleSave}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditContactModal;
