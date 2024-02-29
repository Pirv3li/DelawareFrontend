import { useColorModeValue } from '@chakra-ui/react';

export const useNavbarStyles = () => {
    const bgColor = useColorModeValue('gray.600', 'gray.600');
    const color = useColorModeValue('white', 'white');
    const hoverColor = useColorModeValue('yellow.500', 'purple.300');

    return { bgColor, color, hoverColor };
};