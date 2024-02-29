



import React, { useEffect, useState } from 'react';
import { Box, Text, Flex, Button, Heading } from "@chakra-ui/react";
import { getById } from '../../../api/index.js';
import { ArrowLeftIcon } from '@chakra-ui/icons'

function BestellingInfoPagina() {
    const [order, setOrder] = useState(null);
    const [adres, setAdres] = useState(null);
    const [orderDetails, setOrderDetails] = useState(null);


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const idOrder = sessionStorage.getItem('idOrder');
            const order = await getById(`order/${idOrder}`);
            const adres = await getById(`adres/${order.idAdres}`);
            const orderDetails = await getById(`orderdetails/${idOrder}`);
            // sessionStorage.removeItem('idOrder');
            setOrder(order);
            setAdres(adres);
            setOrderDetails(orderDetails);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <Flex direction="row" mb={50}>
            <Flex direction="column">
                <Box>
                    <Heading>Leveradres</Heading>
                    <Text>
                        Stad: {adres && adres.stad}
                    </Text>
                    <Text>
                        Straat: {adres && adres.straat}
                    </Text> 
                    <Text>
                        nummer: {adres && adres.nummer}
                    </Text>
                </Box>

                <Box>
                    <Text>
                        {order && order.idAdres}
                    </Text>
                    <Text>
                        "hallo"
                        {orderDetails && orderDetails.eenheidsprijs}
                    </Text>
                </Box>
            </Flex>
    
            <Box width="1px" bg="red.300" minHeight="400px" mt={70}/>
    
            <Box mt={45} ml={25}>
                <Text>{order && order.idOrder}</Text>
                <Text> {order && order.datum}</Text>
                <Text>{order && order.orderStatus}</Text>
                <Text>{order && order.betalingStatus}</Text>
            </Box>
        </Flex>
    )
}

export default BestellingInfoPagina;