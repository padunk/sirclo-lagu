import { Badge, Box } from "@chakra-ui/react";
import React from "react";
import { Tag } from "../../types";

interface Props {
    tag: Tag[] | undefined | Tag;
}

const Tags = ({ tag }: Props) => {
    if (tag === undefined) {
        return "";
    }
    // if only one tag
    if (!Array.isArray(tag) && typeof tag === "object") {
        return (
            <Box d="flex" flexWrap="wrap" w="full" mt="2">
                <Box as="a" href={tag.url} key={tag.name} mr="1">
                    <Badge px="2" colorScheme="pink" borderRadius="full">
                        {tag.name}
                    </Badge>
                </Box>
            </Box>
        );
    }
    return (
        <Box d="flex" flexWrap="wrap" w="full" mt="2">
            {tag?.map((t) => {
                return (
                    <Box as="a" href={t.url} key={t.name} mr="1">
                        <Badge px="2" colorScheme="pink" borderRadius="full">
                            {t.name}
                        </Badge>
                    </Box>
                );
            })}
        </Box>
    );
};

export default Tags;
