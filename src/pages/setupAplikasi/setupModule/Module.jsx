import { Box, Button, Heading, HStack, useToast } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { HiOutlinePlusCircle } from "react-icons/hi2";
import NavBar from "../../../components/NavBar";
import useModule from "../../../hooks/useModule";
import TableAction from "../../../components/TableAction";
import CustomTable from "../../../components/CustomTable";
import { useNavigate } from "react-router-dom";

const Module = () => {
  const navigate = useNavigate();

  const { getModule, deleteModule } = useModule();

  const [modules, setModules] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState([]);

  const toast = useToast();

  const initialize = async () => {
    await getModule(currentPage).then((res) => {
      let { data } = res.data;
      setModules(data.data);
      setCurrentPage(data.current_page);
      setLastPage(data.last_page);
    });
  };

  const destroy = async (id) => {
    await deleteModule(id)
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
        header: "Icon",
        accessorKey: "module_icon",
      },
      {
        header: "Seq",
        accessorKey: "module_seq",
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
          <Heading>Setup Module</Heading>

          <Button
            colorScheme="green"
            leftIcon={<HiOutlinePlusCircle />}
            onClick={() => navigate(`${location.pathname}/new`)}
          >
            New
          </Button>
        </HStack>

        {modules.length > 0 && (
          <CustomTable
            rows={modules}
            columns={columns}
            setCurrentPage={setCurrentPage}
            lastPage={lastPage}
          />
        )}
      </Box>
    </>
  );
};

export default Module;
