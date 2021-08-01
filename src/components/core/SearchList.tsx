import {
    Box,
    Flex,
    GridItem,
    Heading,
    SimpleGrid,
    Skeleton,
    StackDivider,
    VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { SearchBase } from "../../types";
import ArtistCard from "../utils/ArtistCard";
import ListLayout from "../utils/ListLayout";
import SongCard from "../utils/SongCard";

interface Props {
    searchTerms: string;
}

const SearchList = ({ searchTerms }: Props) => {
    const getArtistResult = async () => {
        let result: {
            data: {
                results: SearchBase;
            };
        };
        try {
            result = await axios.get(
                `http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${searchTerms}&api_key=${
                    import.meta.env.VITE_LAST_FM_API_KEY
                }&format=json&limit=10`
            );
        } catch (error) {
            throw new Error("problem getting artist info");
        }
        return result.data.results.artistmatches;
    };

    const getTrackResult = async () => {
        let result: { data: { results: SearchBase } };
        try {
            result = await axios.get(
                `http://ws.audioscrobbler.com/2.0/?method=track.search&track=${searchTerms}&api_key=${
                    import.meta.env.VITE_LAST_FM_API_KEY
                }&format=json&limit=10`
            );
        } catch (error) {
            throw new Error("problem getting artist info");
        }
        return result.data.results.trackmatches;
    };

    const artistQuery = useQuery("artistSearch", getArtistResult);
    const trackQuery = useQuery("trackSearch", getTrackResult);

    return (
        <VStack
            divider={<StackDivider borderColor="gray.200" />}
            spacing={4}
            align="stretch"
        >
            <Box>
                <ListLayout isLoaded={artistQuery.isLoading}>
                    <Heading
                        as="h2"
                        style={{ gridColumn: "1 / -1" }}
                        pl={8}
                        fontSize="2xl"
                    >
                        Artist
                    </Heading>
                    {artistQuery.data?.artist?.map((artistResult) => {
                        return (
                            <ArtistCard
                                artist={artistResult.name}
                                key={artistResult.name}
                            />
                        );
                    })}
                </ListLayout>
            </Box>
            <Box>
                <ListLayout isLoaded={trackQuery.isLoading}>
                    <Heading
                        as="h2"
                        style={{ gridColumn: "1 / -1" }}
                        pl={8}
                        fontSize="2xl"
                    >
                        Tracks
                    </Heading>
                    {trackQuery.data?.track.map((trackResult) => {
                        return (
                            <SongCard
                                artist={trackResult.artist}
                                title={trackResult.name}
                                key={trackResult.name}
                            />
                        );
                    })}
                </ListLayout>
            </Box>
        </VStack>
    );
};

export default SearchList;
