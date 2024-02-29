



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


    if (localStorage.getItem('roles') == 'klant') {
        return (

            <Flex direction="row" mb={50}>
                <Flex direction="column">
                    <Box mt={50} ml={5}>
                        <Text fontSize='3xl' >
                            <b>Adres</b>
                        </Text>
                        <Text mt={5}>
                            Stad: <b> {adres && adres.stad}</b>
                        </Text>
                        <Text>
                            Straat: <b>{adres && adres.straat}</b>
                        </Text>
                        <Text>
                            nummer: <b>{adres && adres.nummer}</b>
                        </Text>
                    </Box>

                    <Box>

                        <Text>
                            <b>{orderDetails && orderDetails.eenheidsprijs}</b>
                        </Text>
                    </Box>
                </Flex>

                <Box width="1px" bg="red.300" minHeight="400px" mt={70} ml={30} />

                <Box mt={140} ml={25}>
                    <Text mt={15}>Order nummer: <b>{order && order.idOrder}</b></Text>
                    <Text mt={15}>Datum: <b>{order && new Date(order.datum).toLocaleDateString('en-GB')}</b></Text>
                    <Text mt={15}>Order Status: <b>{order && order.orderStatus}</b></Text>
                    <Text mt={15}>Betaling status: <b>{order && order.betalingStatus}</b></Text>


                    {order && order.betalingStatus != "betaald" && <Button bg="green" mt={100} w={300}> betalen</Button>}
                </Box>
            </Flex>
        )
    }

    if (localStorage.getItem('roles') == 'leverancier') {
        return (

            <Flex direction="row" mb={50}>
                <Flex direction="column">
                    <Box mt={50} ml={5}>
                        <Text fontSize='3xl' >
                            <b>Adres</b>
                        </Text>
                        <Text mt={5}>
                            Stad: <b> {adres && adres.stad}</b>
                        </Text>
                        <Text>
                            Straat: <b>{adres && adres.straat}</b>
                        </Text>
                        <Text>
                            nummer: <b>{adres && adres.nummer}</b>
                        </Text>
                    </Box>

                    <Box>

                        <Text>
                            <b>{orderDetails && orderDetails.eenheidsprijs}</b>
                        </Text>
                    </Box>
                </Flex>

                <Box width="1px" bg="red.300" minHeight="400px" mt={70} ml={30} />

                <Box mt={140} ml={25}>
                    <Text mt={15}>Order nummer: <b>{order && order.idOrder}</b></Text>
                    <Text mt={15}>Datum: <b>{order && new Date(order.datum).toLocaleDateString('en-GB')}</b></Text>
                    <Text mt={15}>Order Status: <b>{order && order.orderStatus}</b></Text>
                    {order && order.orderStatus != "geleverd" && <Button bg="green"> verander levering status</Button>}
                    <Text mt={15}>Order Status: <b>{order && order.betalingStatus}</b></Text>
                    {order && order.betalingStatus != "betaald" && <Button bg="green"> verander betaling status</Button>}
                </Box>
            </Flex>
        )
    }
}

export default BestellingInfoPagina;