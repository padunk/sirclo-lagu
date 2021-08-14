import React from "react";
import { StackDivider, VStack } from "@chakra-ui/react";
import { QueryMethod } from "../../types";
import ListResult from "./ListResult";
import { ViewStyle } from "./MainDisplay";

interface Props {
    listBy: QueryMethod | string;
    viewStyle: ViewStyle;
}

const List = ({ listBy, viewStyle }: Props) => {
    if (listBy === QueryMethod.byArtist || listBy === QueryMethod.byTrack) {
        return <ListResult queryMethod={listBy} viewStyle={viewStyle} />;
    } else {
        return (
            <VStack
                divider={<StackDivider borderColor="gray.200" />}
                spacing={4}
                align="stretch"
                flexGrow={2}
                mt="8"
            >
                <ListResult
                    queryMethod={QueryMethod.searchArtist}
                    searchTerms={listBy}
                    viewStyle={viewStyle}
                />
                <ListResult
                    queryMethod={QueryMethod.searchTrack}
                    searchTerms={listBy}
                    viewStyle={viewStyle}
                />
            </VStack>
        );
    }
};

export default List;
