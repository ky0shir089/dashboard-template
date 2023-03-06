import {
  Box,
  Button,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import {
  HiOutlinePlusCircle,
  HiMagnifyingGlass,
} from "react-icons/hi2";
import NavBar from "../../../components/NavBar";
import useUser from "../../../hooks/useUser";
import { useLocation, useNavigate } from "react-router-dom";
import usePagination from "../../../hooks/usePagination";
import CustomTable from "../../../components/CustomTable";
import TableAction from "../../../components/TableAction";

const User = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [search, setSearch] = useState("");

  const { getUser, deleteUser } = useUser();

  const toast = useToast();

  const initialize = async () => {
    await getUser(currentPage, search).then((res) => {
      let { data } = res.data;
      setUsers(data.data);
      setLastPage(data.last_page);
    });
  };

  const doSearch = async (e) => {
    if (e.keyCode == 13) {
      await getUser(1, search).then((res) => {
        let { data } = res.data;
        setUsers(data.data);
        setLastPage(data.last_page);
      });
    }
  };

  const destroy = async (id) => {
    await deleteUser(id)
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
        header: "User ID",
        accessorKey: "uid",
      },
      {
        header: "Nama",
        accessorKey: "name",
      },
      {
        header: "Role",
        cell: ({ row }) => (
          <ul>
            {row.original.user_roles.map((role) => (
              <li key={role.id}>{role.role_name}</li>
            ))}
          </ul>
        ),
      },
      {
        header: "Status",
        accessorKey: "status",
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
  }, [currentPage]);

  return (
    <>
      <NavBar />

      <Box p={4}>
        <HStack justifyContent="space-between" mb={4}>
          <Heading>Setup User</Heading>

          <Button
            colorScheme="green"
            leftIcon={<HiOutlinePlusCircle />}
            onClick={() => navigate(`${location.pathname}/new`)}
          >
            New
          </Button>
        </HStack>

        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<HiMagnifyingGlass />}
          />
          <Input
            type="search"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={doSearch}
          />
        </InputGroup>

        <br />

        {users.length > 0 && (
          <CustomTable
            rows={users}
            columns={columns}
            setCurrentPage={setCurrentPage}
            lastPage={lastPage}
          />
        )}
      </Box>
    </>
  );
};

export default User;
