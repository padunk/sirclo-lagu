import {
    Button,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
} from "@chakra-ui/react";
import React, { Dispatch, FormEvent, SetStateAction } from "react";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    setListBy: Dispatch<SetStateAction<string>>;
}

const SearchModal = ({ isOpen, onClose, setListBy }: Props) => {
    // TODO: should be FocusableElement?
    const searchInputRef = useRef<any>();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // @ts-ignore
        let value: string = e.target.elements["search-modal"].value;
        setListBy(value.trim().toLowerCase());
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            initialFocusRef={searchInputRef}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalBody py="4">
                    <form onSubmit={handleSubmit}>
                        <InputGroup>
                            <FormLabel htmlFor="search-modal" hidden>
                                Search
                            </FormLabel>
                            <Input
                                id="search-modal"
                                name="search-modal"
                                ref={searchInputRef}
                                type="search"
                                placeholder="Search artist or song name"
                                fontSize="lg"
                                data-testid="search-modal"
                            />
                            <InputRightElement
                                children={
                                    <Button
                                        type="submit"
                                        rightIcon={<BsSearch color="teal" />}
                                        data-testid="search-submit"
                                    ></Button>
                                }
                            />
                        </InputGroup>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default SearchModal;
