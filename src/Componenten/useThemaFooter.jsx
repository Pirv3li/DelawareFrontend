import { useColorModeValue } from "@chakra-ui/react";

export const useFooterStyles = () => {
  const bgColor = useColorModeValue("red.500", "blue.500");
  const color = useColorModeValue("white", "gray.800");
  const hoverColor = useColorModeValue("yellow.500", "purple.700");

  return { bgColor, color, hoverColor };
};
