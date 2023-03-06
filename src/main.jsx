import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Center, ChakraProvider, Spinner } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import Route from "./router/Route";

let persistor = persistStore(store);

const { router } = Route();

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Suspense
          fallback={
            <Center h="100vh">
              <Spinner size="xl" />
            </Center>
          }
        >
          <RouterProvider router={router} />
        </Suspense>
      </PersistGate>
    </Provider>
  </ChakraProvider>
);
