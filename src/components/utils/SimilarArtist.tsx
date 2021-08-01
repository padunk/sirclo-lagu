import { Avatar, Box, Tag, TagLabel } from "@chakra-ui/react";
import React from "react";
import { customAvatarTemplate, isTemplateImage } from "../../helpers/utils";
import { ArtistSimilar } from "../../types";

interface Props {
    artist: ArtistSimilar[];
}

const SimilarArtist = ({ artist }: Props) => {
    console.log(artist);
    return (
        <>
            {artist &&
                artist.map((artis) => {
                    return (
                        <Box as="a" href={artis.url} key={artis.name}>
                            <Tag
                                size="lg"
                                colorScheme="blue"
                                borderRadius="full"
                                m="1"
                            >
                                <Avatar
                                    src={
                                        isTemplateImage(artis.image[2]["#text"])
                                            ? customAvatarTemplate
                                            : artis.image[2]["#text"]
                                    }
                                    size="xs"
                                    name={artis.name}
                                    ml={-1}
                                    mr={2}
                                />
                                <TagLabel>{artis.name}</TagLabel>
                            </Tag>
                        </Box>
                    );
                })}
        </>
    );
};

export default SimilarArtist;
