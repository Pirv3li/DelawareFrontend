import React, { useEffect, useState } from 'react';
import { Box, Text, Flex, Button, Heading } from "@chakra-ui/react";
import { getById } from '../../../api/index.js';
import { ArrowLeftIcon } from '@chakra-ui/icons'

function MeerInfo({ idProduct }) {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const productData = await getById(`producten/${idProduct}`);
            setProduct(productData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <Box>
            {product && (
                <Flex direction="row" alignItems="flex-start">
                    <Box>
                        <img
                            src={product.foto}
                            alt="Foto kon niet laden"
                            style={{
                                width: '250px',
                                height: '250px',
                                objectFit: 'contain'
                            }}
                        />
                        <Button 
                            width="100%"
                            leftIcon={<ArrowLeftIcon />}
                            
                            variant='outline'
                            onClick={() => window.location.reload()}
                        >
                            
                        </Button>
                    </Box>
                    <Box ml={4} mt={4}>
                        <Flex>
                            <Heading ml={2}>{product.naam}</Heading>
                        </Flex>
                        <Flex>
                            <Text color="blue.500">btw:</Text>
                            <Text ml={2}>{product.btwtarief}</Text>
                        </Flex>
                        <Flex>
                            <Text color="blue.500">Eenheidsprijs:</Text>
                            <Text ml={2}>{product.eenheidsprijs}</Text>
                        </Flex>
                        <Button>
                            Kopen
                        </Button>
                    </Box>
                </Flex>
            )}
        </Box>
    )
}

export default MeerInfo;