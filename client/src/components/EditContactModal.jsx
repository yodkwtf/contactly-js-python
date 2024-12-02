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
  useToast,
} from '@chakra-ui/react';
import { FaEdit as EditIcon } from 'react-icons/fa';
import { BASE_URL } from '../config/constants';

const EditContactModal = ({ contact, setContacts }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(contact);

  const toast = useToast();

  const handleEdit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/contacts/${contact.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      // TODO: Handle error based on data return from backend
      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong!');
      }

      onClose();
      toast({
        title: 'Contact updated.',
        description: 'Contact updated successfully.',
        status: 'success',
        duration: 2000,
        position: 'top-center',
        isClosable: true,
      });

      // Update the edited contact for UI
      setContacts((prevContacts) =>
        prevContacts.map((c) => (c.id === contact.id ? data.data.contact : c))
      );
    } catch (error) {
      toast({
        title: 'An error occurred.',
        description: 'Something went wrong!',
        status: 'error',
        duration: 4000,
        position: 'top-center',
        isClosable: true,
      });
      console.error('Error updating contact:', error);
    } finally {
      setIsLoading(false);
    }
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
        <form onSubmit={handleEdit}>
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
              <Button type="submit" colorScheme="blue" isLoading={isLoading}>
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default EditContactModal;
