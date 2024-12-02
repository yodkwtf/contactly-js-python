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
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { BiAddToQueue } from 'react-icons/bi';

const AddContactModal = ({ setContacts }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    occupation: '',
    address: '',
    gender: '',
  });

  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // TODO: add API URL as a constant
      const res = await fetch('http://localhost:5000/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      // TODO: Handle error based on data return from backend
      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong!');
      }

      toast({
        title: 'Contact added.',
        description: 'Contact created successfully.',
        status: 'success',
        duration: 2000,
        position: 'top-center',
        isClosable: true,
      });
      onClose();

      // add contact to the list
      setContacts((prevContacts) => [data.data.contact, ...prevContacts]);

      // clear the form data
      setFormData({
        name: '',
        phone: '',
        occupation: '',
        address: '',
        gender: '',
      });
    } catch (err) {
      toast({
        title: 'An error occurred.',
        description: err.message,
        status: 'error',
        duration: 4000,
        position: 'top-center',
        isClosable: true,
      });
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="teal" variant="outline" mr={4}>
        Add Contact
        <BiAddToQueue style={{ marginLeft: '8px' }} />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleSubmit}>
          <ModalContent>
            <ModalHeader>New Contact</ModalHeader>
            <ModalCloseButton />

            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="John Doe"
                />

                <FormLabel mt={4}>Phone</FormLabel>
                <Input
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="9991119119"
                />

                <FormLabel mt={4}>Occupation</FormLabel>
                <Input
                  value={formData.occupation}
                  onChange={(e) =>
                    setFormData({ ...formData, occupation: e.target.value })
                  }
                  placeholder="Detective"
                />

                <FormLabel mt={4}>Address</FormLabel>
                <Textarea
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  placeholder="Gotham City"
                />

                <FormLabel mt={4}>Gender</FormLabel>
                <RadioGroup>
                  <Stack direction="row">
                    <Radio
                      value="male"
                      onChange={(e) =>
                        setFormData({ ...formData, gender: e.target.value })
                      }
                    >
                      Male
                    </Radio>
                    <Radio
                      value="female"
                      onChange={(e) =>
                        setFormData({ ...formData, gender: e.target.value })
                      }
                    >
                      Female
                    </Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button mr={3} border={true} onClick={onClose}>
                Close
              </Button>
              <Button type="submit" colorScheme="teal" isLoading={isLoading}>
                Add
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};
export default AddContactModal;
