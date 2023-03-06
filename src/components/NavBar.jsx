import { Flex, Icon, Show, useColorModeValue } from "@chakra-ui/react";
import { HiArrowLeftCircle } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <Show below="sm">
      <Flex
        height="16"
        alignItems="center"
        bg="blue.500"
        borderBottomWidth="1px"
        borderBottomColor={useColorModeValue("gray.200", "gray.700")}
        sx={{
          position: "sticky",
          top: "0",
          zIndex: "9",
        }}
      >
        <Icon
          as={HiArrowLeftCircle}
          color="white"
          boxSize={10}
          mx={4}
          cursor="pointer"
          onClick={() => navigate(-1)}
        />
      </Flex>
    </Show>
  );
};

export default NavBar;
