import React from 'react';
import { Flex, Link as ChakraLink, IconButton } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useColorMode } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

import { useAuth } from './contexts/Auth.contexts';

const Navbar = () => {
    //const { isAuthed } = useAuth();
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Flex as="nav" p={4} bgColor="red.500" color="white" width="100vw">
            <ChakraLink as={RouterLink} to="/bestellingen" mx={2}>
                Bestellingen
            </ChakraLink>
            <ChakraLink as={RouterLink} to="/profiel" mx={2}>
                Profiel
            </ChakraLink>
            <ChakraLink as={RouterLink} to="/login" mx={2}>
                Login
            </ChakraLink>
            <IconButton
                aria-label="Toggle color mode"
                icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                onClick={toggleColorMode}
                ml="auto"
            />
        </Flex>
    );
};

export default Navbar;