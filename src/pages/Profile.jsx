import {
  Box,
  Tab,
  Table,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Text,
  Td,
  Tr,
  Center,
  HStack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { FiLink } from "react-icons/fi";
import { useSelector } from "react-redux";
import ChangePassword from "../components/ChangePassword";
import NavBar from "../components/NavBar";

const Profile = () => {
  const auth = useSelector((state) => state.user.user);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [tabIndex, setTabIndex] = useState(0);
  const [device, setDevice] = useState("");
  const [qr, setQr] = useState("");

  const connect = async () => {
    await axios
      .post(
        `https://api.fonnte.com/qr`,
        {},
        {
          headers: {
            Authorization: auth.fonnte_token,
          },
        }
      )
      .then((res) => {
        setQr(res.data);
        onOpen();
      });
  };

  useEffect(() => {
    axios
      .post(
        `https://api.fonnte.com/device`,
        {},
        {
          headers: {
            Authorization: auth.fonnte_token,
          },
        }
      )
      .then((res) => {
        setDevice(res.data);
      });
  }, []);

  return (
    <>
      <NavBar />

      <Box p={4}>
        <Tabs
          isFitted
          variant="enclosed"
          isLazy
          index={tabIndex}
          onChange={(index) => setTabIndex(index)}
        >
          <TabList mb="1em">
            <Tab _selected={{ color: "white", bg: "blue.500" }}>
              Change Password
            </Tab>

            <Tab _selected={{ color: "white", bg: "blue.500" }}>WhatsApp</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <ChangePassword />
            </TabPanel>

            <TabPanel>
              <Box>
                <HStack justifyContent="space-between" mb={4}>
                  <Text as="b" fontSize="xl">
                    Device Status
                  </Text>

                  <Button
                    colorScheme="green"
                    leftIcon={<FiLink />}
                    onClick={connect}
                    isDisabled={device.device_status == "connect" ? true : false}
                  >
                    Connect
                  </Button>
                </HStack>

                <TableContainer boxShadow="md">
                  <Table variant="striped" colorScheme="teal" size="sm">
                    <Tbody>
                      <Tr>
                        <Td>WhatsApp</Td>
                        <Td>{device.device}</Td>
                      </Tr>
                      <Tr>
                        <Td>Status</Td>
                        <Td>{device.device_status} </Td>
                      </Tr>
                      <Tr>
                        <Td>Expired</Td>
                        <Td>{device.expired}</Td>
                      </Tr>
                      <Tr>
                        <Td>Message</Td>
                        <Td>{device.messages}</Td>
                      </Tr>
                      <Tr>
                        <Td>Name</Td>
                        <Td>{device.name}</Td>
                      </Tr>
                      <Tr>
                        <Td>Package</Td>
                        <Td>{device.package}</Td>
                      </Tr>
                      <Tr>
                        <Td>Quota</Td>
                        <Td>{device.quota}</Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>

                <Modal isOpen={isOpen} onClose={onClose} isCentered>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>QR Code</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <Center>
                        <img src={`data:image/png;base64,${qr.url}`} />
                      </Center>
                    </ModalBody>
                  </ModalContent>
                </Modal>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
};

export default Profile;
