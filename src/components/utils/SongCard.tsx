import { Box, Flex, Heading, Image, LinkOverlay, Text } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { TrackInfo } from "../../types";
import Stats from "./Stats";
import Tags from "./Tags";
import {
    customCoverTemplate,
    isTemplateImage,
    parsingWikiContent,
} from "../../helpers/utils";
import CardLayout from "./CardLayout";
import ErrorCard from "./ErrorCard";
import CardLoader from "./CardLoader";
import { ViewStyle } from "../core/MainDisplay";
import ImageTemplate from "./ImageTemplate";

interface Props {
    artist: string;
    title: string;
    viewStyle: ViewStyle;
}

const SongCard = ({ artist, title, viewStyle }: Props) => {
    const getTrackInfo = async () => {
        let result: { data: { track: TrackInfo } };
        try {
            result = await axios.get(
                `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${
                    process.env.VITE_LAST_FM_API_KEY
                }&artist=${encodeURI(artist)}&track=${encodeURI(
                    title
                )}&format=json`
            );
        } catch (error) {
            throw new Error("Track info is not available");
        }
        return result.data.track;
    };

    const { isError, isLoading, data, error } = useQuery<TrackInfo, Error>(
        ["trackInfo", artist, title],
        getTrackInfo,
        { useErrorBoundary: true }
    );

    if (isLoading) {
        return (
            <CardLayout viewStyle={viewStyle}>
                <CardLoader />;
            </CardLayout>
        );
    }

    if (data === undefined) {
        return (
            <CardLayout viewStyle={viewStyle}>
                <ImageTemplate
                    src={customCoverTemplate}
                    alt={artist}
                    viewStyle={viewStyle}
                />
                <Flex direction="column" mt="4">
                    <Heading as="h3" fontSize="lg" mt="3" fontWeight="600">
                        {title}
                    </Heading>
                    <Heading
                        as="h2"
                        fontSize="lg"
                        color="gray.700"
                        fontWeight="light"
                        mt="1"
                    >
                        <Box>{artist}</Box>
                    </Heading>
                </Flex>
            </CardLayout>
        );
    }

    return (
        <CardLayout viewStyle={viewStyle}>
            {data?.album ? (
                <ImageTemplate
                    src={
                        isTemplateImage(data?.album?.image[2]["#text"]) ||
                        data?.album?.image[2]["#text"] === ""
                            ? customCoverTemplate
                            : data?.album?.image[2]["#text"]
                    }
                    alt={data?.name}
                    viewStyle={viewStyle}
                />
            ) : (
                <ImageTemplate
                    src={customCoverTemplate}
                    alt={data?.name}
                    viewStyle={viewStyle}
                />
            )}
            <Flex direction="column" mt="4" flexGrow={2}>
                <Heading as="h3" fontSize="lg" mt="3" fontWeight="600">
                    <LinkOverlay href={data?.url}>{data?.name}</LinkOverlay>
                </Heading>
                <Heading
                    as="h2"
                    fontSize="lg"
                    color="gray.700"
                    fontWeight="light"
                    mt="1"
                >
                    <Box as="a" href={data?.artist.url}>
                        {data?.artist.name}
                    </Box>
                </Heading>
                {/* {data?.duration && (
                <Box mt="2">{timeFormatter(Number(data?.duration))}</Box>
            )} */}
                <Stats
                    playcount={data?.playcount}
                    listeners={data?.listeners}
                />
                {viewStyle === ViewStyle.List && data?.wiki && (
                    <Box
                        as="a"
                        href={parsingWikiContent(data?.wiki.summary).href}
                    >
                        <Heading as="h4" fontSize="lg">
                            Track Wiki:
                        </Heading>
                        <Text maxWidth="80ch">
                            {parsingWikiContent(data?.wiki.summary).text}
                        </Text>
                    </Box>
                )}
                <Tags tag={data?.toptags.tag} />
            </Flex>
        </CardLayout>
    );
};

export default SongCard;
