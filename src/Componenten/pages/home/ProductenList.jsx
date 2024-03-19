import {
  Text,
  VStack,
  Wrap,
  WrapItem,
  Button,
  Input,
  Checkbox,
  HStack,
  Box,
  Flex,
  Select,
  FormLabel,
} from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

import React, { useState, useEffect } from "react";
import { getAll, post } from "../../../api/index.js";
import { useTheme } from "../../UseThema.jsx";
import CustomBox from "../../ChakraBox.jsx";
import { useNavigate } from "react-router-dom";

function ProductenList() {
  const { boxbgColor, bgColor, textColor, buttonColor, buttonHoverColor } =
    useTheme();
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showList, setShowList] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [beginPagina, setBegin] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [body, setBody] = useState([]);
  const [actualSearchTerm, setActualSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
  };

  useEffect(() => {
    fetchData();
  }, [beginPagina, itemsPerPage]);

  const fetchData = async () => {
    try {
      let body = {
        begin: beginPagina + 1,
        aantal: itemsPerPage,
      };
      setBody(body);
      let items;
      let categories;
      if (sessionStorage.getItem("roles") === "leverancier") {
        items = await post(`producten/leverancier`, { arg: body });
        categories = await getAll("producten/leverancier/categories");
      } else {
        items = await post(`producten/begin`, { arg: body });
        categories = await getAll("producten/categories");
      }
      setItems(items);
      setCategories(categories);
      setTotalOrders(items.length);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = async () => {
    // If searchTerm is null or undefined, set it to an empty string
    const finalSearchTerm = searchTerm || "";
    setActualSearchTerm(finalSearchTerm);

    const body = {
      begin: 1,
      zoekterm: finalSearchTerm,
      aantal: itemsPerPage,
    };

    try {
      let response;
      if (sessionStorage.getItem("roles") === "leverancier") {
        response = await post(`producten/leverancier/zoekterm`, { arg: body });
      } else {
        response = await post(`producten/zoekterm`, { arg: body });
      }
      setItems(response);
      setTotalOrders(response.length);
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  const incrementBegin = async () => {
    let newBegin = beginPagina + itemsPerPage;

    setBegin(newBegin);
    window.scrollTo(0, 20);

    let response;
    if (selectedCategories.length > 0) {
      const body = {
        begin: newBegin + 1,
        categories: selectedCategories,
        aantal: itemsPerPage,
      };
      response = await post(`producten/zoekcategorie`, { arg: body });
    } else if (actualSearchTerm) {
      const body = {
        begin: newBegin + 1,
        zoekterm: actualSearchTerm,
        aantal: itemsPerPage,
      };
      response = await post(`producten/zoekterm`, { arg: body });
    } else {
      let body = {
        begin: newBegin + 1,
      };
      if (sessionStorage.getItem("roles") === "leverancier") {
        response = await post(`producten/leverancier`, { arg: body });
      } else {
        response = await post(`producten/begin`, { arg: body });
      }
    }
    setItems(response);
    setTotalOrders(response.length);
  };

  const decrementBegin = async () => {
    let newBegin = beginPagina - itemsPerPage;

    setBegin(newBegin);
    window.scrollTo(0, 0);

    let response;
    if (selectedCategories.length > 0) {
      const body = {
        begin: newBegin + 1,
        categories: selectedCategories,
        aantal: 20,
      };
      response = await post(`producten/zoekcategorie`, { arg: body });
    } else if (actualSearchTerm) {
      const body = {
        begin: newBegin + 1,
        zoekterm: actualSearchTerm,
        aantal: 20,
      };
      response = await post(`producten/zoekterm`, { arg: body });
    } else {
      let body = {
        begin: newBegin + 1,
      };
      if (sessionStorage.getItem("roles") === "leverancier") {
        response = await post(`producten/leverancier`, { arg: body });
      } else {
        response = await post(`producten/begin`, { arg: body });
      }
    }
    setItems(response);
    setTotalOrders(response.length);
  };

  const handleCategoryChange = async (event) => {
    const category = event.target.name;
    let updatedCategories;
    if (selectedCategories.includes(category)) {
      updatedCategories = selectedCategories.filter((c) => c !== category);
    } else {
      updatedCategories = [...selectedCategories, category];
    }
    setSelectedCategories(updatedCategories);

    try {
      let response;
      if (updatedCategories.length === 0) {
        // If no categories are selected, make the original API call
        let body = {
          begin: beginPagina + 1,
          aantal: itemsPerPage,
        };
        if (sessionStorage.getItem("roles") === "leverancier") {
          response = await post(`producten/leverancier`, { arg: body });
        } else {
          response = await post(`producten/begin`, { arg: body });
        }
      } else {
        // If categories are selected, make the category search API call
        const body = {
          begin: 1,
          categories: updatedCategories,
          aantal: itemsPerPage,
        };
        response = await post(`producten/zoekcategorie`, { arg: body });
      }
      setItems(response);
      setTotalOrders(response.length);
    } catch (error) {
      console.error("Error during category search:", error);
    }
  };

  const filteredItems = items.filter(
    (item) =>
      selectedCategories.length === 0 ||
      selectedCategories.includes(item.categorie)
  );

  // const searchedItems = filteredItems.filter((item) =>
  //   item.naam.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const sortedItems = filteredItems.sort((a, b) => {
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
    <VStack
      spacing={5}
      minHeight={"200%"}
      align={"center"}
      justify={"center"}
      marginX={20}
    >
      {" "}
      <Text fontSize="xl" fontWeight="bold" paddingTop="15" color={textColor}>
        {sessionStorage.getItem("roles") === "leverancier"
          ? "Mijn Producten"
          : "Producten"}
      </Text>
      {showList && (
        <>
          <Input
            placeholder="Zoek producten op naam"
            value={searchTerm}
            height={35}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button onClick={handleSearch}>Zoek</Button>

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
            <FormLabel>Aantal</FormLabel>
            <Select value={itemsPerPage} onChange={handleItemsPerPageChange}>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
            </Select>
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
                    {sessionStorage.getItem("roles") === "leverancier"
                      ? "Beheren"
                      : "Bestellen"}
                  </Button>
                </CustomBox>
              </WrapItem>
            ))}
          </Wrap>
        </>
      )}
      <Flex alignSelf={"end"}>
        {beginPagina > 0 && (
          <Button
            leftIcon={<ArrowBackIcon />}
            onClick={decrementBegin}
            float="left"
            w={"400px"}
            h={50}
            bg={"gray.500"}
          />
        )}
        <Button
          rightIcon={<ArrowForwardIcon />}
          onClick={incrementBegin}
          float="right"
          isDisabled={
            sessionStorage.getItem("roles") === "leverancier"
              ? 10 != totalOrders
              : 20 != totalOrders
          }
          w={"400px"}
          h={50}
          bg={"gray.500"}
          ml={5}
        />
      </Flex>
    </VStack>
  );
}

export default ProductenList;