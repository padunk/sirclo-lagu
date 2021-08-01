import { Flex, SimpleGrid } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { TopArtist } from "../../types";
import ArtistCard from "../utils/ArtistCard";
import ListLayout from "../utils/ListLayout";
import ListLoader from "../utils/ListLoader";

interface Props {}

const ArtistList = (props: Props) => {
    const getTopArtists = async () => {
        let result: { data: { artists: TopArtist } };
        try {
            result = await axios.get(
                `http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=${
                    import.meta.env.VITE_LAST_FM_API_KEY
                }&format=json&limit=12`
            );
        } catch (error) {
            throw new Error("problem getting top tracks");
        }
        return result.data.artists;
    };

    const { isLoading, isError, data, error } = useQuery<TopArtist, Error>(
        "topArtist",
        getTopArtists
    );

    if (isError) {
        return <span>Error: {error?.message}</span>;
    }

    return (
        <ListLayout isLoaded={isLoading}>
            {data?.artist.map((art) => {
                return <ArtistCard key={art.name} artist={art.name} />;
            })}
        </ListLayout>
    );
};

export default ArtistList;
