import React from 'react';
import { Flex, Link as ChakraLink, IconButton, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useColorMode } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

import { useAuth } from './contexts/Auth.contexts';
import { useNavbarStyles } from './useThemaNavbar';

const Navbar = () => {
    const { isAuthed, logOut } = useAuth();
    const { colorMode, toggleColorMode } = useColorMode();
    const { bgColor, color, hoverColor } = useNavbarStyles();

    const handleLogout = () => {
        logOut();
    };


    return (
        <Flex as="nav" p={4} bgColor={bgColor} color={color} width="100vw" justifyContent="space-between" alignItems="center">

            <ChakraLink as={RouterLink} to="/" mx={2} _hover={{ color: hoverColor }}>
                <img src="https://www.the5thconference.com/wp-content/uploads/2019/08/Logo_delaware_FullColor_whitetext_digital.png" alt="" style={{ maxWidth: '50%' }} />
            </ChakraLink>

            <Flex as="nav" p={4} bgColor={bgColor} color={color} width="100vw" justifyContent="space-between" alignItems="flex-end" flexWrap="nowrap">


                {isAuthed ? (
                    <>
                        <Flex ml="auto">
                            <ChakraLink as={RouterLink} to="/bestellingen" ml={5} _hover={{ color: hoverColor }} fontSize='2xl'>
                                Bestellingen
                            </ChakraLink>
                            <ChakraLink as={RouterLink} to="/profiel" ml={5} _hover={{ color: hoverColor }} fontSize='2xl'>
                                Profiel
                            </ChakraLink>
                            <ChakraLink as={RouterLink} onClick={handleLogout} ml={5} _hover={{ color: hoverColor }} fontSize={"2xl"}>
                                Log uit
                            </ChakraLink>
                        </Flex>
                    </>
                ) : (

                    <ChakraLink as={RouterLink} to="/login" ml={300} _hover={{ color: hoverColor }} fontSize='2xl'>
                        Login
                    </ChakraLink>
                )}
                <IconButton
                    aria-label="Toggle color mode"
                    icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                    onClick={toggleColorMode}
                    ml="auto"
                />
            </Flex>
        </Flex>
    );
};

export default Navbar;