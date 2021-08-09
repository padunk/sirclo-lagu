import {
    Box,
    Flex,
    FormLabel,
    Input,
    InputGroup,
    InputLeftElement,
    Select,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import React, { Dispatch, useContext } from "react";
import { useEffect } from "react";
import { BsFillGrid3X3GapFill, BsListUl, BsSearch } from "react-icons/bs";
import { QueryObserver, useQueryClient } from "react-query";
import {
    FetchStatusContext,
    FetchStatusValue,
} from "../../context/LoadingContext";
import { QueryMethod } from "../../types";
import SearchModal from "../utils/SearchModal";

interface Props {
    listBy: string;
    setListBy: Dispatch<React.SetStateAction<string>>;
}

const ListMenu = ({ listBy, setListBy }: Props) => {
    const { globalStatus } = useContext<FetchStatusValue>(FetchStatusContext);
    const isDisabled = !globalStatus.every((stat) => stat === "success");

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
                <FormLabel pr="4" htmlFor="show-by">
                    Show by
                </FormLabel>
                <Select
                    id="show-by"
                    w="40"
                    onChange={(e) => setListBy(e.target.value)}
                    select-name="show-by"
                    title="show-by"
                    placeholder="Track or Artist"
                    disabled={isDisabled}
                    defaultValue={
                        listBy !== QueryMethod.byArtist &&
                        listBy !== QueryMethod.byTrack
                            ? undefined
                            : listBy
                    }
                >
                    <option value={QueryMethod.byArtist}>Top Artist</option>
                    <option value={QueryMethod.byTrack}>Top Track</option>
                </Select>
            </Flex>

            <InputGroup
                mx="6"
                onClick={onOpen}
                cursor="pointer"
                as="button"
                disabled={isDisabled}
            >
                <InputLeftElement
                    pointerEvents="none"
                    children={<BsSearch />}
                />
                <FormLabel hidden htmlFor="search">
                    Search
                </FormLabel>
                <Input
                    id="search"
                    type="search"
                    placeholder="Search artist or song name"
                    pointerEvents="none"
                    defaultValue={
                        listBy === QueryMethod.byArtist ||
                        listBy === QueryMethod.byTrack
                            ? ""
                            : listBy
                    }
                    readOnly
                />
            </InputGroup>

            <SearchModal
                isOpen={isOpen}
                onClose={onClose}
                setListBy={setListBy}
            />

            {/* <Flex alignItems="center">
                <BsFillGrid3X3GapFill />
                <BsListUl />
            </Flex> */}
        </Flex>
    );
};

export default ListMenu;
