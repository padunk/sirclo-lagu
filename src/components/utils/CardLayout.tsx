import { LinkBox } from "@chakra-ui/react";
import React from "react";
import CardErrorBoundary from "./CardErrorBoundary";

interface Props {
    children: React.ReactNode;
}

const CardLayout = (props: Props) => {
    return (
        <CardErrorBoundary>
            <LinkBox
                as="div"
                d="flex"
                flexDirection="column"
                p="8"
                shadow="lg"
                border="1px"
                borderColor="gray.50"
                minW="270px"
                w="full"
                h="full"
                bg="white"
                m="auto"
                data-testid="card-layout"
            >
                {props.children}
            </LinkBox>
        </CardErrorBoundary>
    );
};

export default CardLayout;
