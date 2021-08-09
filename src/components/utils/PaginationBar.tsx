import { Button, ButtonGroup, Flex } from "@chakra-ui/react";
import React, { SetStateAction, Dispatch, MouseEvent } from "react";
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";
import { Attributes } from "../../types";
import { range } from "../../helpers/utils";

interface Props {
    isPreviousData: boolean;
    pagination: Attributes;
    setPagination: Dispatch<SetStateAction<Attributes>>;
    status: string;
}

const PaginationBar = ({
    isPreviousData,
    pagination,
    setPagination,
    status,
}: Props) => {
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
                // @ts-ignore
                page: e.target.innerText,
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
                    <Button
                        onClick={handlePrevious}
                        disabled={isPreviousData || status === "loading"}
                    >
                        <BsChevronDoubleLeft />
                    </Button>
                )}
                {range(page, page + 8, 1).map((p, i) => {
                    if (i === 0) {
                        return (
                            <Button
                                key={p}
                                disabled={true}
                                onClick={handlePage}
                            >
                                {p}
                            </Button>
                        );
                    } else {
                        return (
                            <Button
                                key={p}
                                disabled={
                                    isPreviousData || status === "loading"
                                }
                                onClick={handlePage}
                            >
                                {p}
                            </Button>
                        );
                    }
                })}
                {page <= 1_000_000 && page <= Number(pagination.totalPages) && (
                    <Button
                        onClick={handleNext}
                        disabled={isPreviousData || status === "loading"}
                    >
                        <BsChevronDoubleRight />
                    </Button>
                )}
            </ButtonGroup>
        </Flex>
    );
};

export default PaginationBar;
