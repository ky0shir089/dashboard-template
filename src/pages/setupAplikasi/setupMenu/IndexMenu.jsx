import { Box, Button, Heading, HStack, useToast } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { HiOutlinePlusCircle } from "react-icons/hi2";

import NavBar from "../../../components/NavBar";
import useMenu from "../../../hooks/useMenu";
import { useNavigate } from "react-router-dom";
import CustomTable from "../../../components/CustomTable";
import TableAction from "../../../components/TableAction";

const IndexMenu = () => {
  const navigate = useNavigate();

  const { getMenu, deleteMenu } = useMenu();

  const [menus, setMenus] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const toast = useToast();

  const initialize = async () => {
    await getMenu(currentPage).then((res) => {
      let { data } = res.data;
      setMenus(data.data);
      setCurrentPage(data.current_page)
      setLastPage(data.last_page);
    });
  };

  const destroy = async (id) => {
    await deleteMenu(id)
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
        header: "Module Name",
        accessorKey: "module_name",
      },
      {
        header: "Menu Name",
        accessorKey: "menu_name",
      },
      {
        header: "Icon",
        accessorKey: "menu_icon",
      },
      {
        header: "Route",
        accessorKey: "menu_route",
      },
      {
        header: "Seq",
        accessorKey: "menu_seq",
      },
      {
        header: "Status",
        accessorKey: "menu_status",
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
          <Heading>Setup Menu</Heading>

          <Button
            colorScheme="green"
            leftIcon={<HiOutlinePlusCircle />}
            onClick={() => navigate(`${location.pathname}/new`)}
          >
            New
          </Button>
        </HStack>

        {menus.length > 0 && (
          <CustomTable
            rows={menus}
            columns={columns}
            setCurrentPage={setCurrentPage}
            lastPage={lastPage}
          />
        )}
      </Box>
    </>
  );
};

export default IndexMenu;
