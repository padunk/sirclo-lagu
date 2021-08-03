import { Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import { MainHeader } from "./components";
import Footer from "./components/core/Footer";
import MainDisplay from "./components/core/MainDisplay";
import { listLoading, LoadingContext } from "./context/LoadingContext";

function App() {
    return (
        <LoadingContext.Provider value={listLoading()}>
            <Flex direction="column" bg="gray.50" minH="100vh">
                <MainHeader />
                <MainDisplay />
                <Footer />
            </Flex>
        </LoadingContext.Provider>
    );
}

export default App;
