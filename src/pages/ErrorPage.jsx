import { Stack, Text } from "@chakra-ui/react";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);

  return (
    <div>
      <Stack align="center" justify="center">
        <Text fontSize="3xl">Oops!</Text>
        <Text>Sorry, an unexpected error has occurred.</Text>
        <Text as="i">{error.statusText || error.error.message}</Text>
      </Stack>
    </div>
  );
};

export default ErrorPage;
