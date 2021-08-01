import {
    Button,
    Input,
    InputGroup,
    InputRightElement,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";
import { ShowBy } from "../../types";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    setSearchTerms: Dispatch<SetStateAction<string>>;
    setShowBy: Dispatch<React.SetStateAction<ShowBy | null>>;
}

const SearchModal = ({ isOpen, onClose, setSearchTerms, setShowBy }: Props) => {
    // TODO: should be FocusableElement?
    const searchInputRef = useRef<any>();

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            initialFocusRef={searchInputRef}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalBody py="4">
                    <InputGroup>
                        <Input
                            ref={searchInputRef}
                            type="text"
                            placeholder="Search artist or song name"
                            fontSize="lg"
                        />
                        <InputRightElement
                            children={
                                <Button
                                    onClick={() => {
                                        setSearchTerms(
                                            searchInputRef.current.value
                                                .trim()
                                                .toLowerCase()
                                        );
                                        setShowBy(null);
                                        onClose();
                                    }}
                                    rightIcon={<BsSearch color="teal" />}
                                ></Button>
                            }
                        />
                    </InputGroup>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default SearchModal;
