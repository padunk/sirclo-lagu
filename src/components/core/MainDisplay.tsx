import { Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import { FetchStatusProvider } from "../../context/LoadingContext";
import { QueryMethod } from "../../types";
import ListErrorBoundary from "../utils/ListErrorBoundary";
import List from "./List";
import ListMenu from "./ListMenu";

interface Props {}

const MainDisplay = (props: Props) => {
    const [listBy, setListBy] = useState<QueryMethod | string>(
        QueryMethod.byArtist
    );

    return (
        <FetchStatusProvider>
            <Flex direction="column" flexGrow={2}>
                <ListMenu listBy={listBy} setListBy={setListBy} />
                <ListErrorBoundary>
                    <List listBy={listBy} />
                </ListErrorBoundary>
            </Flex>
        </FetchStatusProvider>
    );
};

export default MainDisplay;
