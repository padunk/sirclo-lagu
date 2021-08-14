import {
    Box,
    Button,
    Flex,
    Heading,
    Image,
    LinkOverlay,
    Text,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { ArtistInfo } from "../../types";
import SimilarArtist from "./SimilarArtist";
import Stats from "./Stats";
import Tags from "./Tags";
import { BiPlus, BiMinus } from "react-icons/bi";
import { useState } from "react";
import { customAvatarTemplate, isTemplateImage } from "../../helpers/utils";
import CardLayout from "./CardLayout";
import CardLoader from "./CardLoader";
import ErrorCard from "./ErrorCard";
import { ViewStyle } from "../core/MainDisplay";

interface Props {
    artist: string;
    viewStyle: ViewStyle;
}

const ArtistCard = ({ artist, viewStyle }: Props) => {
    const [expandSimilarArtist, setexpandSimilarArtist] = useState(false);

    const getArtistInfo = async () => {
        let result: { data: { artist: ArtistInfo } };
        try {
            result = await axios.get(
                `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodeURI(
                    artist
                )}&api_key=${process.env.VITE_LAST_FM_API_KEY}&format=json`
            );
        } catch (error) {
            throw new Error("problem getting artist info");
        }
        return result.data.artist;
    };

    const { isError, isLoading, data, error } = useQuery<ArtistInfo, Error>(
        ["artistInfo", artist],
        getArtistInfo,
        { useErrorBoundary: true }
    );

    if (isLoading) {
        return (
            <CardLayout viewStyle={viewStyle}>
                <CardLoader />
            </CardLayout>
        );
    }

    if (data === undefined) {
        return (
            <CardLayout viewStyle={viewStyle}>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    mr={viewStyle === ViewStyle.List ? "24px" : "0"}
                >
                    <Image src={customAvatarTemplate} />
                </Box>
                <Flex direction="column" mt="4">
                    <Heading
                        as="h2"
                        fontSize="xl"
                        fontWeight="600"
                        data-testid="artist-name"
                    >
                        {artist}
                    </Heading>
                </Flex>
            </CardLayout>
        );
    }

    return (
        <CardLayout viewStyle={viewStyle}>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                mr={viewStyle === ViewStyle.List ? "24px" : "0"}
            >
                {data.image[2]["#text"] === "" ? (
                    <Image src={customAvatarTemplate} />
                ) : (
                    <Image
                        src={
                            isTemplateImage(data?.image[2]["#text"])
                                ? customAvatarTemplate
                                : data?.image[2]["#text"]
                        }
                    />
                )}
            </Box>
            <Flex direction="column" mt="4">
                <LinkOverlay href={data?.url}>
                    <Heading
                        as="h2"
                        fontSize="xl"
                        fontWeight="600"
                        data-testid="artist-name"
                    >
                        {data?.name}
                    </Heading>
                </LinkOverlay>
                <Stats
                    playcount={data?.stats.playcount}
                    listeners={data?.stats.listeners}
                />
                {viewStyle === ViewStyle.List && (
                    <Text>{data?.bio.summary}</Text>
                )}
                <Tags tag={data?.tags.tag} />

                <Button
                    mt="2"
                    size="xs"
                    colorScheme="purple"
                    onClick={() => setexpandSimilarArtist(!expandSimilarArtist)}
                    rightIcon={expandSimilarArtist ? <BiMinus /> : <BiPlus />}
                    variant="outline"
                >
                    Similar Artists:
                </Button>

                {expandSimilarArtist && data?.similar.artist && (
                    <SimilarArtist
                        artist={data?.similar.artist}
                        viewStyle={viewStyle}
                    />
                )}
            </Flex>
        </CardLayout>
    );
};

export default ArtistCard;
