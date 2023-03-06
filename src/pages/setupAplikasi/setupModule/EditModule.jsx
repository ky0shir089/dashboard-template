import { Box, Heading, HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormModule from "../../../components/FormModule";
import NavBar from "../../../components/NavBar";
import useModule from "../../../hooks/useModule";

const EditModule = () => {
  const { id } = useParams();
  const { showModule } = useModule();
  
  const [module, setModule] = useState([]);

  useEffect(() => {
    showModule(id).then((res) => {
      let { data } = res.data;
      setModule(data);
    });
  }, []);

  return (
    <>
      <NavBar />

      <Box p={4}>
        <HStack justifyContent="space-between" mb={4}>
          <Heading>Edit Module</Heading>
        </HStack>

        <FormModule id={id} data={module} />
      </Box>
    </>
  );
};

export default EditModule;
