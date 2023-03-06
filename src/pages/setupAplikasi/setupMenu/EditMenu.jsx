import { Box, Heading, HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormMenu from "../../../components/FormMenu";
import NavBar from "../../../components/NavBar";
import useMenu from "../../../hooks/useMenu";

const EditMenu = () => {
  const { id } = useParams();
  const { showMenu } = useMenu();
  
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    showMenu(id).then((res) => {
      let { data } = res.data;
      setMenu(data);
    });
  }, []);

  return (
    <>
      <NavBar />

      <Box p={4}>
        <HStack justifyContent="space-between" mb={4}>
          <Heading>Edit Menu</Heading>
        </HStack>

        <FormMenu id={id} data={menu} />
      </Box>
    </>
  );
};

export default EditMenu;
