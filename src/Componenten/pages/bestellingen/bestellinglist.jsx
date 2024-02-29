import { Table, Thead, Tbody, Tr, Th, Td, Button, Heading, Box } from "@chakra-ui/react";
import React, { useState, useEffect } from 'react';
import { getById } from '../../../api/index.js'

import { useNavigate } from "react-router-dom";

function BestellingList() {

    const [items, setItems] = useState([]);


    const navigate = useNavigate();

    const handleClick = (id) => {
        console.log(`Row with id ${id} was clicked.`);
        sessionStorage.setItem('idOrder', id);
        navigate(`/bestellingInfo`);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            if (localStorage.getItem('roles') == 'leverancier') {
                console.log('leverancier')
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
                <Table variant="striped" colorScheme="orange" mt={10} mb={5}>
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

                            <Tr key={item.idOrder} onClick={() => handleClick(item.idOrder)}>
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


            <Table variant="striped" colorScheme="teal">
                <Thead>
                    <Tr>
                        <Th>OrderID</Th>
                        <Th>Date</Th>
                        <Th>Date</Th>
                        <Th>More Info</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {items.map((item) => (
                        <Tr key={item.idOrder}>
                            <Td>
                                {item.idOrder}
                            </Td>
                            <Td>{item.datum}</Td>
                            <Td>{item.naam}</Td>

                            <Td>
                                <Button onClick={() => handleClick(item.idProduct)}>
                                    Meer info
                                </Button>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        );
    }
}

export default BestellingList;