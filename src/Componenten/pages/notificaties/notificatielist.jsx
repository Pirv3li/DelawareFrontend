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
} from "@chakra-ui/react";
import React, { useState, useEffect, useContext } from "react";
import { getById, update, setAuthToken } from "../../../api/index.js";
import { useColorModeValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { NotificatieContext } from "../../contexts/Notificatie.contexts";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

function NotificatieList() {
  const { setAantalOngeopend } = useContext(NotificatieContext);

  const hoverColor = useColorModeValue("gray.400", "gray.700");
  const [items, setItems] = useState([]);
  const [begin, setBegin] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    setAuthToken(localStorage.getItem("jwtToken"));
    fetchData();
  }, [begin]);

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
      if (localStorage.getItem("roles") == "leverancier") {
        const aantal = 0;
        const response = await getById(
          `notificatie/leverancier/${begin}`
        );
        setItems(response);
        setTotalOrders(response.total);

      }
      if (localStorage.getItem("roles") == "klant") {
        const aantal = 0;
        const response = await getById(`notificatie/klant/${begin}`);
        setItems(response);
        setTotalOrders(response.total);

      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const incrementBegin = () => {
    setBegin(prevBegin => prevBegin + 10);
  };

  const decrementBegin = () => {
    setBegin(prevBegin => prevBegin - 10);
  };

  if (localStorage.getItem("roles") == "leverancier") {
    return (
      <Box>
        <Heading textAlign="center" mt={2}>
          Notificatie's
        </Heading>
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
          Bestellingen
        </Heading>
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
