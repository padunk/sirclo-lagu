import { LinkBox } from "@chakra-ui/react";
import React from "react";
import { ViewStyle } from "../core/MainDisplay";
import CardErrorBoundary from "./CardErrorBoundary";

interface Props {
    children: React.ReactNode;
    viewStyle: ViewStyle;
}

const CardLayout = (props: Props) => {
    return (
        <CardErrorBoundary>
            <LinkBox
                as="div"
                d="flex"
                flexDirection={
                    props.viewStyle === ViewStyle.Grid ? "column" : "row"
                }
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
