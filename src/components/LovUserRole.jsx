import {
  Button,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { MdEdit } from "react-icons/md";
import useUserRole from "../hooks/useUserRole";
import CustomTable from "./CustomTable";

const LovUserRole = ({ uid }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [roles, setRoles] = useState([]);
  const [listRoles, setListRoles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const { getUserRole, getListRole, addUserRole, updateUserRole } =
    useUserRole();

  const toast = useToast();

  const initialize = async () => {
    await getUserRole(uid, currentPage).then((res) => {
      let { data } = res.data;
      setListRoles(data.data);
      setCurrentPage(data.current_page);
      setLastPage(data.last_page);
    });
  };

  const saveRole = async (role_id) => {
    let r = confirm("Apakah anda akan menambahkan data ini?");
    if (r) {
      await addUserRole({
        user_id: uid,
        role_id: role_id,
        user_role_status: "ACTIVE",
      }).then(async (res) => {
        let { data } = res;
        toast({
          position: "top",
          description: data.message,
          status: "success",
          isClosable: true,
        });
        onClose();
        await initialize();
      });
    }
  };

  const update = async (id, status) => {
    await updateUserRole(id, status)
      .then(async (res) => {
        let { data } = res;
        toast({
          position: "top",
          description: data.message,
          status: "success",
          isClosable: true,
        });
        await initialize();
      })
      .catch((error) => {
        let responses = error.response.data;
        toast({
          position: "top",
          description: responses.message,
          status: "error",
          isClosable: true,
        });
      });
  };

  const columns = useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "id",
      },
      {
        header: "Role",
        accessorKey: "role_name",
      },
      {
        header: "Status",
        accessorKey: "user_role_status",
      },
      {
        header: "Action",
        cell: ({ row }) => (
          <HStack spacing={2}>
            <Button
              colorScheme="twitter"
              leftIcon={<MdEdit />}
              size="xs"
              onClick={() =>
                update(
                  row.original.id,
                  row.original.user_role_status == "ACTIVE"
                    ? "INACTIVE"
                    : "ACTIVE"
                )
              }
            >
              {row.original.user_role_status == "ACTIVE"
                ? "INACTIVE"
                : "ACTIVE"}
            </Button>
          </HStack>
        ),
      },
    ],
    []
  );

  useEffect(() => {
    initialize();
    getListRole(uid).then((res) => {
      let { data } = res.data;
      setRoles(data);
    });
  }, []);

  return (
    <>
      <HStack justifyContent="space-between" mb={4}>
        <Heading fontSize="md">List Role</Heading>

        <Button
          size="sm"
          colorScheme="green"
          leftIcon={<HiOutlinePlusCircle />}
          onClick={onOpen}
        >
          New
        </Button>
      </HStack>

      {listRoles.length > 0 && (
        <CustomTable
          rows={listRoles}
          columns={columns}
          setCurrentPage={setCurrentPage}
          lastPage={lastPage}
        />
      )}

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>List of Value</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TableContainer boxShadow="md">
              <Table variant="striped" colorScheme="teal" size="sm">
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>Role</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {roles.map((role) => (
                    <Tr
                      key={role.id}
                      cursor="pointer"
                      _hover={{
                        bg: "cyan.400",
                        color: "white",
                      }}
                      onClick={() => saveRole(role.id)}
                    >
                      <Td>{role.id}</Td>
                      <Td>{role.role_name}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LovUserRole;
