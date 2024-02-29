import { Text, VStack, Wrap, WrapItem, Button, useColorModeValue } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { getAll } from '../../../api/index.js'
import { useTheme } from '../../useThema.jsx';
import { Link } from 'react-router-dom';
import MeerInfo from './meerInfo.jsx';
import CustomBox from '../themas/chakraBox.jsx';

function ProductenList() {
    const { boxbgColor, bgColor, textColor, buttonColor, buttonHoverColor } = useTheme();
    const [items, setItems] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [showList, setShowList] = useState(true); // Add this line

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const items = await getAll('producten/');
            setItems(items);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleClick = (id) => {
        setSelectedProductId(id);
        setShowList(false); 
    };

    return (
        <VStack spacing={5} height="">
            <Text fontSize="xl" fontWeight="bold" paddingTop="15" color={textColor}>
                Producten
            </Text>
            {showList && ( 
                <Wrap spacing={4} justify="flex-wrap" overflow="none">
                    {items.map((item) => (
                        <WrapItem key={item.idProduct}>
                            <CustomBox
                                bgColor={boxbgColor}
                                maxWidth="250px"
                                maxHeight="250px"
                                minWidth="250px"
                                minHeight="250px"
                            >
                                <img
                                    src={item.foto}
                                    alt="Description of the image"
                                    style={{
                                        width: '250px',
                                        height: '250px',
                                        objectFit: 'contain'
                                    }}
                                />
                                <Text color={textColor}> {item.naam}</Text>
                                <Text color={textColor}>
                                    Prijs incl BTW {item.eenheidsprijs * (1 + item.btwtarief / 100)}
                                </Text>
                                <Button onClick={() => handleClick(item.idProduct)}>
                                    Meer info
                                </Button>
                            </CustomBox>
                        </WrapItem>
                    ))}
                </Wrap>
            )} 
            {selectedProductId && <MeerInfo idProduct={selectedProductId} />}
        </VStack>
    );
}

export default ProductenList;