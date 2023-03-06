import { Box, Heading, HStack } from "@chakra-ui/react";
import FormRole from "../../../components/FormRole";
import NavBar from "../../../components/NavBar";

const NewRole = () => {
  return (
    <>
      <NavBar />

      <Box p={4}>
        <HStack justifyContent="space-between" mb={4}>
          <Heading>New Role</Heading>
        </HStack>

        <FormRole />
      </Box>
    </>
  );
};

export default NewRole;
