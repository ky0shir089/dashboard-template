import { Box, Heading, HStack } from "@chakra-ui/react";
import FormMenu from "../../../components/FormMenu";
import NavBar from "../../../components/NavBar";

const NewMenu = () => {
  return (
    <>
      <NavBar />

      <Box p={4}>
        <HStack justifyContent="space-between" mb={4}>
          <Heading>New Module</Heading>
        </HStack>

        <FormMenu />
      </Box>
    </>
  );
};

export default NewMenu;
