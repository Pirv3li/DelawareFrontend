import { Text, VStack, Wrap, WrapItem, Button, useColorModeValue, Box } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { getAll } from '../../../api/index.js'

import ProductenList from './productenList.jsx';


 function Producten() {
  return (
    <VStack spacing={4} align="stretch">
      <ProductenList/>
      
    </VStack>
  );
}


export default Producten;

