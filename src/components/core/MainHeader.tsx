import { Box, Flex, Heading } from "@chakra-ui/react";
import React from "react";

interface Props {}

const MainHeader = (props: Props) => {
    return (
        <Flex
            as="header"
            h="16"
            px="4"
            py="8"
            bgGradient="linear(to-br, purple.300, pink.500)"
            justify="space-between"
            alignItems="center"
            shadow="md"
        >
            <Heading
                as="h1"
                bgGradient="linear(to-r, #5e00ff,#b80a42)"
                _hover={{
                    bgGradient: "linear(to-r, #04ab52, #5e00ff)",
                }}
                bgClip="text"
                fontWeight="extrabold"
            >
                LAGU.FM
            </Heading>
        </Flex>
    );
};

export default MainHeader;
