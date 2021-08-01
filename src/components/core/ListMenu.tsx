import { Box, Flex, Select, Text } from "@chakra-ui/react";
import React, { ChangeEvent } from "react";
import { BsFillGrid3X3GapFill, BsListUl } from "react-icons/bs";
import { ShowBy } from "../../types";

interface Props {
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const ListMenu = ({ onChange }: Props) => {
    return (
        <Flex
            alignItems="center"
            justifyContent="space-between"
            py="1"
            px="4"
            shadow="md"
            mx="8"
            mt="4"
            border="1px"
            borderColor="gray.100"
            bg="white"
        >
            <Flex alignItems="center">
                <Text pr="4">Show by</Text>
                <Select placeholder="Select option" w="40" onChange={onChange}>
                    <option value={ShowBy.Track}>Top Track</option>
                    <option value={ShowBy.Artist}>Top Artist</option>
                </Select>
            </Flex>

            <Flex alignItems="center">
                <BsFillGrid3X3GapFill />
                <BsListUl />
            </Flex>
        </Flex>
    );
};

export default ListMenu;
