import React, { useEffect, useState } from 'react';
import { Box, Text, Flex, Button, Heading } from "@chakra-ui/react";
import { getById } from '../../../api/index.js';
import { ArrowLeftIcon } from '@chakra-ui/icons'
import { useNavigate } from "react-router-dom";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

function ProductInfo({ }) {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const id = sessionStorage.getItem('idProduct');
            // sessionStorage.removeItem('idProduct');
            const productData = await getById(`producten/${id}`);
            setProduct(productData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const navigate = useNavigate();




    return (
        <Box>
            {product && (
                <Flex direction="row" alignItems="flex-start">
                    <Box ml={7} mr={7} mt={7}>
                        <img
                            src={product.foto}
                            alt="Foto kon niet laden"
                            style={{
                                width: '500px',
                                height: '500px',
                                objectFit: 'contain'
                            }}

                        />

                    </Box>
                    <Box width="1px" bg="red.300" minHeight="600px" mt={7} />
                    <Box ml={4} mt={50}>
                        <Flex>
                            <Heading ml={9} size={"3xl"}>{product.naam}</Heading>
                        </Flex>
                        <Text fontSize={25} mt={5} mb={5}>{product.beschrijving}</Text>
                        <Table variant="striped" colorScheme='blue'>
                            <Tbody>
                                <Tr>
                                    <Td>Aantal</Td>
                                    <Td>{product.aantal}</Td>
                                </Tr>
                                <Tr>
                                    <Td>Gewicht</Td>
                                    <Td>{product.gewicht} KG</Td>
                                </Tr>
                                <Tr>
                                    <Td>btw</Td>
                                    <Td>% {product.btwtarief}</Td>
                                </Tr>
                                <Tr>
                                    <Td>Eenheidsprijs</Td>
                                    <Td>€ {product.eenheidsprijs.toFixed(2)}</Td>
                                </Tr>
                            </Tbody>
                        </Table>
                        <Button width={"100%"} bg={"cyan"}>
                            Kopen
                        </Button>
                    </Box>
                </Flex>
            )}
        </Box>
    )
}

export default ProductInfo;