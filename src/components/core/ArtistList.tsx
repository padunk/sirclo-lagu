import { Flex, SimpleGrid } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { Attributes, TopArtist } from "../../types";
import ArtistCard from "../utils/ArtistCard";
import ListLayout from "../utils/ListLayout";
import ListLoader from "../utils/ListLoader";
import PaginationBar from "../utils/PaginationBar";

interface Props {}

const ArtistList = (props: Props) => {
    const [pagination, setPagination] = useState<Attributes>({
        page: "1", // page number can not exceed 1_000_000
        perPage: "",
        totalPages: "",
        total: "",
    });

    const getTopArtists = async (page = 1, limit = 24) => {
        let result: {
            data: {
                artists: TopArtist;
            };
        };

        try {
            result = await axios.get(
                `http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=${
                    import.meta.env.VITE_LAST_FM_API_KEY
                }&format=json&limit=${limit}&page=${page}`
            );
        } catch (error) {
            throw new Error("problem getting top artists");
        }
        setPagination(result.data.artists["@attr"]);
        return result.data.artists;
    };

    const { isLoading, isError, data, error } = useQuery<TopArtist, Error>(
        ["topArtist", Number(pagination.page)],
        () => getTopArtists(Number(pagination.page)),
        { keepPreviousData: true }
    );

    if (isError) {
        return <span>Error: {error?.message}</span>;
    }

    return (
        <ListLayout>
            {data?.artist.map((art) => {
                return <ArtistCard key={art.name} artist={art.name} />;
            })}
            <PaginationBar
                pagination={pagination}
                setPagination={setPagination}
            />
        </ListLayout>
    );
};

export default ArtistList;
