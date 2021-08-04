import {
    render,
    fireEvent,
    screen,
    cleanup,
    waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

// Chakra UI provider is needed here.
import { ThemeProvider } from "@chakra-ui/react";
import theme from "../../theme";
import { ArtistList } from "../components";

afterEach(cleanup);

test("should showing loading on first render", () => {
    const { getByTestId } = render(
        <ThemeProvider theme={theme}>
            <ArtistList />
        </ThemeProvider>
    );
    expect(getByTestId("list-loader")).toBeInTheDocument();
});

test("should display artist card on success", async () => {
    const mockResult = {
        name: "pink floyd",
        mbid: "",
        url: "",
        bio: {
            content: "",
            links: {
                link: {
                    href: "",
                    rel: "",
                },
            },
            published: "",
            summary: "",
        },
        image: [
            { "#text": "", size: "" },
            { "#text": "", size: "" },
            { "#text": "", size: "" },
        ],
        ontour: 0,
        similar: {
            artist: [
                {
                    image: [
                        { "#text": "", size: "" },
                        { "#text": "", size: "" },
                        { "#text": "", size: "" },
                    ],
                    name: "",
                    url: "",
                },
            ],
        },
        stats: {
            playcount: 888,
            listeners: 666,
        },
        streamable: "",
        tags: {
            tag: [{ name: "", url: "" }],
        },
    };

    // Mock API
    jest.spyOn(global, "fetch")
        // @ts-ignore
        .mockImplementation(() =>
            Promise.resolve({
                status: 200,
                json: () =>
                    Promise.resolve({
                        value: mockResult,
                    }),
            })
        );

    const { getByTestId } = render(
        <ThemeProvider theme={theme}>
            <ArtistList />
        </ThemeProvider>
    );
    await waitFor(() => getByTestId("card-layout"));
    expect(getByTestId("artist-name")).toBe(mockResult.name);

    // clear mock
    // @ts-ignore
    global.fetch.mockClear();
});
