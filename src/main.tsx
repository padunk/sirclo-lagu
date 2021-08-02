import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";

// style
import { ChakraProvider } from "@chakra-ui/react";
import "./index.css";
import "@fontsource/open-sans";
import theme from "../theme";

// only on dev
import { ReactQueryDevtools } from "react-query/devtools";

ReactDOM.render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <QueryClientProvider client={new QueryClient()}>
                <App />
                {import.meta.env.DEV && (
                    <ReactQueryDevtools initialIsOpen={false} />
                )}
            </QueryClientProvider>
        </ChakraProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
