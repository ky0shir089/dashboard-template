import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import useRole from "../hooks/useRole";

const FormRole = ({ id, data }) => {
  const navigate = useNavigate();

  const toast = useToast();

  const { addRole, updateRole } = useRole();

  const initialValues = {
    role_name: data?.role_name || "",
  };

  const validationSchema = yup.object({
    role_name: yup.string().required().trim(),
  });

  const onSubmit = async (values) => {
    if (id) {
      await updateRole(id, values).then((res) => {
        let { data } = res;
        toast({
          position: "top",
          description: data.message,
          status: "success",
          isClosable: true,
        });
        navigate(-1);
      });
    } else {
      await addRole(values).then((res) => {
        let { data } = res;
        toast({
          position: "top",
          description: data.message,
          status: "success",
          isClosable: true,
        });
        navigate(-1);
      });
    }
  };

  return (
    <Box boxShadow="md" rounded="lg" p={4}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {(props) => (
          <Form autoComplete="off">
            <Stack spacing={4}>
              <Field name="role_name">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.role_name && form.touched.role_name}
                  >
                    <FormLabel>Role Name</FormLabel>
                    <Input {...field} placeholder="Role Name" rounded="lg" />
                    <FormErrorMessage>{form.errors.role_name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <br />

              <Button
                type="submit"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                isLoading={props.isSubmitting}
              >
                {id ? "Update" : "Submit"}
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default FormRole;
