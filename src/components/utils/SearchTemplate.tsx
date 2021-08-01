import { Box, Text } from "@chakra-ui/react";
import React from "react";

interface Props {}

const SearchTemplate = (props: Props) => {
    return (
        <Box w="full" h="full" display="flex" justifyContent="center" mt="8">
            <Text fontSize="lg" fontWeight="600">
                Try search for{" "}
                <Text as="span" color="pink.400">
                    Pink Floyd{" "}
                </Text>
                or{" "}
                <Text as="span" color="orange.400">
                    Believe
                </Text>
            </Text>
        </Box>
    );
};

export default SearchTemplate;
