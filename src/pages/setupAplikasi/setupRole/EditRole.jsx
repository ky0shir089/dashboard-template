import { Box, Heading, HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormRole from "../../../components/FormRole";
import NavBar from "../../../components/NavBar";
import useRole from "../../../hooks/useRole";

const EditRole = () => {
  const { id } = useParams();
  const { showRole } = useRole();
  
  const [role, setRole] = useState([]);

  useEffect(() => {
    showRole(id).then((res) => {
      let { data } = res.data;
      setRole(data);
    });
  }, []);

  return (
    <>
      <NavBar />

      <Box p={4}>
        <HStack justifyContent="space-between" mb={4}>
          <Heading>Edit Role</Heading>
        </HStack>

        <FormRole id={id} data={role} />
      </Box>
    </>
  );
};

export default EditRole;
