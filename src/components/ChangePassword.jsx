import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { useSelector } from "react-redux";
import useLogin from "../hooks/useLogin";
import * as yup from "yup";

const ChangePassword = () => {
  const auth = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.token.token);

  const toast = useToast();

  const { changePassword } = useLogin();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const handleClickOldPassword = () => setShowOldPassword(!showOldPassword);
  const handleClickPassword = () => setShowPassword(!showPassword);
  const handleClickPasswordConfirmation = () =>
    setShowPasswordConfirmation(!showPasswordConfirmation);

  const initialValues = {
    id: auth.id,
    old_password: "",
    password: "",
    new_password: "",
  };

  const validationSchema = yup.object({
    old_password: yup.string().required().min(8).trim(),
    password: yup.string().required().min(8).trim(),
    new_password: yup
      .string()
      .required()
      .min(8)
      .oneOf([yup.ref("password"), null], "Password tidak sama")
      .trim(),
  });

  const onSubmit = async (values, actions) => {
    await changePassword(token, values)
      .then((res) => {
        let { data } = res;
        toast({
          position: "top",
          description: data.message,
          status: "success",
          isClosable: true,
        });
        actions.resetForm();
      })
      .catch((error) => {
        let responses = error.response.data;
        let message = "";
        if (responses.message.new_password) {
          message = responses.message.new_password[0];
        } else {
          message = responses.message;
        }
        toast({
          position: "top",
          description: message,
          status: "error",
          isClosable: true,
        });
      });
  };

  return (
    <Box p={4}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(props) => (
          <Form autoComplete="off">
            <Stack spacing={4}>
              <Field name="old_password">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.old_password && form.touched.old_password
                    }
                  >
                    <FormLabel>Old Password</FormLabel>
                    <InputGroup size="md">
                      <Input
                        {...field}
                        pr="4.5rem"
                        type={showOldPassword ? "text" : "password"}
                        placeholder="Enter password"
                        rounded="lg"
                        tabIndex={1}
                      />
                      <InputRightElement width="4.5rem">
                        <Button
                          h="1.75rem"
                          size="sm"
                          onClick={handleClickOldPassword}
                        >
                          {showOldPassword ? "Hide" : "Show"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {form.errors.old_password}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="password">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.password && form.touched.password}
                  >
                    <FormLabel>Password</FormLabel>
                    <InputGroup size="md">
                      <Input
                        {...field}
                        pr="4.5rem"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        rounded="lg"
                        tabIndex={2}
                      />
                      <InputRightElement width="4.5rem">
                        <Button
                          h="1.75rem"
                          size="sm"
                          onClick={handleClickPassword}
                        >
                          {showPassword ? "Hide" : "Show"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="new_password">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.new_password && form.touched.new_password
                    }
                  >
                    <FormLabel>Password Confirmation</FormLabel>
                    <InputGroup size="md">
                      <Input
                        {...field}
                        pr="4.5rem"
                        type={showPasswordConfirmation ? "text" : "password"}
                        placeholder="Enter password"
                        rounded="lg"
                        tabIndex={3}
                      />
                      <InputRightElement width="4.5rem">
                        <Button
                          h="1.75rem"
                          size="sm"
                          onClick={handleClickPasswordConfirmation}
                        >
                          {showPasswordConfirmation ? "Hide" : "Show"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {form.errors.new_password}
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
                Save
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default ChangePassword;
