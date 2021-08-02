import { Button, Flex, SimpleGrid } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { Attributes, TopTrack } from "../../types";
import ListLayout from "../utils/ListLayout";
import ListLoader from "../utils/ListLoader";
import PaginationBar from "../utils/PaginationBar";
import SongCard from "../utils/SongCard";

interface Props {}

const SongList = (props: Props) => {
    const [pagination, setPagination] = useState<Attributes>({
        page: "1", // page number can not exceed 1_000_000
        perPage: "",
        totalPages: "",
        total: "",
    });

    const getTopTracks = async (page = 1, limit = 24) => {
        let result: {
            data: {
                tracks: TopTrack;
            };
        };

        try {
            result = await axios.get(
                `http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${
                    import.meta.env.VITE_LAST_FM_API_KEY
                }&format=json&limit=${limit}&page=${page}`
            );
        } catch (error) {
            throw new Error("problem getting top tracks");
        }
        setPagination(result.data.tracks["@attr"]);
        return result.data.tracks;
    };

    const { isLoading, isError, data, error, isPreviousData } = useQuery<
        TopTrack,
        Error
    >(
        ["topTracks", Number(pagination.page)],
        () => getTopTracks(Number(pagination.page)),
        { keepPreviousData: true }
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
            <PaginationBar
                pagination={pagination}
                setPagination={setPagination}
            />
        </ListLayout>
    );
};

export default SongList;
