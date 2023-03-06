import { Box, Heading, HStack } from "@chakra-ui/react";
import FormUser from "../../../components/FormUser";
import NavBar from "../../../components/NavBar";

const NewUser = () => {
  return (
    <>
      <NavBar />

      <Box p={4}>
        <HStack justifyContent="space-between" mb={4}>
          <Heading>New User</Heading>
        </HStack>

        <FormUser />
      </Box>
    </>
  );
};

export default NewUser;
