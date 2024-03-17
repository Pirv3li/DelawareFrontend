import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Heading,
  Box,
  Select,
  FormLabel,
} from "@chakra-ui/react";
import React, { useState, useEffect, useContext } from "react";
import { getById, update, setAuthToken, post } from "../../../api/index.js";
import { useColorModeValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { NotificatieContext } from "../../contexts/Notificatie.contexts";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

function NotificatieList() {
  const { setAantalOngeopend } = useContext(NotificatieContext);

  const hoverColor = useColorModeValue("gray.400", "gray.700");
  const [items, setItems] = useState([]);
  const [begin, setBegin] = useState(1);
  const [body, setBody] = useState([])

  const [totalOrders, setTotalOrders] = useState(0);

  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleItemsPerPage = (e) => {
    setItemsPerPage(Number(e.target.value));
  };

  const navigate = useNavigate();

  useEffect(() => {
    setAuthToken(localStorage.getItem("jwtToken"));
    fetchData();
  }, [begin, totalOrders, itemsPerPage]);

  const handleClick = async (notificatie) => {
    try {
      const updatedNotificatie = {
        idOrder: notificatie.idOrder,
        text: notificatie.text,
        onderwerp: notificatie.onderwerp,
        geopend: true,
        afgehandeld: notificatie.geopend === 1,
        datum: notificatie.datum,
      };

      await update(
        `notificatie/${notificatie.idNotificatie}`,
        updatedNotificatie
      );

      setAantalOngeopend((prevAantal) => prevAantal - 1);

      localStorage.setItem("idNotificatie", notificatie.idNotificatie);
      navigate(`/notificaties/`);
    } catch (error) {
      console.error("Error updating notificatie:", error);
    }

    navigate(`/notificatie-info`);
  };

  const fetchData = async () => {
    try {
      let body = {
        "begin": begin,
        "aantal": itemsPerPage
    };
    setBody(body);

      if (localStorage.getItem("roles") == "leverancier") {
        console.log("body: ", body)
        const response = await post(
          `notificatie/leverancier/`, {arg: body}
        );
        setItems(response);
        setTotalOrders(response.total);

      }
      if (localStorage.getItem("roles") == "klant") {
        const response = await post(`notificatie/klant/`, {arg: body});
        setItems(response);
        setTotalOrders(response.total);

      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const incrementBegin = () => {
    setBegin(prevBegin => prevBegin + itemsPerPage);
  };

  const decrementBegin = () => {
    setBegin(prevBegin => prevBegin - itemsPerPage);
  };

  if (localStorage.getItem("roles") == "leverancier") {
    return (
      <Box>
        <Heading textAlign="center" mt={2}>
          Notificaties
        </Heading>
        <FormLabel>Aantal</FormLabel>
        <Select value={itemsPerPage} onChange={handleItemsPerPage}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </Select>
        <Table colorScheme="Gray 500" mt={10} mb={5}>
          <Thead>
            <Tr>
              <Th>idNotificatie</Th>
              <Th>Onderwerp</Th>
              <Th>Datum</Th>
              <Th>Gezien</Th>
            </Tr>
          </Thead>
          <Tbody>
            {items.map((item) => (
              <Tr
                key={item.idNotificatie}
                onClick={() => handleClick(item)}
                borderBottom="1px solid"
                borderColor="gray.200"
                _hover={{ bg: hoverColor }}
              >
                <Td>{item.idNotificatie}</Td>
                <Td>{item.onderwerp}</Td>
                <Td>{new Date(item.datum).toLocaleDateString("en-GB")}</Td>
                <Td>{item.geopend ? "✓" : "✗"}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Box>
                        {begin > 0 && <Button leftIcon={<ArrowBackIcon />} onClick={decrementBegin} float="left" />}
                        <Button rightIcon={<ArrowForwardIcon />} onClick={incrementBegin} float="right" isDisabled={10 != totalOrders} />
                    </Box>
      </Box>
    );
  }
  if (localStorage.getItem("roles") == "klant") {
    return (
      <Box>
        <Heading textAlign="center" mt={2}>
          Notificaties
        </Heading>
        <FormLabel>Aantal</FormLabel>
        <Select value={itemsPerPage} onChange={handleItemsPerPage}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </Select>
        <Table colorScheme="Gray 500" mt={10} mb={5}>
          <Thead>
            <Tr>
              <Th>idNotificatie</Th>
              <Th>Onderwerp</Th>
              <Th>Datum</Th>
              <Th>Afgehandeld</Th>
              <Th>Gezien</Th>
            </Tr>
          </Thead>
          <Tbody>
            {items.map((item) => (
              <Tr
                key={item.idNotificatie}
                onClick={() => handleClick(item)}
                borderBottom="1px solid"
                borderColor="gray.200"
                _hover={{ bg: hoverColor }}
              >
                <Td>{item.idNotificatie}</Td>
                <Td>{item.onderwerp}</Td>
                <Td>{new Date(item.datum).toLocaleDateString("en-GB")}</Td>
                <Td>{item.afgehandeld === 0 ? "nee" : "ja"}</Td>
                <Td>{item.geopend ? "✓" : "✗"}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Box>
                        {begin > 0 && <Button leftIcon={<ArrowBackIcon />} onClick={decrementBegin} float="left" />}
                        <Button rightIcon={<ArrowForwardIcon />} onClick={incrementBegin} float="right" isDisabled={10 != totalOrders} />
                    </Box>
      </Box>
    );
  }
}

export default NotificatieList;
