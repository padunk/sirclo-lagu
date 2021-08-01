import { Flex } from "@chakra-ui/react";
import React, { ChangeEvent, useState } from "react";
import { ShowBy } from "../../types";
import ArtistList from "./ArtistList";
import ListMenu from "./ListMenu";
import SongList from "./SongList";

interface Props {}

const MainDisplay = (props: Props) => {
    const [showtBy, setShowtBy] = useState<ShowBy>(ShowBy.Artist);

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setShowtBy(e.target.value as ShowBy);
    };

    return (
        <Flex direction="column">
            <ListMenu onChange={handleChange} />
            {showtBy === "topTrack" ? <SongList /> : <ArtistList />}
        </Flex>
    );
};

export default MainDisplay;
