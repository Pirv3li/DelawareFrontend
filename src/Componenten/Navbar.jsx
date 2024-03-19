import React, { useState, useEffect, useContext } from "react";
import {
  Flex,
  Link as ChakraLink,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { getById, setAuthToken } from "../api/index.js";
import { useAuth } from "./contexts/Auth.contexts";
import { useNavbarStyles } from "./UseThemaNavbar.jsx";
import { NotificatieContext } from "../Componenten/contexts/Notificatie.contexts.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser, faShop,faBox } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const { isAuthed, logOut } = useAuth();
  const { bgColor, color, hoverColor } = useNavbarStyles();
  const { aantalOngeopend, setAantalOngeopend } =
    useContext(NotificatieContext);

  const handleLogout = () => {
    logOut();
    navigate(`/producten`);
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
          style={{ maxWidth: "auto", height: "100px" }}
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
              mr={10}
              _hover={{ color: hoverColor }}
              fontSize={"3xl"}
              display="flex"
              alignItems="center"
            >
              <FontAwesomeIcon icon={faEnvelope} />
              {aantalOngeopend > 0 && (
                <p
                  className="notificatie-getal"
                  style={{
                    fontSize: "17px",
                    color: "red",
                    marginLeft: "0px",

                    fontWeight: "bolder",
                    marginBottom: "20px",
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
              fontSize={"3xl"}
            >
              <FontAwesomeIcon icon={faShop} />
            </ChakraLink>
            <ChakraLink
              as={RouterLink}
              to="/producten"
              mr={10}
              _hover={{ color: hoverColor }}
              fontSize={"3xl"}
              ml={8}
            >
              <FontAwesomeIcon icon={faBox} />
            </ChakraLink>
            <ChakraLink
              as={RouterLink}
              to="/profiel"
              mr={5}
              _hover={{ color: hoverColor }}
              fontSize={"3xl"}
              ml={8}
            >
              <FontAwesomeIcon icon={faUser} />
            </ChakraLink>
            <ChakraLink
              as={RouterLink}
              onClick={handleLogout}
              mr={5}
              _hover={{ color: hoverColor }}
              fontSize={"2xl"}
              whiteSpace="nowrap"
              alignSelf={""}
              ml="auto"
              navigate
            >
              Log uit
            </ChakraLink>
          </>
        ) : (
          <ChakraLink
            as={RouterLink}
            to="/login"
            ml="auto"
            _hover={{ color: hoverColor }}
            fontSize="2xl"
            
          >
            Login
          </ChakraLink>
        )}
      </Flex>
    </Flex>
  );
};

export default Navbar;
