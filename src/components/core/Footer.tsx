import React from "react";
import { Box, Flex, Link, Text } from "@chakra-ui/react";
import {
    RiGithubFill,
    RiCodepenFill,
    RiLinkedinFill,
    RiTwitterFill,
} from "react-icons/ri";

interface Props {}

export const myLinks = [
    {
        icon: <RiGithubFill />,
        name: "github",
        url: "https://github.com/padunk",
    },
    {
        icon: <RiCodepenFill />,
        name: "codepen",
        url: "https://codepen.io/padunk",
    },
    {
        icon: <RiLinkedinFill />,
        name: "linkedin",
        url: "https://linkedin.com/in/anakagung",
    },
    {
        icon: <RiTwitterFill />,
        name: "twitter",
        url: "https://twitter.com/anakagungcorp",
    },
];

const Footer = (props: Props) => {
    return (
        <Flex
            h="70px"
            justifyContent="space-around"
            alignItems="center"
            py="4"
            bgGradient="linear(to-tl, purple.700, pink.500)"
        >
            <Text fontSize="larger" color="whiteAlpha.800">
                Made with 💛 by{" "}
                <Link href="https://anakagung.com">Abraham A. Agung</Link>
            </Text>

            <Flex display="flex" mt="2">
                {myLinks.map((link) => {
                    return (
                        <Link
                            href={link.url}
                            isExternal
                            key={link.name}
                            fontSize="32px"
                            color={`${link.name}.400`}
                            pr="2"
                            data-testid={link.name}
                        >
                            {link.icon}
                        </Link>
                    );
                })}
            </Flex>
        </Flex>
    );
};

export default Footer;
