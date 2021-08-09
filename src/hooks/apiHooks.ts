import * as React from "react";
import axios from "axios";
import {
    Attributes,
    QueryMethod,
    SearchBase,
    TopArtist,
    TopTrack,
} from "../types";
import { useQuery, UseQueryOptions } from "react-query";
import { generateEndPoint } from "../helpers/utils";
import {
    FetchStatusContext,
    FetchStatusValue,
} from "../context/LoadingContext";

type QueryPromiseResult = {
    artists?: TopArtist;
    tracks?: TopTrack;
    results?: SearchBase;
};

async function fetchListBy(url: string): Promise<QueryPromiseResult> {
    try {
        const { data } = await axios.get(url);
        return data;
    } catch (error) {
        throw new Error("problem getting data");
    }
}

export type UseFetchListsProps = {
    method: QueryMethod;
    setPagination?: React.Dispatch<React.SetStateAction<Attributes>>;
    query?: string;
    _page?: number;
    _limit?: number;
};

export function useFetchLists({
    _page,
    _limit,
    method,
    query,
    setPagination,
}: UseFetchListsProps) {
    const { setGlobalStatus } =
        React.useContext<FetchStatusValue>(FetchStatusContext);
    const options: UseQueryOptions<
        QueryPromiseResult,
        Error,
        QueryPromiseResult,
        string[]
    > = {
        keepPreviousData: true,
        useErrorBoundary: true,
        onSuccess(context) {
            if (setPagination) {
                let page =
                    context.artists?.["@attr"].page ||
                    context.tracks?.["@attr"].page ||
                    context.results?.["opensearch:Query"].startPage;
                let totalPages =
                    context.artists?.["@attr"].totalPages ||
                    context.tracks?.["@attr"].totalPages ||
                    context.results?.["opensearch:totalResults"];
                setPagination((prevPagination) => ({
                    ...prevPagination,
                    page: page!,
                    totalPages: totalPages!,
                }));
            }
        },
        onSettled(ctx, err) {
            if (err) {
                setGlobalStatus((prevState) => {
                    return prevState.concat("error");
                });
                return;
            }
            if (ctx) {
                setGlobalStatus((prevState) => {
                    return prevState.concat("success");
                });
            }
        },
    };
    const queryResult = useQuery<
        QueryPromiseResult,
        Error,
        QueryPromiseResult,
        string[]
    >(
        [method, query!, String(_page), String(_limit)],
        async () => {
            setGlobalStatus([]);
            return await fetchListBy(
                generateEndPoint({ method, _page, _limit, query })
            );
        },
        options
    );
    return queryResult;
}
