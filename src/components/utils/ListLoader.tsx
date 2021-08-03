import { Flex } from "@chakra-ui/react";
import React from "react";
import { range } from "../../helpers/utils";
import CardLoader from "./CardLoader";
import ListLayout from "./ListLayout";

interface Props {}

const ListLoader = (props: Props) => (
    <ListLayout>
        {range(0, 7, 1).map((_, i) => {
            return (
                <Flex
                    key={i}
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
                    data-testid="list-loader"
                >
                    <CardLoader />
                </Flex>
            );
        })}
    </ListLayout>
);

export default ListLoader;
