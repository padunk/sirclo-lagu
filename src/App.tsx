import { Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import { MainHeader } from "./components";
import SongList from "./components/core/SongList";

function App() {
    return (
        <Flex direction="column">
            <MainHeader />
            <SongList />
        </Flex>
    );
}

export default App;
