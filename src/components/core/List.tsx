import React from "react";
import { StackDivider, VStack } from "@chakra-ui/react";
import { QueryMethod } from "../../types";
import ListResult from "./ListResult";

interface Props {
    listBy: QueryMethod | string;
}

const List = ({ listBy }: Props) => {
    if (listBy === QueryMethod.byArtist || listBy === QueryMethod.byTrack) {
        return <ListResult queryMethod={listBy} />;
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
                />
                <ListResult
                    queryMethod={QueryMethod.searchTrack}
                    searchTerms={listBy}
                />
            </VStack>
        );
    }
};

export default List;
