import { Avatar, Box, Tag, TagLabel } from "@chakra-ui/react";
import React from "react";
import { customAvatarTemplate, isTemplateImage } from "../../helpers/utils";
import { ArtistSimilar } from "../../types";
import { ViewStyle } from "../core/MainDisplay";

interface Props {
    artist: ArtistSimilar[];
    viewStyle: ViewStyle;
}

const SimilarArtist = ({ artist, viewStyle }: Props) => {
    return (
        <Box display={viewStyle === ViewStyle.Grid ? "block" : "flex"} mt="4">
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
        </Box>
    );
};

export default SimilarArtist;
