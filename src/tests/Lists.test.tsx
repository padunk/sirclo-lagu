import * as React from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { renderHook } from "@testing-library/react-hooks";
import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import nock from "nock";
import axios from "axios";
import { mockTopArtistResult } from "./mockResult";

afterEach(cleanup);

// custom hooks
function useGetTopArtist(page = 1, limit = 3) {
    return useQuery("customHook", async () => {
        try {
            const { data } = await axios.get(
                `http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=${process.env.VITE_LAST_FM_API_KEY}&format=json&limit=${limit}&page=${page}`
            );
            return data;
        } catch (error) {
            throw new Error("problem getting top artist");
        }
    });
}

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

// mock api success
nock(`http://ws.audioscrobbler.com/2.0`)
    .get(
        `/?method=chart.gettopartists&api_key=${process.env.VITE_LAST_FM_API_KEY}&format=json&limit=3&page=1`
    )
    .reply(200, { mockTopArtistResult });
test("if success getting call gettopartist", async () => {
    const { result, waitFor } = renderHook(() => useGetTopArtist(), {
        wrapper,
    });
    await waitFor(() => result.current.isSuccess);
    expect(result.current.data).toBe(mockTopArtistResult);
});

// mock api error
nock(`http://ws.audioscrobbler.com/2.0`)
    .get(
        `/?method=chart.gettopartists&api_key=${process.env.VITE_LAST_FM_API_KEY}&format=json&limit=3&page=1`
    )
    .replyWithError("problem getting top artist");
test("if error getting call gettopartist", async () => {
    const { result, waitFor } = renderHook(() => useGetTopArtist(), {
        wrapper,
    });
    await waitFor(() => result.current.isError);
    expect(result.current.data).toBeUndefined();
});
