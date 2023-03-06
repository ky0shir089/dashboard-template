import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import useMenu from "../hooks/useMenu";
import useModule from "../hooks/useModule";

const FormMenu = ({ id, data }) => {
  const navigate = useNavigate();

  const { addMenu, updateMenu } = useMenu();
  const { getModule } = useModule();

  const [modules, setModules] = useState();

  const toast = useToast();

  useEffect(() => {
    getModule(1).then((res) => {
      let { data } = res.data;
      setModules(data.data);
    });
  }, []);

  const initialValues = {
    menu_name: data?.menu_name || "",
    menu_icon: data?.menu_icon || "",
    menu_route: data?.menu_route || "",
    menu_seq: data?.menu_seq || "",
    menu_status: data?.menu_status || "",
    module_id: data?.module_id || "",
  };

  const validationSchema = yup.object({
    menu_name: yup.string().required().trim(),
    menu_icon: yup.string().required().trim(),
    menu_route: yup.string().required().trim(),
    menu_seq: yup.number().positive().integer().required(),
    menu_status: yup.string().required(),
    module_id: yup.number().positive().integer().required(),
  });

  const onSubmit = async (values) => {
    if (id) {
      await updateMenu(id, values).then((res) => {
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
      await addMenu(values)
        .then((res) => {
          let { data } = res;
          toast({
            position: "top",
            description: data.message,
            status: "success",
            isClosable: true,
          });
          navigate(-1);
        })
        .catch((error) => {
          let responses = error.response.data;
          toast({
            position: "top",
            description: responses.message,
            status: "error",
            isClosable: true,
          });
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
              <Field name="menu_name">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.menu_name && form.touched.menu_name}
                  >
                    <FormLabel>Menu Name</FormLabel>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Menu Name"
                      rounded="lg"
                    />
                    <FormErrorMessage>{form.errors.menu_name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="menu_icon">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.menu_icon && form.touched.menu_icon}
                  >
                    <FormLabel>Menu Icon</FormLabel>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Menu Icon"
                      rounded="lg"
                    />
                    <FormErrorMessage>{form.errors.menu_icon}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="menu_route">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.menu_route && form.touched.menu_route
                    }
                  >
                    <FormLabel>Menu Route</FormLabel>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Menu Route"
                      rounded="lg"
                    />
                    <FormErrorMessage>
                      {form.errors.menu_route}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="menu_seq">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.menu_seq && form.touched.menu_seq}
                  >
                    <FormLabel>Menu Seq</FormLabel>
                    <Input
                      {...field}
                      type="number"
                      placeholder="Menu Seq"
                      rounded="lg"
                    />
                    <FormErrorMessage>{form.errors.menu_seq}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="menu_status">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.menu_status && form.touched.menu_status
                    }
                  >
                    <FormLabel>Menu Status</FormLabel>
                    <Select {...field} placeholder="Select option">
                      <option value="ACTIVE">ACTIVE</option>
                      <option value="INACTIVE">INACTIVE</option>
                    </Select>
                    <FormErrorMessage>
                      {form.errors.menu_status}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="module_id">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.module_id && form.touched.module_id}
                  >
                    <FormLabel>Module Name</FormLabel>
                    <Select {...field} placeholder="Select option">
                      {modules?.map((module) => (
                        <option key={module.id} value={module.id}>
                          {module.module_name}
                        </option>
                      ))}
                    </Select>
                    <FormErrorMessage>{form.errors.module_id}</FormErrorMessage>
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

export default FormMenu;
