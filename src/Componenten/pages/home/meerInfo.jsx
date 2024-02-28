import React, { useEffect, useState } from 'react';
import { Box, Text, Flex, Button } from "@chakra-ui/react";
import { getById } from '../../../api/index.js';

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
                <Flex direction="row">
                    <img
                        src={product.foto}
                        alt="Foto kon niet laden"
                        style={{
                            width: '250px',
                            height: '250px',
                            objectFit: 'contain'
                        }}
                    />
                    <Box ml={4}>
                        <Flex>
                            <Text color="blue.500">naam</Text>
                            <Text ml={2}>{product.naam}</Text>
                        </Flex>
                        <Flex>
                            <Text color="blue.500">btw:</Text>
                            <Text ml={2}>{product.btwtarief}</Text>
                        </Flex>
                        <Flex>
                            <Text color="blue.500">Eenheidsprijs:</Text>
                            <Text ml={2}>{product.eenheidsprijs}</Text>
                        </Flex>
                        <Flex>
                            <Button colorScheme='teal' variant='outline'>
                                Terug
                            </Button>
                        </Flex>
                    </Box>
                </Flex>
            )}
        </Box>
    )
}

export default MeerInfo;