import {
    Box,
    Flex,
    Heading,
    Image,
    LinkBox,
    LinkOverlay,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { TrackInfo } from "../../types";
import DoorDashFavorite from "./SongCardLoader";
import Stats from "./Stats";
import Tags from "./Tags";
import { customCoverTemplate, isTemplateImage } from "../../helpers/utils";
import CardLayout from "./CardLayout";

interface Props {
    artist: string;
    title: string;
}

const SongCard = ({ artist, title }: Props) => {
    const getTrackInfo = async () => {
        let result: { data: { track: TrackInfo } };
        try {
            result = await axios.get(
                `http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${
                    import.meta.env.VITE_LAST_FM_API_KEY
                }&artist=${encodeURI(artist)}&track=${encodeURI(
                    title
                )}&format=json`
            );
        } catch (error) {
            throw new Error("problem getting track info");
        }
        return result.data.track;
    };

    const { isIdle, data } = useQuery<TrackInfo, Error>(
        ["trackInfo", artist, title],
        getTrackInfo
    );

    if (isIdle) {
        return <DoorDashFavorite />;
    }

    return (
        <CardLayout>
            {/* {JSON.stringify(data, null, 2)} */}
            {data?.album ? (
                <Image
                    src={
                        isTemplateImage(data?.album?.image[2]["#text"])
                            ? customCoverTemplate
                            : data?.album?.image[2]["#text"]
                    }
                    alt={data?.name}
                />
            ) : (
                <Box d="flex" justifyContent="center" alignItems="center">
                    <Image
                        src={customCoverTemplate}
                        alt={data?.name}
                        w="174px"
                        h="174px"
                    />
                </Box>
            )}
            <Flex direction="column" mt="4">
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
                <Tags tag={data?.toptags.tag} />
            </Flex>
        </CardLayout>
    );
};

export default SongCard;
