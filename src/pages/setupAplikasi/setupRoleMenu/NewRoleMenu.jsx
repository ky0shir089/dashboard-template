import { Box, Heading, HStack } from "@chakra-ui/react";
import FormRoleMenu from "../../../components/FormRoleMenu";
import NavBar from "../../../components/NavBar";

const NewRoleMenu = () => {
  return (
    <>
     <NavBar />

      <Box p={4}>
        <HStack justifyContent="space-between" mb={4}>
          <Heading>New Role Menu</Heading>
        </HStack>

        <FormRoleMenu />
      </Box>
    </>
  );
};

export default NewRoleMenu;
