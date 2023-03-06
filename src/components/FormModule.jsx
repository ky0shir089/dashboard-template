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
import useModule from "../hooks/useModule";

const FormModule = ({ id, data }) => {
  const navigate = useNavigate();

  const toast = useToast();

  const { addModule, updateModule } = useModule();

  const initialValues = {
    module_name: data?.module_name || "",
    module_icon: data?.module_icon || "",
    module_seq: data?.module_seq || "",
  };

  const validationSchema = yup.object({
    module_name: yup.string().required().trim(),
    module_icon: yup.string().required().trim(),
    module_seq: yup.number().positive().integer().required(),
  });

  const onSubmit = async (values) => {
    if (id) {
      await updateModule(id, values).then((res) => {
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
      await addModule(values).then((res) => {
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
              <Field name="module_name">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.module_name && form.touched.module_name
                    }
                  >
                    <FormLabel>Module Name</FormLabel>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Module Name"
                      rounded="lg"
                    />
                    <FormErrorMessage>
                      {form.errors.module_name}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="module_icon">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.module_icon && form.touched.module_icon
                    }
                  >
                    <FormLabel>Module Icon</FormLabel>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Module Icon"
                      rounded="lg"
                    />
                    <FormErrorMessage>
                      {form.errors.module_icon}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="module_seq">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.module_seq && form.touched.module_seq
                    }
                  >
                    <FormLabel>Module Seq</FormLabel>
                    <Input
                      {...field}
                      type="number"
                      placeholder="Module Seq"
                      rounded="lg"
                    />
                    <FormErrorMessage>
                      {form.errors.module_seq}
                    </FormErrorMessage>
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

export default FormModule;
