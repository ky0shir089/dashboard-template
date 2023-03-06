import { Box, Heading, HStack } from "@chakra-ui/react";
import FormModule from "../../../components/FormModule";
import NavBar from "../../../components/NavBar";

const NewModule = () => {
  return (
    <>
      <NavBar />

      <Box p={4}>
        <HStack justifyContent="space-between" mb={4}>
          <Heading>New Module</Heading>
        </HStack>

        <FormModule />
      </Box>
    </>
  );
};

export default NewModule;
