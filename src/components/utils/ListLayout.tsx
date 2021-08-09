import { Heading, SimpleGrid } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";
import { Attributes } from "../../types";
import PaginationBar from "./PaginationBar";

interface Props {
    children: React.ReactNode;
    isPreviousData: boolean;
    pagination: Attributes;
    setPagination: Dispatch<SetStateAction<Attributes>>;
    status: string;
    title: string;
}

const ListLayout = ({
    children,
    isPreviousData,
    pagination,
    setPagination,
    status,
    title,
}: Props) => {
    return (
        <SimpleGrid minChildWidth="250px" spacing="10" p="8" w="full">
            <Heading
                as="h2"
                pl={8}
                fontSize="2xl"
                style={{ gridColumn: "1/-1" }}
            >
                {title}
            </Heading>
            {children}
            <PaginationBar
                isPreviousData={isPreviousData}
                pagination={pagination}
                setPagination={setPagination}
                status={status}
            />
        </SimpleGrid>
    );
};

export default ListLayout;
