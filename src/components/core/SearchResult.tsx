import { Box, Flex, Heading } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import {
    ArtistMatch,
    Attributes,
    Method,
    SearchBase,
    TrackMatch,
} from "../../types";
import ListLayout from "../utils/ListLayout";
import ArtistCard from "../utils/ArtistCard";
import SongCard from "../utils/SongCard";
import PaginationBar from "../utils/PaginationBar";
import NoResult from "../utils/NoResult";
import ListLoader from "../utils/ListLoader";
import { ListLoading, LoadingContext } from "../../context/LoadingContext";
import ErrorList from "../utils/ErrorList";

interface Props {
    searchTerms: string;
    method: Method;
}

const SearchResult = ({ method, searchTerms }: Props) => {
    const { setIsLoading } = useContext(LoadingContext) as ListLoading;
    const [pagination, setPagination] = useState<Attributes>({
        page: "1", // page number can not exceed 1_000_000
        perPage: "",
        total: "",
        totalPages: "",
    });

    const getResult = async (page = 1, limit = 24) => {
        let result: {
            data: {
                results?: SearchBase;
            };
        };
        setIsLoading(true);
        try {
            result = await axios.get(
                `http://ws.audioscrobbler.com/2.0/?method=${method}&artist=${encodeURI(
                    searchTerms
                )}&api_key=${
                    import.meta.env.VITE_LAST_FM_API_KEY
                }&format=json&page=${page}&limit=${limit}`
            );
        } catch (error) {
            throw new Error("problem getting search result");
        }

        // check if there is data coming.
        if (!result.data.hasOwnProperty("results")) {
            throw new Error("no result");
        } else {
            const totalPages = String(
                Number(result.data.results!["opensearch:totalResults"]) / limit
            );

            setPagination((prevState) => {
                return {
                    ...prevState,
                    page: result.data.results!["opensearch:Query"].startPage,
                    total: result.data.results!["opensearch:totalResults"],
                    totalPages,
                };
            });
        }

        if (method === Method.track) {
            return result.data.results?.trackmatches?.track;
        } else {
            return result.data.results?.artistmatches?.artist;
        }
    };

    const query = useQuery<TrackMatch[] | ArtistMatch[] | undefined, Error>(
        [method, Number(pagination.page)],
        () => getResult(Number(pagination.page)),
        { keepPreviousData: true }
    );

    if (query.isLoading) {
        setIsLoading(true);
        return <ListLoader />;
    }

    if (query.isError) {
        setIsLoading(false);
    }

    if (query.isSuccess) {
        setIsLoading(false);
    }

    return (
        <Flex flexDirection="column" flexGrow={1}>
            <Heading as="h2" pl={8} fontSize="2xl">
                {method === Method.track ? "Track" : "Artist"}
            </Heading>
            {query.isError ? (
                // @ts-ignore
                <NoResult message={query.error.message} />
            ) : query.isLoading ? (
                <ListLayout>
                    <ListLoader />
                </ListLayout>
            ) : (
                <ListLayout>
                    {method === Method.track
                        ? query.data?.map((result) => {
                              return (
                                  <SongCard
                                      artist={(result as TrackMatch).artist}
                                      title={result.name}
                                      key={result.name}
                                  />
                              );
                          })
                        : query.data?.map((result) => {
                              return (
                                  <ArtistCard
                                      artist={result.name}
                                      key={result.name}
                                  />
                              );
                          })}
                    <PaginationBar
                        pagination={pagination}
                        setPagination={setPagination}
                    />
                </ListLayout>
            )}
        </Flex>
    );
};

export default SearchResult;
