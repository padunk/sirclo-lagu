import React from "react";
import {
    Box,
    Button,
    Flex,
    Heading,
    Image,
    LinkOverlay,
    Text,
} from "@chakra-ui/react";
import { ViewStyle } from "../core/MainDisplay";

interface Props {
    alt: string;
    src: string;
    viewStyle: ViewStyle;
}

const ImageTemplate = ({ alt, src, viewStyle }: Props) => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexGrow={0}
            flexShrink={0}
            flexBasis="250px"
            mr={viewStyle === ViewStyle.List ? "24px" : "0"}
        >
            <Image src={src} alt={alt} />
        </Box>
    );
};

export default ImageTemplate;
