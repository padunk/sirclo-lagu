import { Skeleton, SkeletonText, VStack } from "@chakra-ui/react";
import React from "react";

interface Props {}

const CardLoader = (props: Props) => (
    <VStack w="full">
        <Skeleton w="174px" h="174px" m="auto" />
        <SkeletonText noOfLines={6} spacing="2" mt="4" w="full" />
    </VStack>
);

export default CardLoader;
