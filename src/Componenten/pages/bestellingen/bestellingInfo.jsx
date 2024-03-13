



import React, { useEffect, useState, useRef } from 'react';
import { Box, Text, Flex, Button, Table, Thead, Tbody, Tr, Th, Td, Image } from "@chakra-ui/react";
import { getById } from '../../../api/index.js';
import { useColorModeValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from 'react-to-print';
import styled from '@emotion/styled';

import './BestellingInfoPagina.css';

function BestellingInfoPagina() {
    const [order, setOrder] = useState(null);
    const [adres, setAdres] = useState(null);
    const [orderDetails, setOrderDetails] = useState(null);
    const hoverColor = useColorModeValue("gray.400", "gray.700");

    const navigate = useNavigate();


    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });


    const PrintButton = styled(Button)`
  @media print {
    display: none;
  }
`;



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
            <div ref={componentRef}>
                <Flex direction="column" >
                    <Flex direction="row" >
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
                        </Box>
                        <Box ml={750} alignSelf={"right"} mr={50}>
                            <Text fontSize='3xl' mt={20} ml={25} mr={25}>
                                <b>Order</b>
                            </Text>
                            <Text mt={2}>Order nummer: <b>{order && order.idOrder}</b></Text>
                            <Text mt={2}>Datum: <b>{order && new Date(order.datum).toLocaleDateString('en-GB')}</b></Text>
                            <Text mt={2}>Order Status: <b>{order && order.orderStatus}</b></Text>
                            <Text mt={2}>Betaling Status: <b>{order && (order.betalingStatus === 1 ? "Betaald" : "Niet Betaald")}</b></Text>
                            {order && order.betalingStatus != "1" && <PrintButton bg="green" mt={5} w={300}> betalen</PrintButton>}                        </Box>
                    </Flex>
    
                    <Box ml={5} mt={5}>
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
                <Button onClick={handlePrint}>Print this page</Button>
            </div>
        )
    }
        

    

    if (localStorage.getItem('roles') == 'leverancier') {
        return (
            <div ref={componentRef}>
                <Flex direction="column" >
                    <Flex direction="row" >
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
                        </Box>
                        <Box ml={750} alignSelf={"right"} mr={50}>
                            <Text fontSize='3xl' mt={20} ml={25} mr={25}>
                                <b>Order</b>
                            </Text>
                            <Text mt={2}>Order nummer: <b>{order && order.idOrder}</b></Text>
                            <Text mt={2}>Datum: <b>{order && new Date(order.datum).toLocaleDateString('en-GB')}</b></Text>
                            <Text mt={2}>Order Status: <b>{order && order.orderStatus}</b></Text>

                            {order && order.orderStatus != "geleverd" &&
                                <PrintButton bg="green">
                                    verander levering status
                                </PrintButton>
                            }
                            <Text mt={2}>Betaling Status: <b>{order && (order.betalingStatus === 1 ? "Betaald" : "Niet Betaald")}</b></Text>
                           
                        </Box>
                    </Flex>

                        <Box ml={5} mt={5}>
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
                <Button onClick={handlePrint} bg={"red"} w={"350"}>PDF</Button>
            </div>
        )
    }
}

export default BestellingInfoPagina;