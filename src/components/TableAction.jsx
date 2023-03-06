import { Button, HStack } from "@chakra-ui/react";
import { MdDelete, MdEdit } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

const TableAction = ({ row, destroy }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <HStack spacing={2}>
      <Button
        colorScheme="twitter"
        leftIcon={<MdEdit />}
        size="xs"
        onClick={() => navigate(`${location.pathname}/${row.original.id}/edit`)}
      >
        Edit
      </Button>

      <Button
        colorScheme="red"
        leftIcon={<MdDelete />}
        size="xs"
        onClick={() => destroy(row.original.id)}
      >
        Delete
      </Button>
    </HStack>
  );
};

export default TableAction;
