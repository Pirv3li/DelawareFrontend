import { Box, useTheme } from "@chakra-ui/react";
import { useFooterStyles } from "./useThemaFooter";
import { useColorMode } from "@chakra-ui/react";

import React from "react";
import {
  Flex,
  Link as ChakraLink,
  IconButton,
  Text,
  Image,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

import { useNavbarStyles } from "./useThemaNavbar";

const Footer = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { bgColor, color, hoverColor } = useNavbarStyles();
  const theme = useTheme();

  return (
    <Box>
      <Flex
        as="footer"
        bgColor={bgColor}
        color={color}
        width="100vw"
        justifyContent="space-between"
        alignItems="center"
        mt={5}
        pb={theme.space[4]}
      >
        <Box
          role="contentinfo"
          mx="auto"
          maxW="7xl"
          py="4"
          px={{ base: "4", md: "8" }}
        >
          <Flex align="center" justifyContent={"center"} fontSize="sm">
            <Text>&copy; {new Date().getFullYear()}</Text>
            <Image
              src="https://www.the5thconference.com/wp-content/uploads/2019/08/Logo_delaware_FullColor_whitetext_digital.png"
              alt=""
              maxW="10%"
              ml="2"
            />
            <Text>All rights reserved.</Text>
            <ChakraLink
              href="#"
              ml="4"
              _hover={{ color: hoverColor }}
              textDecoration="underline"
            >
              Privacy Policy
            </ChakraLink>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Footer;
