import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
  Box,
  Button,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { post, setAuthToken } from "../../../api/index.js";
import { useColorModeValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

function BestellingList() {
  const hoverColor = useColorModeValue("gray.400", "gray.700");

  const [items, setItems] = useState([]);
  const [begin, setBegin] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [body, setBody] = useState([]);
  const navigate = useNavigate();

  const handleClick = (id) => {
    sessionStorage.setItem("idOrder", id);
    navigate(`/bestellingInfo`);
  };

  useEffect(() => {
    setAuthToken(localStorage.getItem("jwtToken"));

    fetchData();
  }, [begin, totalOrders]);

  const fetchData = async () => {
    try {
      let body = {
        begin: begin,
      };
      setBody(body);

      if (localStorage.getItem("roles") == "leverancier") {
        const response = await post(`order/leverancier`, body);
        setItems(response);
        setTotalOrders(response.length);
      }
      if (localStorage.getItem("roles") == "klant") {
        const response = await post(`order/klant`, body);
        setItems(response);
        setTotalOrders(response.length);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const incrementBegin = () => {
    setBegin((prevBegin) => prevBegin + 10);
  };

  const decrementBegin = () => {
    setBegin((prevBegin) => prevBegin - 10);
  };

  if (localStorage.getItem("roles") == "leverancier") {
    return (
      <Box mb={5}>
        <Heading textAlign="center" mt={2}>
          Bestellingen
        </Heading>
        <Table colorScheme="Gray 500" mt={10} mb={5}>
          <Thead>
            <Tr>
              <Th>OrderID</Th>
              <Th>Datum</Th>
              <Th>Bedrag</Th>
              <Th>Order Status</Th>
              <Th>Betaling Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {items.map((item) => (
              <Tr
                key={item.idOrder}
                onClick={() => handleClick(item.idOrder)}
                borderBottom="1px solid"
                borderColor="gray.200"
                _hover={{ bg: hoverColor }}
              >
                <Td>{item.idOrder}</Td>
                <Td>{new Date(item.datum).toLocaleDateString("en-GB")}</Td>
                <Td>€ {item.totaalPrijs}</Td>
                <Td>{item.orderStatus}</Td>
                <Td>
                  {item.betalingStatus === 1 ? "Betaald" : "Niet Betaald"}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Box>
          <Box>
            {begin > 0 && (
              <Button
                leftIcon={<ArrowBackIcon />}
                onClick={decrementBegin}
                float="left"
              />
            )}
            <Button
              rightIcon={<ArrowForwardIcon />}
              onClick={incrementBegin}
              float="right"
              isDisabled={10 != totalOrders}
            />
          </Box>
        </Box>
      </Box>
    );
  }
  console.log(totalOrders);
  if (localStorage.getItem("roles") == "klant") {
    return (
      <Box>
        <Heading textAlign="center" mt={2}>
          Bestellingen
        </Heading>
        <Table colorScheme="Gray 500" mt={10} mb={5}>
          <Thead>
            <Tr>
              <Th>OrderID</Th>
              <Th>Datum</Th>
              <Th>Bedrag</Th>
              <Th>Order Status</Th>
              <Th>Betaling Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {items.map((item) => (
              <Tr
                key={item.idOrder}
                onClick={() => handleClick(item.idOrder)}
                borderBottom="1px solid"
                borderColor="gray.200"
                _hover={{ bg: hoverColor }}
              >
                <Td>{item.idOrder}</Td>
                <Td>{new Date(item.datum).toLocaleDateString("en-GB")}</Td>
                <Td>€ {item.totaalPrijs}</Td>
                <Td>{item.orderStatus}</Td>
                <Td>
                  {item.betalingStatus === 1 ? "Betaald" : "Niet Betaald"}
                </Td>{" "}
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Box>
          <Box>
            {begin > 0 && (
              <Button
                leftIcon={<ArrowBackIcon />}
                onClick={decrementBegin}
                float="left"
              />
            )}
            <Button
              rightIcon={<ArrowForwardIcon />}
              onClick={incrementBegin}
              float="right"
              isDisabled={10 != totalOrders}
            />
          </Box>
        </Box>
      </Box>
    );
  }
}

export default BestellingList;
