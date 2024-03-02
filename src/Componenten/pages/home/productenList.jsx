import {
  Text,
  VStack,
  Wrap,
  WrapItem,
  Button,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { getAll } from "../../../api/index.js";
import { useTheme } from "../../useThema.jsx";
import { Link } from "react-router-dom";
import MeerInfo from "./productInfo.jsx";
import CustomBox from "../themas/chakraBox.jsx";
import { useNavigate } from "react-router-dom";

function ProductenList() {
  const { boxbgColor, bgColor, textColor, buttonColor, buttonHoverColor } =
    useTheme();
  const [items, setItems] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showList, setShowList] = useState(true); // Add this line
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const items = await getAll("producten/");
      setItems(items);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const filteredItems = items.filter((item) =>
    item.naam.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClick = (selectedProductId) => {
    sessionStorage.setItem("idProduct", selectedProductId);
    navigate(`/productinfo`);
  };

  const navigate = useNavigate();

  return (
    <VStack spacing={5} height="">
      <Text fontSize="xl" fontWeight="bold" paddingTop="15" color={textColor}>
        Producten
      </Text>
      {showList && (
        <>
          <Input
            placeholder="Zoek producten op naam"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Wrap spacing={4} justify="flex-wrap" overflow="none">
            {filteredItems.map((item) => (
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
                      width: "250px",
                      height: "250px",
                      objectFit: "contain",
                    }}
                  />
                  <Text fontSize={45} color={textColor} textAlign={"center"}>
                    {" "}
                    {item.naam}
                  </Text>
                  <Text color={textColor} ml={3}>
                    prijs: € {item.eenheidsprijs.toFixed(2)}
                  </Text>
                  <Button
                    onClick={() => handleClick(item.idProduct)}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                    }}
                    mt={5}
                  >
                    Bestellen
                  </Button>
                </CustomBox>
              </WrapItem>
            ))}
          </Wrap>
        </>
      )}
    </VStack>
  );
}

export default ProductenList;
