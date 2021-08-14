import React, { useState } from "react";
import { useFetchLists } from "../../hooks/apiHooks";
import { Attributes, QueryMethod } from "../../types";
import ArtistCard from "../utils/ArtistCard";
import ErrorList from "../utils/ErrorList";
import ListLayout from "../utils/ListLayout";
import ListLoader from "../utils/ListLoader";
import PaginationBar from "../utils/PaginationBar";
import SearchTemplate from "../utils/SearchTemplate";
import SongCard from "../utils/SongCard";
import { ViewStyle } from "./MainDisplay";

interface Props {
    queryMethod: QueryMethod;
    searchTerms?: string;
    viewStyle: ViewStyle;
}

const ListResult = ({ searchTerms, viewStyle, queryMethod }: Props) => {
    const [pagination, setPagination] = useState<Attributes>({
        page: "1", // page number can not exceed 1_000_000
        perPage: "",
        totalPages: "",
        total: "",
    });
    const { data, error, isPreviousData, status } = useFetchLists({
        method: queryMethod,
        query: searchTerms,
        _page: Number(pagination.page),
        setPagination,
    });

    if (status === "loading") {
        return <ListLoader />;
    }

    if (status === "error") {
        return <ErrorList message={error?.message} />;
    }

    if (data?.hasOwnProperty("artists")) {
        return (
            <ListLayout
                isPreviousData={isPreviousData}
                pagination={pagination}
                setPagination={setPagination}
                status={status}
                title="Artist"
                viewStyle={viewStyle}
            >
                {data.artists!.artist.map((art) => {
                    return (
                        <ArtistCard
                            key={`${art.name}-${art.mbid}`}
                            artist={art.name}
                            viewStyle={viewStyle}
                        />
                    );
                })}
            </ListLayout>
        );
    } else if (data?.hasOwnProperty("tracks")) {
        return (
            <ListLayout
                isPreviousData={isPreviousData}
                pagination={pagination}
                setPagination={setPagination}
                status={status}
                title="Track"
                viewStyle={viewStyle}
            >
                {data.tracks!.track.map((tr) => {
                    return (
                        <SongCard
                            key={`${tr.name} - ${tr.artist.mbid}`}
                            artist={tr.artist.name}
                            title={tr.name}
                            viewStyle={viewStyle}
                        />
                    );
                })}
            </ListLayout>
        );
    } else if (data?.hasOwnProperty("results")) {
        if (data?.results!.artistmatches) {
            return (
                <ListLayout
                    isPreviousData={isPreviousData}
                    pagination={pagination}
                    setPagination={setPagination}
                    status={status}
                    title="Artist"
                    viewStyle={viewStyle}
                >
                    {data.results.artistmatches!.artist.map((art) => {
                        return (
                            <ArtistCard
                                key={`${art.name}-${art.mbid}`}
                                artist={art.name}
                                viewStyle={viewStyle}
                            />
                        );
                    })}
                </ListLayout>
            );
        } else if (data.results!.trackmatches) {
            return (
                <ListLayout
                    isPreviousData={isPreviousData}
                    pagination={pagination}
                    setPagination={setPagination}
                    status={status}
                    title="Track"
                    viewStyle={viewStyle}
                >
                    {data.results!.trackmatches!.track.map((tr) => {
                        return (
                            <SongCard
                                key={`${tr.name} - ${tr.artist}`}
                                artist={tr.artist}
                                title={tr.name}
                                viewStyle={viewStyle}
                            />
                        );
                    })}
                </ListLayout>
            );
        }
    }
    return <SearchTemplate />;
};

export default ListResult;
