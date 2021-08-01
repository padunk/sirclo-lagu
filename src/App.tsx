import { Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import { MainHeader } from "./components";
import MainDisplay from "./components/core/MainDisplay";

function App() {
    return (
        <Flex direction="column" bg="gray.50" minH="100vh">
            <MainHeader />
            <MainDisplay />
        </Flex>
    );
}

export default App;
