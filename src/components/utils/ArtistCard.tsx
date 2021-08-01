import {
    Box,
    Button,
    Flex,
    Heading,
    Image,
    LinkBox,
    LinkOverlay,
    Text,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { ArtistInfo } from "../../types";
import SimilarArtist from "./SimilarArtist";
import DoorDashFavorite from "./SongCardLoader";
import Stats from "./Stats";
import Tags from "./Tags";
import { BiPlus, BiMinus } from "react-icons/bi";
import { useState } from "react";

interface Props {
    artist: string;
}

const ArtistCard = ({ artist }: Props) => {
    const [expandSimilarArtist, setexpandSimilarArtist] = useState(false);

    const getArtistInfo = async () => {
        let result: { data: { artist: ArtistInfo } };
        try {
            result = await axios.get(
                `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodeURI(
                    artist
                )}&api_key=${import.meta.env.VITE_LAST_FM_API_KEY}&format=json`
            );
        } catch (error) {
            throw new Error("problem getting artist info");
        }
        return result.data.artist;
    };

    const { isIdle, data } = useQuery<ArtistInfo, Error>(
        ["artistInfo", artist],
        getArtistInfo
    );

    if (isIdle) {
        return <DoorDashFavorite />;
    }

    return (
        <LinkBox
            as="div"
            display="flex"
            flexDirection="column"
            p="8"
            shadow="lg"
            border="1px"
            borderColor="gray.50"
            maxW="270px"
            bg="white"
            m="auto"
        >
            <Box display="flex" justifyContent="center" alignItems="center">
                <Image src={data?.image[2]["#text"]} />
            </Box>
            <Flex direction="column" mt="4">
                <LinkOverlay href={data?.url}>
                    <Heading as="h2" fontSize="xl" fontWeight="600">
                        {data?.name}
                    </Heading>
                </LinkOverlay>
                <Stats
                    playcount={data?.stats.playcount}
                    listeners={data?.stats.listeners}
                />
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

                {expandSimilarArtist && (
                    <SimilarArtist artist={data?.similar.artist!} />
                )}
            </Flex>
        </LinkBox>
    );
};

export default ArtistCard;
