import {
    Box,
    Stat,
    StatGroup,
    StatHelpText,
    StatLabel,
    StatNumber,
} from "@chakra-ui/react";
import React from "react";
import { numberFormatter } from "../../helpers/formatter";

interface Props {
    playcount: string | number | undefined;
    listeners: string | number | undefined;
}

const Stats = ({ playcount, listeners }: Props) => {
    return (
        <StatGroup mt="2">
            <Stat>
                <StatLabel color="purple.700">Playcount</StatLabel>
                <StatNumber fontSize="lg">
                    {numberFormatter(playcount).formattedNumber}
                    {numberFormatter(playcount).satuan}
                </StatNumber>
            </Stat>
            <Stat>
                <StatLabel color="purple.700">Listeners</StatLabel>
                <StatNumber fontSize="lg">
                    {numberFormatter(listeners).formattedNumber}
                    {numberFormatter(listeners).satuan}
                </StatNumber>
            </Stat>
        </StatGroup>
    );
};

export default Stats;
