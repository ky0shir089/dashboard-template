import { Box, Button, Heading, HStack, useToast } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { HiOutlinePlusCircle } from "react-icons/hi2";
import NavBar from "../../../components/NavBar";
import useRole from "../../../hooks/useRole";
import { useNavigate } from "react-router-dom";
import TableAction from "../../../components/TableAction";
import CustomTable from "../../../components/CustomTable";

const Role = () => {
  const navigate = useNavigate();

  const { getRole, deleteRole } = useRole();

  const [roles, setRoles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const toast = useToast();

  const initialize = async () => {
    await getRole(currentPage).then((res) => {
      let { data } = res.data;
      setRoles(data.data);
      setCurrentPage(data.current_page);
      setLastPage(data.last_page);
    });
  };

  const destroy = async (id) => {
    await deleteRole(id)
      .then((res) => {
        let { data } = res;
        toast({
          position: "top",
          description: data.message,
          status: "success",
          isClosable: true,
        });
        initialize();
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
        header: "Role Name",
        accessorKey: "role_name",
      },
      {
        header: "Action",
        cell: ({ row }) => <TableAction row={row} destroy={destroy} />,
      },
    ],
    []
  );

  useEffect(() => {
    initialize();
  }, []);

  return (
    <>
      <NavBar />

      <Box p={4}>
        <HStack justifyContent="space-between" mb={4}>
          <Heading>Setup Role</Heading>

          <Button
            colorScheme="green"
            leftIcon={<HiOutlinePlusCircle />}
            onClick={() => navigate(`${location.pathname}/new`)}
          >
            New
          </Button>
        </HStack>

        {roles.length > 0 && (
          <CustomTable
            rows={roles}
            columns={columns}
            setCurrentPage={setCurrentPage}
            lastPage={lastPage}
          />
        )}
      </Box>
    </>
  );
};

export default Role;
