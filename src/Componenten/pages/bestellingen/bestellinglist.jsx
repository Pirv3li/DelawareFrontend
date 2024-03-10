import { Table, Thead, Tbody, Tr, Th, Td, Heading, Box, Button } from "@chakra-ui/react";
import React, { useState, useEffect } from 'react';
import { getById, setAuthToken } from '../../../api/index.js'
import { useColorModeValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

function BestellingList() {
    const hoverColor = useColorModeValue("gray.400", "gray.700");

    const [items, setItems] = useState([]);
    const [begin, setBegin] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);

    const navigate = useNavigate();

    const handleClick = (id) => {
        sessionStorage.setItem('idOrder', id);
        navigate(`/bestellingInfo`);
    }

    useEffect(() => {
        setAuthToken(localStorage.getItem("jwtToken"));
        fetchData();
    }, [begin]);

    const fetchData = async () => {
        try {
            if (localStorage.getItem('roles') == 'leverancier') {
                const response = await getById(`order/leverancier/${begin}`);
                setItems(response.items);
                setTotalOrders(response.total);

            }
            if (localStorage.getItem('roles') == 'klant') {
                const response = await getById(`order/klant/${begin}`);
                setItems(response.items);
                setTotalOrders(response.total);

            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const incrementBegin = () => {
        setBegin(prevBegin => prevBegin + 10);
    };

    const decrementBegin = () => {
        setBegin(prevBegin => prevBegin - 10);
    };


    if (localStorage.getItem('roles') == 'leverancier') {
        return (
            <Box mb={5}>
                <Heading textAlign="center" mt={2}>Bestellingen</Heading>
                <Table colorScheme="Gray 500" mt={10} mb={5}>
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
                <Box>
                    <Box>
                        {begin > 0 && <Button leftIcon={<ArrowBackIcon />} onClick={decrementBegin} float="left" />}
                        <Button rightIcon={<ArrowForwardIcon />} onClick={incrementBegin} float="right" isDisabled={10 != totalOrders} />
                    </Box>
                </Box>


            </Box >
        );
    }
    if (localStorage.getItem('roles') == 'klant') {
        return (
            <Box>
                <Heading textAlign="center" mt={2}>Bestellingen</Heading>
                <Table colorScheme="Gray 500" mt={10} mb={5}>
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
                <Box>
                    <Box>
                        {begin > 0 && <Button leftIcon={<ArrowBackIcon />} onClick={decrementBegin} float="left" />}
                        <Button rightIcon={<ArrowForwardIcon />} onClick={incrementBegin} float="right" isDisabled={begin >= totalOrders} />
                    </Box>
                </Box>
            </Box>

        );
    }
}

export default BestellingList;