import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "@/components/ui/provider";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// import generated tanstack router route tree
import { routeTree } from "./routeTree.gen";
import { ColorModeProvider } from "./components/ui/color-mode";

// Buat instance Query Client
const queryClient = new QueryClient();

// create a new router instance
const router = createRouter({ routeTree });

const rootElement = document.getElementById("root");
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <ColorModeProvider>
        <Provider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </Provider>
      </ColorModeProvider>
    </StrictMode>
  );
}
