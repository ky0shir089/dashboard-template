import { Box, Heading, HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormUser from "../../../components/FormUser";
import NavBar from "../../../components/NavBar";
import useUser from "../../../hooks/useUser";

const EditUser = () => {
  const { id } = useParams();
  const { showUser } = useUser();
  
  const [user, setUser] = useState([]);

  useEffect(() => {
    showUser(id).then((res) => {
      let { data } = res.data;
      setUser(data);
    });
  }, []);

  return (
    <>
      <NavBar />

      <Box p={4}>
        <HStack justifyContent="space-between" mb={4}>
          <Heading>Edit User</Heading>
        </HStack>

        <FormUser id={id} data={user} />
      </Box>
    </>
  );
};

export default EditUser;
