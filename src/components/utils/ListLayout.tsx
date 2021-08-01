import { SimpleGrid, Skeleton } from "@chakra-ui/react";
import React from "react";

interface Props {
    children: React.ReactNode;
    isLoaded: boolean;
}

const ListLayout = (props: Props) => {
    return (
        <SimpleGrid minChildWidth="250px" spacing="10" p="8" w="full">
            {props.children}
        </SimpleGrid>
    );
};

export default ListLayout;
