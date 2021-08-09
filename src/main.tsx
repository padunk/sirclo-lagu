import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";

// style
import { ChakraProvider } from "@chakra-ui/react";
import "./index.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/nunito/400.css";
import theme from "../theme";

// only on dev
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            useErrorBoundary: true,
            refetchOnWindowFocus: false,
            retry(failureCount: number, error: any) {
                if (error.status === 404) return false;
                else if (failureCount < 2) return true;
                else return false;
            },
        },
    },
});

ReactDOM.render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <App />
                {process.env.DEV && (
                    <ReactQueryDevtools initialIsOpen={false} />
                )}
            </QueryClientProvider>
        </ChakraProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
