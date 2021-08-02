import { Box, Flex, Text } from "@chakra-ui/react";
import React, { ChangeEvent, useEffect, useState } from "react";
import { ShowBy } from "../../types";
import ListMenu from "./ListMenu";
import ArtistList from "./ArtistList";
import SongList from "./SongList";
import SearchList from "./SearchList";
import SearchTemplate from "../utils/SearchTemplate";

interface Props {}

const MainDisplay = (props: Props) => {
    const [showBy, setShowBy] = useState<ShowBy | null>(ShowBy.Artist);
    const [searchTerms, setSearchTerms] = useState("");

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setShowBy(e.target.value as ShowBy);
    };

    return (
        <Flex direction="column" flexGrow={2}>
            <ListMenu
                onChange={handleChange}
                searchTerms={searchTerms}
                setSearchTerms={setSearchTerms}
                setShowBy={setShowBy}
            />
            {showBy === ShowBy.Artist ? (
                <ArtistList />
            ) : showBy === ShowBy.Track ? (
                <SongList />
            ) : searchTerms === "" ? (
                <SearchTemplate />
            ) : (
                <SearchList searchTerms={searchTerms} />
            )}
        </Flex>
    );
};

export default MainDisplay;
