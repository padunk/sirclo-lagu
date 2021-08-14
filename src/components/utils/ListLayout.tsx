import { Heading, SimpleGrid } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";
import { Attributes } from "../../types";
import { ViewStyle } from "../core/MainDisplay";
import PaginationBar from "./PaginationBar";

interface Props {
    children: React.ReactNode;
    isPreviousData: boolean;
    pagination: Attributes;
    setPagination: Dispatch<SetStateAction<Attributes>>;
    status: string;
    title: string;
    viewStyle: ViewStyle;
}

const ListLayout = ({
    children,
    isPreviousData,
    pagination,
    setPagination,
    status,
    title,
    viewStyle,
}: Props) => {
    return (
        <SimpleGrid
            minChildWidth={viewStyle === ViewStyle.Grid ? "250px" : "unset"}
            columns={viewStyle === ViewStyle.Grid ? undefined : 1}
            spacing="10"
            p="8"
            w="full"
        >
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
