import {
    Box,
    Flex,
    Input,
    InputGroup,
    InputLeftElement,
    Select,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { BsFillGrid3X3GapFill, BsListUl, BsSearch } from "react-icons/bs";
import { ShowBy } from "../../types";
import SearchModal from "../utils/SearchModal";

interface Props {
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    searchTerms: string;
    setSearchTerms: Dispatch<SetStateAction<string>>;
    setShowBy: Dispatch<React.SetStateAction<ShowBy | null>>;
}

const ListMenu = ({
    onChange,
    searchTerms,
    setSearchTerms,
    setShowBy,
}: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
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
            top="0"
            position="sticky"
            zIndex="modal"
        >
            <Flex alignItems="center" flexBasis="350px">
                <Text pr="4">Show by</Text>
                <Select placeholder="Select option" w="40" onChange={onChange}>
                    <option value={ShowBy.Track}>Top Track</option>
                    <option value={ShowBy.Artist}>Top Artist</option>
                </Select>
            </Flex>

            <InputGroup mx="6" onClick={onOpen} cursor="pointer">
                <InputLeftElement
                    pointerEvents="none"
                    children={<BsSearch />}
                />
                <Input
                    type="text"
                    placeholder="Search artist or song name"
                    pointerEvents="none"
                    defaultValue={searchTerms}
                    readOnly
                />
            </InputGroup>

            <SearchModal
                isOpen={isOpen}
                onClose={onClose}
                setSearchTerms={setSearchTerms}
                setShowBy={setShowBy}
            />

            <Flex alignItems="center">
                <BsFillGrid3X3GapFill />
                <BsListUl />
            </Flex>
        </Flex>
    );
};

export default ListMenu;
