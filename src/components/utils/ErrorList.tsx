import { Flex, Text } from "@chakra-ui/react";
import React from "react";

interface Props {
    message: string | undefined;
}

const ErrorList = ({ message }: Props) => {
    return (
        <Flex
            justifyContent="center"
            alignItems="center"
            direction="column"
            textAlign="center"
            flexGrow={1}
            color="blue.500"
        >
            <Text
                fontSize="large"
                fontWeight="600"
                textTransform="uppercase"
                mb="4"
            >
                {message}
            </Text>
            <Text>🙄 Please try again later!</Text>
        </Flex>
    );
};

export default ErrorList;
