import {
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
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
import { FiChevronDown, FiChevronUp, FiEdit2 } from "react-icons/fi";
import {
  HiChevronLeft,
  HiChevronRight,
  HiOutlinePlusCircle,
} from "react-icons/hi";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { useSortBy, useTable } from "react-table";
import useAccessOutlet from "../hooks/useAccessOutlet";
import useOutlet from "../hooks/useOutlet";
import usePagination from "../hooks/usePagination";
import "./css/Lov.css";

const LovOutlet = ({ uid }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { getAccessOutlet, addAccessOutlet, updateAccessOutlet } =
    useAccessOutlet();

  const [access, setAccess] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const paginationRange = usePagination({ currentPage, lastPage });

  const initialize = async () => {
    await getAccessOutlet(currentPage, uid).then((res) => {
      let { data } = res.data;
      setAccess(data.data);
      setLastPage(data.last_page);
    });
  };

  const update = async (id, status) => {
    await updateAccessOutlet(id, status)
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


  useEffect(() => {
    initialize();
  }, [currentPage]);

  const CustomTable = () => {
    const data = useMemo(() => access, []);
    const columns = useMemo(
      () => [
        {
          id: "id",
          Header: "ID",
          accessor: "id",
        },
        {
          Header: "Cabang",
          accessor: "branch_name",
        },
        {
          Header: "Titik",
          accessor: "outlet_name",
        },
        {
          Header: "Status",
          accessor: "access_status",
        },
        {
          Header: "Action",
          Cell: ({ row }) => (
            <HStack spacing={2}>
              <Button
                colorScheme="twitter"
                leftIcon={<FiEdit2 />}
                size="xs"
                onClick={() =>
                  update(
                    row.values.id,
                    row.values.access_status == "ACTIVE" ? "INACTIVE" : "ACTIVE"
                  )
                }
              >
                {row.values.access_status == "ACTIVE" ? "INACTIVE" : "ACTIVE"}
              </Button>
            </HStack>
          ),
        },
      ],
      []
    );
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
      useTable({ columns, data }, useSortBy);

    return (
      <TableContainer boxShadow="md">
        <Table
          {...getTableProps()}
          variant="striped"
          colorScheme="teal"
          size="sm"
        >
          <Thead>
            {headerGroups.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <Th
                    userSelect="none"
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    <Flex alignItems="center">
                      {column.render("Header")}
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <FiChevronDown />
                        ) : (
                          <FiChevronUp />
                        )
                      ) : (
                        ""
                      )}
                    </Flex>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>

          <Tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    );
  };

  const Lov = () => {
    const { listOutlet } = useOutlet();

    const [outlets, setOutlets] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");

    const doSearch = async (e) => {
      if (e.keyCode == 13) {
        await listOutlet(1, search).then((res) => {
          let { data } = res.data;
          setOutlets(data.data);
        });
      }
    };

    useEffect(() => {
      listOutlet(page, search).then((res) => {
        let { data } = res.data;
        setOutlets((prev) => [...prev, ...data.data]);
      });
    }, [page]);

    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        motionPreset="slideInBottom"
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>List of Value</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
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

            <TableContainer
              boxShadow="md"
              className="tableFixHead"
              onScroll={(e) => {
                const bottom =
                  e.target.scrollHeight - Math.ceil(e.target.scrollTop) ===
                  e.target.clientHeight;
                if (bottom) {
                  setPage(page + 1);
                }
              }}
            >
              <Table id="demo" size="sm">
                <Thead>
                  <Tr>
                    <Th>Cabang</Th>
                    <Th>Kode Titik</Th>
                    <Th>Nama Titik</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {outlets.length > 0 &&
                    outlets.map((outlet) => (
                      <Tr
                        key={outlet.id}
                        cursor="pointer"
                        _hover={{
                          bg: "cyan.400",
                          color: "white",
                        }}
                        onClick={() => {
                          props.setFieldValue("outlet_id", outlet.id);
                          props.setFieldValue(
                            "outlet_name",
                            outlet.outlet_name
                          );
                          onClose();
                        }}
                      >
                        <Td>{outlet.branch_name}</Td>
                        <Td>{outlet.outlet_id}</Td>
                        <Td>{outlet.outlet_name}</Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  };

  return (
    <>
      <HStack justifyContent="space-between" mb={4}>
        <Heading fontSize="md">List Access</Heading>

        <Button
          size="sm"
          colorScheme="green"
          leftIcon={<HiOutlinePlusCircle />}
          onClick={onOpen}
        >
          New
        </Button>
      </HStack>

      <CustomTable />

      <br />

      <Center>
        <HStack spacing={2}>
          <Button size="sm" onClick={() => setCurrentPage(1)}>
            <HiChevronLeft />
          </Button>

          {paginationRange?.map((pageNumber, i) => {
            if (pageNumber === "DOTS") {
              return <div key={i}>&#8230;</div>;
            }

            return (
              <Button
                key={i}
                colorScheme={pageNumber == currentPage ? "blue" : "gray"}
                size="sm"
                onClick={() => setCurrentPage(pageNumber)}
              >
                {pageNumber}
              </Button>
            );
          })}

          <Button size="sm" onClick={() => setCurrentPage(lastPage)}>
            <HiChevronRight />
          </Button>
        </HStack>
      </Center>

      <Lov />
    </>
  );
};

export default LovOutlet;
