import { Box, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import Search from "../utils/Search";

interface Props {}

const MainHeader = (props: Props) => {
    return (
        <Flex
            as="header"
            h="16"
            px="4"
            py="8"
            bg="orange.300"
            justify="space-between"
            alignItems="center"
            shadow="md"
        >
            <Heading as="h1">LAGU.FM</Heading>
            <Box>
                <Search />
            </Box>
        </Flex>
    );
};

export default MainHeader;
