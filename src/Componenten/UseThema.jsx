import { useColorModeValue } from "@chakra-ui/react";

export const useTheme = () => {
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("black", "white");
  const buttonColor = useColorModeValue("blue.500", "blue.200");
  const buttonHoverColor = useColorModeValue("blue.600", "blue.300");

  return { bgColor, textColor, buttonColor, buttonHoverColor };
};
