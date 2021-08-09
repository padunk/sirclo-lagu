import { StackDivider, VStack } from "@chakra-ui/react";
import React from "react";
import { QueryMethod } from "../../types";
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
            flexGrow={2}
            mt="8"
        >
            <SearchResult
                searchTerms={searchTerms}
                method={QueryMethod.searchArtist}
            />
            <SearchResult
                searchTerms={searchTerms}
                method={QueryMethod.searchTrack}
            />
        </VStack>
    );
};

export default SearchList;
