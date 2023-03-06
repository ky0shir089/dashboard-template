import {
  Box,
  Button,
  HStack,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";

const CustomTable = ({ rows, columns, setCurrentPage, lastPage }) => {
  const data = useMemo(() => rows, [rows]);

  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20,
  });
  const [sorting, setSorting] = useState([]);

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  const table = useReactTable({
    data: data,
    columns: columns,
    pageCount: lastPage,
    state: {
      pagination,
      sorting,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
  });

  return (
    <Box>
      <Table variant="striped" colorScheme="teal" size="sm" boxShadow="md">
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : (
                    <Box
                      cursor={header.column.getCanSort() ? "pointer" : ""}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted()] ?? null}
                    </Box>
                  )}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>

        <Tbody>
          {table.getRowModel().rows.map((row) => (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>

      <br />

      <HStack justify="end">
        <Button
          size="xs"
          onClick={() => {
            table.setPageIndex(0);
            setCurrentPage(1);
          }}
          isDisabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </Button>

        <Button
          size="xs"
          onClick={() => {
            table.previousPage();
            setCurrentPage(pageIndex);
          }}
          isDisabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </Button>

        <span>
          Page{" "}
          <Input
            size="sm"
            type="number"
            value={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            w="10"
            borderRadius="lg"
          />{" "}
          <strong>of {table.getPageCount()}</strong>
        </span>

        <Button
          size="xs"
          onClick={() => {
            table.nextPage();
            setCurrentPage(pageIndex + 2);
          }}
          isDisabled={pageIndex + 1 == table.getPageCount() ? true : false}
        >
          {">"}
        </Button>

        <Button
          size="xs"
          onClick={() => {
            table.setPageIndex(table.getPageCount() - 1);
            setCurrentPage(table.getPageCount());
          }}
          isDisabled={pageIndex + 1 == table.getPageCount() ? true : false}
        >
          {">>"}
        </Button>
      </HStack>
    </Box>
  );
};

export default CustomTable;
