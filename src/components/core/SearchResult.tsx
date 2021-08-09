import { Box, Flex, Heading } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import {
    ArtistMatch,
    Attributes,
    QueryMethod,
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
    method: QueryMethod;
}

const SearchResult = ({ method, searchTerms }: Props) => {
    const { setIsLoading } = useContext(LoadingContext) as ListLoading;
    const [pagination, setPagination] = useState<Attributes>({
        page: "1", // page number can not exceed 1_000_000
        perPage: "",
        total: "",
        totalPages: "",
    });

    const getResult = async (_searchTerms: string, page = 1, limit = 24) => {
        let result: {
            data: {
                results?: SearchBase;
            };
        };
        setIsLoading(true);
        try {
            result = await axios.get(
                `http://ws.audioscrobbler.com/2.0/?method=${method}&${
                    method === QueryMethod.searchArtist ? "artist" : "track"
                }=${encodeURI(_searchTerms)}&api_key=${
                    process.env.VITE_LAST_FM_API_KEY
                }&format=json&page=${page}&limit=${limit}`
            );
        } catch (error) {
            throw new Error("problem getting search result");
        } finally {
            setIsLoading(false);
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

        if (method === QueryMethod.searchTrack) {
            return result.data.results?.trackmatches?.track;
        } else {
            return result.data.results?.artistmatches?.artist;
        }
    };

    const query = useQuery<TrackMatch[] | ArtistMatch[] | undefined, Error>(
        [method, searchTerms, Number(pagination.page)],
        () => getResult(searchTerms, Number(pagination.page)),
        { keepPreviousData: true }
    );

    return (
        <Flex flexDirection="column" flexGrow={1}>
            <Heading as="h2" pl={8} fontSize="2xl">
                {method === QueryMethod.searchTrack ? "Track" : "Artist"}
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
                    {method === QueryMethod.searchTrack
                        ? // @ts-ignore
                          query.data?.map((result: TrackMatch, i) => {
                              return (
                                  <SongCard
                                      artist={(result as TrackMatch).artist}
                                      title={result.name}
                                      key={result.name + i}
                                  />
                              );
                          })
                        : // @ts-ignore
                          query.data?.map((result: ArtistMatch, i) => {
                              return (
                                  <ArtistCard
                                      artist={result.name}
                                      key={result.name + i}
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
