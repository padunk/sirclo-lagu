import { Avatar, Box, Tag, TagLabel } from "@chakra-ui/react";
import React from "react";
import { isTemplateImage } from "../../helpers/utils";
import { ArtistSimilar } from "../../types";

interface Props {
    artist: ArtistSimilar[];
}

const customTemplateURL = "/assets/images/undraw_mello_otq1.svg";

const SimilarArtist = ({ artist }: Props) => {
    return (
        <>
            {artist.map((artis) => {
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
                                        ? customTemplateURL
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
