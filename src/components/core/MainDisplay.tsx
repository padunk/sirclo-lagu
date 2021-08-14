import { Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import { FetchStatusProvider } from "../../context/LoadingContext";
import { QueryMethod } from "../../types";
import ListErrorBoundary from "../utils/ListErrorBoundary";
import List from "./List";
import ListMenu from "./ListMenu";

interface Props {}

export enum ViewStyle {
    Grid = "grid",
    List = "list",
}

const MainDisplay = (props: Props) => {
    const [viewStyle, setViewStyle] = useState<ViewStyle>(ViewStyle.Grid);
    const [listBy, setListBy] = useState<QueryMethod | string>(
        QueryMethod.byArtist
    );

    return (
        <FetchStatusProvider>
            <Flex direction="column" flexGrow={2}>
                <ListMenu
                    listBy={listBy}
                    setListBy={setListBy}
                    viewStyle={viewStyle}
                    setViewStyle={setViewStyle}
                />
                <ListErrorBoundary>
                    <List listBy={listBy} viewStyle={viewStyle} />
                </ListErrorBoundary>
            </Flex>
        </FetchStatusProvider>
    );
};

export default MainDisplay;
