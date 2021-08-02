import { Skeleton, SkeletonText } from "@chakra-ui/react";
import React from "react";

interface Props {}

const CardLoader = (props: Props) => (
    <>
        <Skeleton w="174px" h="174px" m="auto" />
        <SkeletonText noOfLines={6} spacing={2} mt="4" />
    </>
);

export default CardLoader;
