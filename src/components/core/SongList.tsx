import { Flex } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { DataTrack } from "../../types";
import ListLoader from "../utils/ListLoader";
import SongCard from "../utils/SongCard";

interface Props {}

const SongList = (props: Props) => {
    const getTopTracks = async () => {
        let result: DataTrack;
        try {
            result = await axios.get(
                `http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${
                    import.meta.env.VITE_LAST_FM_API_KEY
                }&format=json&limit=12`
            );
        } catch (error) {
            throw new Error("problem getting top tracks");
        }
        return result;
    };

    const { isLoading, isError, data, error } = useQuery<DataTrack, Error>(
        "topTracks",
        getTopTracks
    );

    if (isLoading) {
        return <ListLoader />;
    }

    if (isError) {
        return <span>Error: {error?.message}</span>;
    }

    return (
        <Flex flexWrap="wrap" justifyContent="space-around" p="12">
            {data?.data.tracks.track.map((d) => {
                return (
                    <SongCard
                        key={`${d.name}-${d.artist.name}`}
                        artist={d.artist.name}
                        title={d.name}
                    />
                );
            })}
        </Flex>
    );
};

export default SongList;
