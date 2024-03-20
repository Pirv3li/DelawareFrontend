import React, { useState, useEffect } from "react";
import { useAuth } from "./contexts/Auth.contexts";
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  Heading,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Image,
} from "@chakra-ui/react";

export const ProfielInfo = () => {
  const { getKlant, getLeverancier } = useAuth();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const roles = sessionStorage.getItem("roles");

  useEffect(() => {
    fetchUserData();
  }, []);

  async function fetchUserData() {
    try {
      const data = await (roles === "klant" ? getKlant() : getLeverancier());
      if (data.length > 0) {
        setUserData(roles === "klant" ? data[0].klant : data[0].leverancier);
      } else {
        console.error(
          `No data returned from ${
            roles === "klant" ? "getKlant" : "getLeverancier"
          }`
        );
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  const handleWijzigen = () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    setIsEditing(false);
    userData.gebruikersnaam = document.getElementById("gebruikersnaam").value;
    userData.bedrijf.sector = document.getElementById("sector").value;
    userData.bedrijf.adres.straat = document.getElementById("straat").value;
    userData.bedrijf.adres.nummer = document.getElementById("nummer").value;
    userData.bedrijf.adres.postcode = document.getElementById("postcode").value;
    userData.bedrijf.adres.stad = document.getElementById("stad").value;
    userData.email = document.getElementById("email").value;
    userData.bedrijf.telefoonnummer =document.getElementById("telefoonnummer").value;

      console.log(userData);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log("userdata:", userData);

  const personalFields = [
    {
      label: "Gebruikersnaam",
      value: userData.gebruikersnaam,
      id: "gebruikersnaam",
    },
    { label: "Email", value: userData.email, id: "email" },
    {
      label: `${roles === "klant" ? "Klant" : "Leverancier"}nummer`,
      value:
        roles === "klant" ? userData.klantNummer : userData.leverancierNummer,
      id: "gebruikernummer",
    },
    {
      label: `${roles === "klant" ? "Klant" : "Leverancier"} sinds`,
      value: new Date(userData.bedrijf.gebruikerSinds).toLocaleDateString(
        "en-GB"
      ),
      id: "gebruikerSinds",
    },
  ];

  const companyFields = [
    { label: "Sector", value: userData.bedrijf.sector, id: "sector" },
    {
      label: "Adres",
      value: `${userData.bedrijf.adres.straat} ${userData.bedrijf.adres.nummer}, ${userData.bedrijf.adres.postcode} ${userData.bedrijf.adres.stad}`,
      id: "adres",
    },
    {
      label: "Telefoonnummer",
      value: userData.bedrijf.telefoonnummer,
      id: "telefoonnummer",
    },
  ];

  const financialFields = [
    { label: "IBAN", value: userData.bedrijf.iban, id: "iban" },
    { label: "BTW", value: userData.bedrijf.btwNummer, id: "btw" },
  ];

  return (
    <Flex direction="column" align="center" justify="center" py={6}>
      <Box
        borderWidth={1}
        borderRadius="lg"
        p={4}
        width="80%"
        bg="white"
        boxShadow="lg"
        style={{ fontFamily: "Arial, sans-serif" }}
      >
        <Flex direction="column" align="center">
          <Image
            boxSize="150px"
            objectFit="cover"
            src={userData.bedrijf.logo}
            alt="logo bedrijf"
            mb={4}
          />
          <Text fontSize="2xl" fontWeight="bold" mb={4} color="blue.500">
            {userData.gebruikersnaam}
          </Text>
        </Flex>
        <Tabs variant="enclosed" colorScheme="blue">
          <TabList>
            <Tab>Persoonlijke Informatie</Tab>
            <Tab>Bedrijfs Informatie</Tab>
            <Tab>Financiële Gegevens</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {personalFields.map(({ label, value, id }) => (
                <FormControl key={id} mb={4}>
                  <FormLabel color="gray.500">{label}</FormLabel>
                  {isEditing ? (
                    <Input defaultValue={value} borderColor={"gray"} id={id} />
                  ) : (
                    <Text color="gray.700">{value}</Text>
                  )}
                </FormControl>
              ))}
            </TabPanel>
            <TabPanel>
              {companyFields.map(({ label, value, id }) => (
                <FormControl key={id} mb={4}>
                  <FormLabel color="gray.500">{label}</FormLabel>
                  {isEditing ? (
                    <Input defaultValue={value} borderColor={"gray"} id={id} />
                  ) : (
                    <Text color="gray.700">{value}</Text>
                  )}
                </FormControl>
              ))}
            </TabPanel>
            <TabPanel>
              {financialFields.map(({ label, value, id }) => (
                <FormControl key={id} mb={4}>
                  <FormLabel color="gray.500">{label}</FormLabel>
                  {isEditing ? (
                    <Input defaultValue={value} borderColor={"gray"} id={id} />
                  ) : (
                    <Text color="gray.700">{value}</Text>
                  )}
                </FormControl>
              ))}
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Flex justify="center">
          <Button
            colorScheme="blue"
            variant="solid"
            mt={4}
            onClick={handleWijzigen}
            style={{ borderRadius: "20px" }}
          >
            wijzigen
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default ProfielInfo;
