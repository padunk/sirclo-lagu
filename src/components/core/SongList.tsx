import { SimpleGrid } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { TopTrack } from "../../types";
import ListLayout from "../utils/ListLayout";
import ListLoader from "../utils/ListLoader";
import SongCard from "../utils/SongCard";

interface Props {}

const SongList = (props: Props) => {
    const getTopTracks = async () => {
        let result: { data: { tracks: TopTrack } };
        try {
            result = await axios.get(
                `http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${
                    import.meta.env.VITE_LAST_FM_API_KEY
                }&format=json&limit=12`
            );
        } catch (error) {
            throw new Error("problem getting top tracks");
        }
        return result.data.tracks;
    };

    const { isLoading, isError, data, error } = useQuery<TopTrack, Error>(
        "topTracks",
        getTopTracks
    );

    if (isError) {
        return <span>Error: {error?.message}</span>;
    }

    return (
        <ListLayout isLoaded={isLoading}>
            {data?.track.map((d) => {
                return (
                    <SongCard
                        key={`${d.name}-${d.artist.name}`}
                        artist={d.artist.name}
                        title={d.name}
                    />
                );
            })}
        </ListLayout>
    );
};

export default SongList;
