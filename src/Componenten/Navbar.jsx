import React, { useState, useEffect } from 'react';
import { Flex, Link as ChakraLink, IconButton, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useColorMode } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import { getById } from '../api/index.js';


import { useAuth } from './contexts/Auth.contexts';
import { useNavbarStyles } from './useThemaNavbar';

const Navbar = () => {
    const { isAuthed, logOut } = useAuth();
    const { colorMode, toggleColorMode } = useColorMode();
    const { bgColor, color, hoverColor } = useNavbarStyles();
    const [aantalOngeopend, setAantalOngeopend] = useState(0);
    const handleLogout = () => {
        logOut();
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        
        try {
            const roles = localStorage.getItem('roles');
            if (roles) {
                if (roles == 'klant') {
                    const idKlant = localStorage.getItem('idKlant')
    
                    const aantalOngeopend = await getById(`notificatie/ongeopend/klant/${idKlant}`);
                    setAantalOngeopend(aantalOngeopend[0].count);
                }
                if (roles == 'leverancier') {
    
                    const idLeverancier = localStorage.getItem('idLeverancier')
                    const aantalOngeopend = await getById(`notificatie/ongeopend/leverancier/${idLeverancier}`);
                    setAantalOngeopend(aantalOngeopend[0].count);
                }
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <Flex as="nav" p={4} bgColor={bgColor} color={color} width="100vw" justifyContent="space-between" alignItems="center">

            <ChakraLink as={RouterLink} to="/" mx={2} _hover={{ color: hoverColor }}>
                <img src="https://www.the5thconference.com/wp-content/uploads/2019/08/Logo_delaware_FullColor_whitetext_digital.png" alt="" style={{ maxWidth: '50%' }} />
            </ChakraLink>

            <Flex as="nav" bgColor={bgColor} color={color} width="100vw" justifyContent="space-between" alignItems="flex-end" flexWrap="nowrap">


                {isAuthed ? (
                    <>
                        <Flex ml="auto">
                            <ChakraLink as={RouterLink} to="/notificaties" ml={5} _hover={{ color: hoverColor }} fontSize={"2xl"}>
                                Notificatie
                                {aantalOngeopend > 0 &&
                                    <Text color="red" ml={2}>
                                        {aantalOngeopend}
                                    </Text>
                                }
                            </ChakraLink>
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