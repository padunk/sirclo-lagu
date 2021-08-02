import { StackDivider, VStack } from "@chakra-ui/react";
import React from "react";
import { Method } from "../../types";
import SearchResult from "./SearchResult";

interface Props {
    searchTerms: string;
}

const SearchList = ({ searchTerms }: Props) => {
    return (
        <VStack
            divider={<StackDivider borderColor="gray.200" />}
            spacing={4}
            align="stretch"
        >
            <SearchResult searchTerms={searchTerms} method={Method.artist} />
            <SearchResult searchTerms={searchTerms} method={Method.track} />
        </VStack>
    );
};

export default SearchList;
