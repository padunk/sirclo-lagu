import { Flex, Text } from "@chakra-ui/react";
import React from "react";

interface Props {
    message: string;
}

const ErrorCard = ({ message }: Props) => {
    return (
        <Flex
            justifyContent="center"
            alignItems="center"
            p="8"
            shadow="lg"
            border="1px"
            borderColor="gray.50"
            minW="270px"
            w="full"
            h="full"
            bg="white"
        >
            <Text color="red" fontSize="large">
                {message}
            </Text>
        </Flex>
    );
};

export default ErrorCard;
