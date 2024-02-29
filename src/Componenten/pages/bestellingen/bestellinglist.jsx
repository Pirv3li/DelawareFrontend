import { Table, Thead, Tbody, Tr, Th, Td, Button, Heading, Box } from "@chakra-ui/react";
import React, { useState, useEffect } from 'react';
import { getById } from '../../../api/index.js'
import { useColorModeValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function BestellingList() {
    const hoverColor = useColorModeValue("gray.400", "gray.700");

    const [items, setItems] = useState([]);


    const navigate = useNavigate();

    const handleClick = (id) => {
        sessionStorage.setItem('idOrder', id);
        navigate(`/bestellingInfo`);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            if (localStorage.getItem('roles') == 'leverancier') {
                const idLeverancier = localStorage.getItem('idLeverancier')
                const response = await getById(`order/leverancier/${idLeverancier}`);
                setItems(response.items);
            }
            if (localStorage.getItem('roles') == 'klant') {
                console.log('klant')
                const idKlant = localStorage.getItem('idKlant')
                const response = await getById(`order/klant/${idKlant}`);
                setItems(response.items);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    if (localStorage.getItem('roles') == 'leverancier') {
        return (
            <Box>
                <Heading textAlign="center" mt={2}>Bestellingen</Heading>
                <Table colorScheme="Gray 500"  mt={10} mb={5}>
                    <Thead>
                        <Tr>
                            <Th>OrderID</Th>
                            <Th>Datum</Th>
                            <Th>Bedrag</Th>
                            <Th>Order Status</Th>
                            <Th>Betaling Status</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {items.map((item) => (

                            <Tr key={item.idOrder} onClick={() => handleClick(item.idOrder)} borderBottom="1px solid" borderColor="gray.200" _hover={{ bg: hoverColor }}>
                                <Td>{item.idOrder}</Td>
                                <Td>{new Date(item.datum).toLocaleDateString('en-GB')}</Td>
                                <Td>€ {item.totaalPrijs}</Td>
                                <Td>{item.orderStatus}</Td>
                                <Td>{item.betalingStatus}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
        );
    }
    if (localStorage.getItem('roles') == 'klant') {
        return (
            <Box>
                <Heading textAlign="center" mt={2}>Bestellingen</Heading>
                <Table colorScheme="Gray 500"  mt={10} mb={5}>
                    <Thead>
                        <Tr>
                            <Th>OrderID</Th>
                            <Th>Datum</Th>
                            <Th>Bedrag</Th>
                            <Th>Order Status</Th>
                            <Th>Betaling Status</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {items.map((item) => (

                            <Tr key={item.idOrder} onClick={() => handleClick(item.idOrder)} borderBottom="1px solid" borderColor="gray.200" _hover={{ bg: hoverColor }}>
                                <Td>{item.idOrder}</Td>
                                <Td>{new Date(item.datum).toLocaleDateString('en-GB')}</Td>
                                <Td>€ {item.totaalPrijs}</Td>
                                <Td>{item.orderStatus}</Td>
                                <Td>{item.betalingStatus}</Td>
                                
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
        );
    }
}

export default BestellingList;