import { Button, ButtonGroup, Flex } from "@chakra-ui/react";
import React, { SetStateAction, Dispatch, MouseEvent } from "react";
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";
import { Attributes } from "../../types";
import { range } from "../../helpers/utils";

interface Props {
    pagination: Attributes;
    setPagination: Dispatch<SetStateAction<Attributes>>;
}

const PaginationBar = ({ pagination, setPagination }: Props) => {
    const page = Number(pagination.page);
    const handlePrevious = () => {
        setPagination((prevState) => {
            return {
                ...prevState,
                page: String(Math.max(Number(prevState.page) - 1, 1)),
            };
        });
    };

    const handleNext = () => {
        setPagination((prevState) => {
            return {
                ...prevState,
                page: String(
                    Math.min(
                        Number(prevState.page) + 1,
                        Number(prevState.totalPages)
                    )
                ),
            };
        });
    };

    const handlePage = (
        e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
    ) => {
        setPagination((prevState) => {
            return {
                ...prevState,
                page: e.currentTarget.textContent!,
            };
        });
    };
    return (
        <Flex
            justifyContent="center"
            alignItems="center"
            w="full"
            style={{ gridColumn: "1/-1" }}
        >
            <ButtonGroup variant="solid" colorScheme="blue">
                {page !== 1 && (
                    <Button onClick={handlePrevious}>
                        <BsChevronDoubleLeft />
                    </Button>
                )}
                {range(page, page + 8, 1).map((p, i) => {
                    return (
                        <Button key={p} disabled={i === 0} onClick={handlePage}>
                            {p}
                        </Button>
                    );
                })}
                {page <= 1_000_000 && page <= Number(pagination.totalPages) && (
                    <Button onClick={handleNext}>
                        <BsChevronDoubleRight />
                    </Button>
                )}
            </ButtonGroup>
        </Flex>
    );
};

export default PaginationBar;
