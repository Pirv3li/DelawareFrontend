import { useState, useEffect } from "react";
import * as React from "react";
import { Box, Center, Image, Text, VStack, Stack, Table, Tbody, Tr, Td, Button, Flex, Input } from "@chakra-ui/react";
import { useAuth } from "./contexts/Auth.contexts";

export const LeverancierProfiel = () => {
  const { getLeverancier } = useAuth();
  const [leverancier, setLeverancier] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeverancierData();
  }, []);

  async function fetchLeverancierData() {
    try {
      const data = await getLeverancier();
      if (data.length > 0) {
        setLeverancier(data[0]);
      } else {
        console.error('No data returned from getLeverancier');
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  const [isEditing, setIsEditing] = useState(false);

  const handleWeizigen = () => {
    if (isEditing) {
      setIsEditing(false);
      klant.klant.gebruikersnaam = document.getElementById("gebruikersnaam").value;
      klant.klant.bedrijf.sector = document.getElementById("sector").value;
      klant.klant.bedrijf.adres.straat = document.getElementById("straat").value;
      klant.klant.bedrijf.adres.nummer = document.getElementById("nummer").value;
      klant.klant.bedrijf.adres.postcode = document.getElementById("postcode").value;
      klant.klant.bedrijf.adres.stad = document.getElementById("stad").value;
      klant.klant.email = document.getElementById("email").value;
      klant.klant.bedrijf.telefoonnummer = document.getElementById("telefoonnummer").value;
    } else {
      setIsEditing(true);
    }
  };



  if (loading) {
    return <div>Loading...</div>;
  }

  return (

    <Center py={6}>
    <VStack width="80%">

    <Table variant="striped" colorScheme="blue">
  <Tbody>
    <Tr>
      <Td>Logo</Td>
      <Td>
        <Image src={leverancier.leverancier.bedrijf.logo} maxH={"100px"} />
      </Td>
    </Tr>
    <Tr>
      <Td>Gebruikersnaam</Td>
      <Td>
        {isEditing ? (
          <Input defaultValue={leverancier.leverancier.gebruikersnaam}  borderColor={"gray"} id="gebruikersnaam"/>
        ) : (
          leverancier.leverancier.gebruikersnaam
        )}
      </Td>
    </Tr>
    <Tr>
      <Td>Sector</Td>
      <Td>
        {isEditing ? (
          <Input defaultValue={leverancier.leverancier.bedrijf.sector} borderColor={"gray"} id="sector"/>
        ) : (
          leverancier.leverancier.bedrijf.sector
        )}
      </Td>
    </Tr>
    <Tr>
      <Td>Straat</Td>
      <Td>
        {isEditing ? (
          <Input defaultValue={leverancier.leverancier.bedrijf.adres.straat}  borderColor={"gray"} id="straat"/>
        ) : (
          leverancier.leverancier.bedrijf.adres.straat
        )}
      </Td>
    </Tr>
    <Tr>
      <Td>Nummer</Td>
      <Td>
        {isEditing ? (
          <Input defaultValue={leverancier.leverancier.bedrijf.adres.nummer} borderColor={"gray"} id="nummer"/>
        ) : (
          leverancier.leverancier.bedrijf.adres.nummer
        )}
      </Td>
    </Tr>
    <Tr>
      <Td>Postcode</Td>
      <Td>
        {isEditing ? (
          <Input defaultValue={leverancier.leverancier.bedrijf.adres.postcode} borderColor={"gray"} id="postcode"/>
        ) : (
          leverancier.leverancier.bedrijf.adres.postcode
        )}
      </Td>
    </Tr>
    <Tr>
      <Td>Stad</Td>
      <Td>
        {isEditing ? (
          <Input defaultValue={leverancier.leverancier.bedrijf.adres.stad} borderColor={"gray"} id="stad"/>
        ) : (
          leverancier.leverancier.bedrijf.adres.stad
        )}
      </Td>
    </Tr>
    <Tr>
      <Td>Email</Td>
      <Td>
        {isEditing ? (
          <Input defaultValue={leverancier.leverancier.email} borderColor={"gray"}  id="email"/>
        ) : (
          leverancier.leverancier.email
        )}
      </Td>
    </Tr>
    <Tr>
      <Td>Telefoonnummer</Td>
      <Td>
        {isEditing ? (
          <Input defaultValue={leverancier.leverancier.bedrijf.telefoonnummer} borderColor={"gray"} id="telefoonnummer"/>
        ) : (
          
          leverancier.leverancier.bedrijf.telefoonnummer
        )}
      </Td>
    </Tr>
    <Tr>
      <Td>Leveranciernummer</Td>
      <Td>
     
          <Text>{leverancier.leverancier.leverancierNummer}</Text>
        
      </Td>
    </Tr>
    <Tr>
      <Td>Leverancier sinds</Td>
      <Td>
          <Text>{new Date(leverancier.leverancier.bedrijf.gebruikerSinds).toLocaleDateString("en-GB")}</Text>
      </Td>
    </Tr>
  </Tbody>
</Table>
                <Button colorScheme="blue" variant="solid" mt={4} onClick={handleWeizigen}>weizigen </Button>
                </VStack>

    </Center>

  );

};
