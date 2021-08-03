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
import React, {
    ChangeEvent,
    Dispatch,
    SetStateAction,
    useContext,
} from "react";
import { BsFillGrid3X3GapFill, BsListUl, BsSearch } from "react-icons/bs";
import { ListLoading, LoadingContext } from "../../context/LoadingContext";
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
    const { isLoading } = useContext(LoadingContext) as ListLoading;
    console.log("isLoading :>> ", isLoading);
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
                    onChange={onChange}
                    select-name="show-by"
                    title="show-by"
                    disabled={isLoading}
                    placeholder="Track or Artist"
                >
                    <option value={ShowBy.Track}>Top Track</option>
                    <option value={ShowBy.Artist}>Top Artist</option>
                </Select>
            </Flex>

            <InputGroup
                mx="6"
                onClick={onOpen}
                cursor="pointer"
                as="button"
                disabled={isLoading}
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

            {/* <Flex alignItems="center">
                <BsFillGrid3X3GapFill />
                <BsListUl />
            </Flex> */}
        </Flex>
    );
};

export default ListMenu;
