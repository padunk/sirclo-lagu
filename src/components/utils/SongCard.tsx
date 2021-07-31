import {
    Badge,
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
import { numberFormatter, timeFormatter } from "../../helpers/formatter";
import { TrackInfo } from "../../types";
import DoorDashFavorite from "./SongCardLoader";
import { RiUserFollowLine, RiPlayCircleLine } from "react-icons/ri";

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
        <LinkBox
            as="div"
            d="flex"
            flexDirection="column"
            p="8"
            shadow="lg"
            border="1px"
            borderColor="gray.100"
            maxW="270px"
        >
            {/* {JSON.stringify(data, null, 2)} */}
            {data?.album ? (
                <Image src={data?.album?.image[2]["#text"]} alt={data?.name} />
            ) : (
                <Image
                    src="/assets/images/cover_template.jpg"
                    alt={data?.name}
                    w="174px"
                />
            )}
            <Heading as="h3" fontSize="lg" mt="3">
                <LinkOverlay href={data?.url}>{data?.name}</LinkOverlay>
            </Heading>
            <Heading
                as="h2"
                fontSize="lg"
                color="gray.600"
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
            <Box d="flex" justifyContent="space-between" mt="2">
                <Box as="span" fontSize="sm">
                    <RiPlayCircleLine />{" "}
                    {numberFormatter(Number(data?.playcount))}
                </Box>
                <Box as="span" fontSize="sm">
                    <RiUserFollowLine />{" "}
                    {numberFormatter(Number(data?.listeners))}
                </Box>
            </Box>
            <Box d="flex" flexWrap="wrap" w="full">
                {data?.toptags.tag.map((t) => {
                    return (
                        <Box as="a" href={t.url} key={t.name} mr="1">
                            <Badge
                                px="2"
                                colorScheme="pink"
                                borderRadius="full"
                            >
                                {t.name}
                            </Badge>
                        </Box>
                    );
                })}
            </Box>
        </LinkBox>
    );
};

export default SongCard;
