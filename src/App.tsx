import React from "react";
import { Flex } from "@chakra-ui/react";
import { MainHeader } from "./components";
import Footer from "./components/core/Footer";
import MainDisplay from "./components/core/MainDisplay";

function App() {
    return (
        <Flex direction="column" bg="gray.50" minH="100vh">
            <MainHeader />
            <MainDisplay />
            <Footer />
        </Flex>
    );
}

export default App;
