import { Box, Text } from "@chakra-ui/react";
import React from "react";

interface Props {
    message: string;
}

const NoResult = ({ message }: Props) => {
    return (
        <Box
            w="full"
            h="full"
            display="flex"
            justifyContent="center"
            mt="8"
            mb="8"
        >
            <Text
                color="red.500"
                fontWeight="600"
                fontSize="large"
                textTransform="uppercase"
            >
                {message}
            </Text>
        </Box>
    );
};

export default NoResult;
