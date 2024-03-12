import {
  Text, VStack, Wrap, WrapItem, Button, Input, Checkbox, HStack, Box, Flex
} from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

import React, { useState, useEffect } from "react";
import { getAll, post } from "../../../api/index.js";
import { useTheme } from "../../useThema.jsx";
import { Link } from "react-router-dom";
import MeerInfo from "./productInfo.jsx";
import CustomBox from "../themas/chakraBox.jsx";
import { useNavigate } from "react-router-dom";


function ProductenList() {
  const {
    boxbgColor,
    bgColor,
    textColor,
    buttonColor,
    buttonHoverColor,
  } = useTheme();
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showList, setShowList] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [beginPagina, setBegin] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [body, setBody] = useState([])

  useEffect(() => {
    fetchData();
  }, [beginPagina, totalOrders]);

  const fetchData = async () => {
    try {
      let body = {
        begin: (beginPagina + 1),
      };
      setBody(body);
      const items = await post(`producten/begin`, { arg: body });
      const categories = await getAll("producten/categories");
      setItems(items);
      setCategories(categories);
      setTotalOrders(items.length);


    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const incrementBegin = () => {
    setBegin(beginPagina => beginPagina + 20);
    window.scrollTo(0, 20);

  };

  const decrementBegin = () => {
    setBegin(beginPagina => beginPagina - 20);
    window.scrollTo(0, 0);

  };

  const handleCategoryChange = (event) => {
    const category = event.target.name;
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const filteredItems = items.filter(
    (item) =>
      selectedCategories.length === 0 ||
      selectedCategories.includes(item.categorie)
  );

  const searchedItems = filteredItems.filter((item) =>
    item.naam.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedItems = searchedItems.sort((a, b) => {
    const aIsSelected = selectedCategories.includes(a.categorie);
    const bIsSelected = selectedCategories.includes(b.categorie);

    if (aIsSelected && !bIsSelected) {
      return -1;
    } else if (!aIsSelected && bIsSelected) {
      return 1;
    } else {
      return 0;
    }
  });

  const handleClick = (selectedProductId) => {
    sessionStorage.setItem("idProduct", selectedProductId);
    navigate(`/productinfo`);
  };

  const navigate = useNavigate();

  return (
    <VStack spacing={5} minHeight={"200%"} align={"center"} marginX={20}>      
    <Text fontSize="xl" fontWeight="bold" paddingTop="15" color={textColor}>
      Producten
    </Text>
      {showList && (
        <>
          <Input
            placeholder="Zoek producten op naam"
            value={searchTerm}
            height={35}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <HStack spacing={5}>
            {categories.map((category) => (
              <Checkbox
                key={category}
                name={category}
                onChange={handleCategoryChange}
              >
                {category}
              </Checkbox>
            ))}
          </HStack>
          <Wrap spacing={4} justify="flex-wrap" overflow="none">
            {sortedItems.map((item) => (
              <WrapItem key={item.idProduct}>
                <CustomBox
                  bgColor={boxbgColor}
                  width="300px"
                  height="400px"
                  overflow="hidden"
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
                  <Text
                    fontSize={30}
                    color={textColor}
                    textAlign={"center"}
                    maxWidth={250}
                    height={100}
                  >
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

      <Flex alignSelf={"end"} >
        {beginPagina > 0 && <Button leftIcon={<ArrowBackIcon />} onClick={decrementBegin} float="left"  mb={5000} w={"400px"} h={50} bg={"gray.500"}/>}
        <Button rightIcon={<ArrowForwardIcon />} onClick={incrementBegin} float="right" isDisabled={20 != totalOrders} mb={5000} w={"400px"} h={50} bg={"gray.500"}  ml={5}/>
      </Flex>

    </VStack>

  );
}

export default ProductenList;
