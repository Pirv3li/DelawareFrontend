



import React, { useEffect, useState } from 'react';
import { Box, Text, Flex, Button, Table, Thead, Tbody, Tr, Th, Td, Image } from "@chakra-ui/react";
import { getById } from '../../../api/index.js';
import { ArrowLeftIcon } from '@chakra-ui/icons'
import { useColorModeValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function BestellingInfoPagina() {
    const [order, setOrder] = useState(null);
    const [adres, setAdres] = useState(null);
    const [orderDetails, setOrderDetails] = useState(null);
    const hoverColor = useColorModeValue("gray.400", "gray.700");

    const navigate = useNavigate();


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const idOrder = sessionStorage.getItem('idOrder');
            const order = await getById(`order/${idOrder}`);
            const adres = await getById(`adres/${order.idAdres}`);
            let orderDetails = await getById(`orderdetails/order/${idOrder}`);
            // sessionStorage.removeItem('idOrder');
            setOrder(order);
            setAdres(adres);
            setOrderDetails(orderDetails);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const handleClick = (id) => {
        sessionStorage.setItem('idProduct', id);
        navigate(`/productinfo`);
    }


    if (localStorage.getItem('roles') == 'klant') {
        return (

            <Flex direction="row" mb={50}>
                <Flex direction="column">


                    <Box>
                        <Table colorScheme="Gray 500" mt={10} mb={5}>
                            <Thead>
                                <Tr>

                                    <Th>foto</Th>
                                    <Th>naam</Th>
                                    <Th>stukprijs</Th>
                                    <Th>btw</Th>
                                    <Th>aantal</Th>
                                    <Th>prijs</Th>

                                </Tr>
                            </Thead>
                            <Tbody>
                                {orderDetails && orderDetails.map((item) => (

                                    <Tr key={item.idOrderDetails} onClick={() => handleClick(item.idOrderDetails)} borderBottom="1px solid" borderColor="gray.200" _hover={{ bg: hoverColor }}>
                                        <Td>
                                            <Image src={item.foto} alt="Product" maxHeight="200px" maxWidth="200px" />
                                        </Td>
                                        <Td>{item.naam}</Td>
                                        <Td>€ {item.eenheidsprijs}</Td>
                                        <Td>€ {((item.btwtarief / 100) * item.eenheidsprijs)}</Td>

                                        <Td>{item.aantal}</Td>

                                        <Td>€ {((((item.btwtarief / 100) * item.eenheidsprijs) + item.eenheidsprijs) * item.aantal).toFixed(2)}</Td>
                                    </Tr>
                                ))}
                                <Tr>
                                    <Th></Th>
                                    <Th></Th>
                                    <Th></Th>
                                    <Th></Th>
                                    <Th></Th>
                                    <Th>
                                        <b style={{ fontSize: '2em' }}>
                                        € {orderDetails && orderDetails.reduce((total, item) => total + (((item.btwtarief / 100) * item.eenheidsprijs) + item.eenheidsprijs) * item.aantal, 0).toFixed(2)}
                                        </b>                                    
                                    </Th>
                                </Tr>

                            </Tbody>

                        </Table>




                    </Box>
                </Flex>

                <Box width="1px" bg="red.300" minHeight="400px" mt={70} ml={30} />

                <Box mt={20} ml={25}>

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
                    

                    <Text fontSize='3xl' >
                        <b>Order</b>
                    </Text>
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
                    <Box ml={5}>
                        <Table colorScheme="Gray 500" mt={10} mb={5}>
                            <Thead>
                                <Tr>

                                    <Th>foto</Th>
                                    <Th>naam</Th>
                                    <Th>stukprijs</Th>
                                    <Th>btw</Th>
                                    <Th>aantal</Th>
                                    <Th>prijs</Th>

                                </Tr>
                            </Thead>
                            <Tbody>
                                {orderDetails && orderDetails.map((item) => (

                                    <Tr key={item.idOrderDetails} onClick={() => handleClick(item.idOrderDetails)} borderBottom="1px solid" borderColor="gray.200" _hover={{ bg: hoverColor }}>
                                        <Td>
                                            <Image src={item.foto} alt="Product" maxHeight="200px" maxWidth="200px" />
                                        </Td>
                                        <Td>{item.naam}</Td>
                                        <Td>€ {item.eenheidsprijs}</Td>
                                        <Td>€ {((item.btwtarief / 100) * item.eenheidsprijs)}</Td>

                                        <Td>{item.aantal}</Td>

                                        <Td>€ {((((item.btwtarief / 100) * item.eenheidsprijs) + item.eenheidsprijs) * item.aantal).toFixed(2)}</Td>
                                    </Tr>
                                ))}
                                <Tr>
                                    <Th></Th>
                                    <Th></Th>
                                    <Th></Th>
                                    <Th></Th>
                                    <Th></Th>
                                    <Th>
                                        <b style={{ fontSize: '2em' }}>
                                            € {orderDetails && orderDetails.reduce((total, item) => total + (((item.btwtarief / 100) * item.eenheidsprijs) + item.eenheidsprijs) * item.aantal, 0).toFixed(2)}
                                        </b>                                    </Th>
                                </Tr>

                            </Tbody>

                        </Table>


                    </Box>
                    <Box>
                        <Text>
                            <b>{orderDetails && orderDetails.eenheidsprijs}</b>
                        </Text>
                    </Box>
                </Flex>
                <Box width="1px" bg="red.300" minHeight="400px" mt={70} ml={30} />
                <Box mt={20} ml={25}>
                    <Text fontSize='3xl' >
                        <b>Adres</b>
                    </Text>
                    <Text mt={2}>
                        Stad: <b> {adres && adres.stad}</b>
                    </Text >
                    <Text mt={2}>
                        Straat: <b>{adres && adres.straat}</b>
                    </Text>
                    <Text mt={2}> 
                        nummer: <b>{adres && adres.nummer}</b>
                    </Text>

                    <Text fontSize='3xl' mt={50}>
                        <b>Order</b>
                    </Text>
                    <Text mt={2}>Order nummer: <b>{order && order.idOrder}</b></Text>
                    <Text mt={2}>Datum: <b>{order && new Date(order.datum).toLocaleDateString('en-GB')}</b></Text>
                    <Text mt={2}>Order Status: <b>{order && order.orderStatus}</b></Text>
                    {order && order.orderStatus != "geleverd" && <Button bg="green"> verander levering status</Button>}
                    <Text mt={2}>Order Status: <b>{order && order.betalingStatus}</b></Text>
                    {order && order.betalingStatus != "betaald" && <Button bg="green"> verander betaling status</Button>}
                </Box>
            </Flex>
        )
    }
}

export default BestellingInfoPagina;