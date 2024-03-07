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
import { getById, update } from "../../../api/index.js";
import { useColorModeValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { NotificatieContext } from "../../contexts/Notificatie.contexts";

function NotificatieList() {
  const { setAantalOngeopend } = useContext(NotificatieContext);

  const hoverColor = useColorModeValue("gray.400", "gray.700");
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

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
      navigate(`/notificaties`);
    } catch (error) {
      console.error("Error updating notificatie:", error);
    }

    navigate(`/notificatie-info`);
  };

  const fetchData = async () => {
    try {
      if (localStorage.getItem("roles") == "leverancier") {
        const idLeverancier = localStorage.getItem("idLeverancier");
        const response = await getById(
          `notificatie/leverancier/${idLeverancier}`
        );
        setItems(response);
      }
      if (localStorage.getItem("roles") == "klant") {
        const idKlant = localStorage.getItem("idKlant");
        const response = await getById(`notificatie/klant/${idKlant}`);
        setItems(response);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  if (localStorage.getItem("roles") == "leverancier") {
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
      </Box>
    );
  }
}

export default NotificatieList;
