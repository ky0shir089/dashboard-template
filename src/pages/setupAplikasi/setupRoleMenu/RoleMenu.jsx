import { Box, Button, Heading, HStack, useToast } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { HiOutlinePlusCircle } from "react-icons/hi2";
import NavBar from "../../../components/NavBar";
import useRoleMenu from "../../../hooks/useRoleMenu";
import { useNavigate } from "react-router-dom";
import CustomTable from "../../../components/CustomTable";
import { MdEdit } from "react-icons/md";

const RoleMenu = () => {
  const navigate = useNavigate();

  const [roleMenus, setRoleMenus] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const { getRoleMenu, updateRoleMenu } = useRoleMenu();

  const toast = useToast();

  const initialize = async () => {
    await getRoleMenu(currentPage).then((res) => {
      let { data } = res.data;
      setRoleMenus(data.data);
      setLastPage(data.last_page);
    });
  };

  const update = async (id, status) => {
    setLoading(true);
    await updateRoleMenu(id, status)
      .then((res) => {
        let { data } = res;
        toast({
          position: "top",
          description: data.message,
          status: "success",
          isClosable: true,
        });
        setLoading(false);
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
        setLoading(false);
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
        header: "Menu Name",
        accessorKey: "menu_name",
      },
      {
        header: "Status",
        accessorKey: "rolemenu_status",
      },
      {
        header: "Action",
        cell: ({ row }) => (
          <HStack spacing={2}>
            <Button
              colorScheme="twitter"
              leftIcon={<MdEdit />}
              size="xs"
              isLoading={loading}
              onClick={() =>
                update(
                  row.original.id,
                  row.original.rolemenu_status == "ACTIVE"
                    ? "INACTIVE"
                    : "ACTIVE"
                )
              }
            >
              {row.original.rolemenu_status == "ACTIVE" ? "INACTIVE" : "ACTIVE"}
            </Button>
          </HStack>
        ),
      },
    ],
    [loading]
  );

  useEffect(() => {
    initialize();
  }, [currentPage]);

  return (
    <>
      <NavBar />

      <Box p={4}>
        <HStack justifyContent="space-between" mb={4}>
          <Heading>Setup Role Menu</Heading>

          <Button
            colorScheme="green"
            leftIcon={<HiOutlinePlusCircle />}
            onClick={() => navigate(`${location.pathname}/new`)}
          >
            New
          </Button>
        </HStack>

        {roleMenus.length > 0 && (
          <CustomTable
            rows={roleMenus}
            columns={columns}
            setCurrentPage={setCurrentPage}
            lastPage={lastPage}
          />
        )}
      </Box>
    </>
  );
};

export default RoleMenu;
