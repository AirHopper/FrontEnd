import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ChakraProviderWrapper } from "@/components/ui/provider";
import { RouterProvider, createRouter, NotFoundRoute } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route as rootRoute } from './routes/__root'
import NotFoundPage from "./components/NotFound";
// Import your store
import { store } from "./redux/store";

// Import generated TanStack router route tree
import { routeTree } from "./routeTree.gen";
import { ColorModeProvider } from "./components/ui/color-mode";
import "@fontsource-variable/plus-jakarta-sans/index.css";

// Create an instance of Query Client
const queryClient = new QueryClient();

const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: () => <NotFoundPage />,
})

// Create a new router instance
const router = createRouter({ routeTree, notFoundRoute, });

const rootElement = document.getElementById("root");
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <ChakraProviderWrapper>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </Provider>
      </ChakraProviderWrapper>
    </StrictMode>
  );
}
