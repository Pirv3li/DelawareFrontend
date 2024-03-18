import React, { useState, useEffect, useContext } from "react";
import {
  Flex,
  Link as ChakraLink,
  IconButton,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { getById, setAuthToken } from "../api/index.js";
import { useAuth } from "./contexts/Auth.contexts";
import { useNavbarStyles } from "./useThemaNavbar";
import { NotificatieContext } from "../Componenten/contexts/Notificatie.contexts.jsx";

const Navbar = () => {
  const { isAuthed, logOut } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();
  const { bgColor, color, hoverColor } = useNavbarStyles();
  const { aantalOngeopend, setAantalOngeopend } = useContext(
    NotificatieContext
  );

  const handleLogout = () => {
    logOut();
  };

  useEffect(() => {
    setAuthToken(sessionStorage.getItem("jwtToken"));
    fetchData();
  }, [aantalOngeopend]);

  useEffect(() => {
    if (isAuthed) {
      fetchData();
    }
  }, [isAuthed]);

  const fetchData = async () => {
    try {
      const roles = sessionStorage.getItem("roles");
      if (roles) {
        if (roles == "klant") {
          const idKlant = sessionStorage.getItem("idKlant");
          const aantalOngeopend = await getById(
            `notificatie/ongeopend/klant/${idKlant}`
          );
          setAantalOngeopend(aantalOngeopend[0].count);
        }
        if (roles == "leverancier") {
          const idLeverancier = sessionStorage.getItem("idLeverancier");
          const aantalOngeopend = await getById(
            `notificatie/ongeopend/leverancier/${idLeverancier}`
          );
          setAantalOngeopend(aantalOngeopend[0].count);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Flex
      as="nav"
      p={4}
      bgColor={bgColor}
      color={color}
      width="auto"
      justifyContent="space-between"
      alignItems="center"
    >
      <ChakraLink as={RouterLink} to="/" mx={2} _hover={{ color: hoverColor }}>
        <img
          src="https://www.the5thconference.com/wp-content/uploads/2019/08/Logo_delaware_FullColor_whitetext_digital.png"
          alt=""
          style={{ maxWidth: "auto",height: "100px"}}
        />
      </ChakraLink>

      <Flex
        as="nav"
        ml="auto"
        bgColor={bgColor}
        color={color}
        width="50%"
        
        justifyContent="space-between"
        alignItems="center"
        flexWrap="nowrap"
      >
        {isAuthed ? (
          <>
            <ChakraLink
              as={RouterLink}
              to="/notificaties"
              mr={5}
              _hover={{ color: hoverColor }}
              fontSize={"2xl"}
              display="flex"
              alignItems="center"
              position="relative"
            >
              Notificatie
              {aantalOngeopend > 0 && (
                <p
                  className="notificatie-getal"
                  style={{
                    fontSize: "20px",
                    color: "red",
                    position: "absolute",
                    top: "-10px",
                    right: "-10px",
                  }}
                >
                  {aantalOngeopend}
                </p>
              )}
            </ChakraLink>
            <ChakraLink
              as={RouterLink}
              to="/bestellingen"
              mr={5}
              _hover={{ color: hoverColor }}
              fontSize="2xl"
            >
              Bestellingen
            </ChakraLink>
            <ChakraLink
              as={RouterLink}
              to="/producten"
              mr={5}
              _hover={{ color: hoverColor }}
              fontSize="2xl"
            >
              Producten
            </ChakraLink>
            <ChakraLink
              as={RouterLink}
              to="/profiel"
              mr={5}
              _hover={{ color: hoverColor }}
              fontSize="2xl"
            >
              Profiel
            </ChakraLink>
            <ChakraLink
              as={RouterLink}
              onClick={handleLogout}
              mr={5}
              _hover={{ color: hoverColor }}
              fontSize={"2xl"}
              whiteSpace="nowrap"
            >
              Log uit
            </ChakraLink>
          </>
        ) : (
          <ChakraLink
            as={RouterLink}
            to="/login"
            ml={150}
            _hover={{ color: hoverColor }}
            fontSize="2xl"
          >
            Login
          </ChakraLink>
        )}
        <IconButton
          aria-label="Toggle color mode"
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
          ml="auto"
        />
      </Flex>
    </Flex>
  );
};

export default Navbar;
