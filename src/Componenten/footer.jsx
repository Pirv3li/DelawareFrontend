import { Box} from '@chakra-ui/react';
import { useFooterStyles } from "./useThemaFooter";
import { useColorMode } from '@chakra-ui/react';

import React from 'react';
import { Flex, Link as ChakraLink, IconButton, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

import { useNavbarStyles } from './useThemaNavbar';

const Footer = () => {

    const { colorMode, toggleColorMode } = useColorMode();
    const { bgColor, color, hoverColor } = useNavbarStyles();

    return (
        <Flex as="footer" bgColor={bgColor} color={color} width="100vw" justifyContent="space-between" alignItems="center" position="fixed" bottom="0">
    <Box role="contentinfo" mx="auto" maxW="7xl" py="4" px={{ base: '4', md: '8' }}>
        <Text fontSize="sm">
            &copy; {new Date().getFullYear()} Delaware. All rights reserved.
            <ChakraLink href="#" ml="4" _hover={{ color: hoverColor }} textDecoration="underline">
                Privacy Policy
            </ChakraLink>
        </Text>
    </Box>
</Flex>

    );
};

export default Footer;