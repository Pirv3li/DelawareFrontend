import { useState, useEffect } from "react";
import * as React from "react";
import { Box, Center, Image, Text, VStack, Stack, Table, Tbody, Tr, Td, Button, Flex, Input } from "@chakra-ui/react";
import { useAuth } from "./contexts/Auth.contexts";

export const KlantProfiel = () => {
  const { getKlant } = useAuth();
  const [klant, setKlant] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchKlantData();
  }, []);

  async function fetchKlantData() {
    try {
      const data = await getKlant();
      if (data.length > 0) {
        setKlant(data[0]);
      } else {
        console.error('No data returned from getKlant');
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  const [isEditing, setIsEditing] = useState(false);

  const handleWijzigen = () => {
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
                <Image src={klant.klant.bedrijf.logo} maxH={"100px"} />
              </Td>
            </Tr>
            <Tr>
              <Td>Gebruikersnaam</Td>
              <Td>
                {isEditing ? (
                  <Input defaultValue={klant.klant.gebruikersnaam} borderColor={"gray"} id="gebruikersnaam"/>
                ) : (
                  klant.klant.gebruikersnaam
                )}
              </Td>
            </Tr>
            <Tr>
              <Td>Sector</Td>
              <Td>
                {isEditing ? (
                  <Input defaultValue={klant.klant.bedrijf.sector} borderColor={"gray"} id="sector"/>
                ) : (
                  klant.klant.bedrijf.sector
                )}
              </Td>
            </Tr>
            <Tr>
              <Td>Straat</Td>
              <Td>
                {isEditing ? (
                  <Input defaultValue={klant.klant.bedrijf.adres.straat} borderColor={"gray"} id="straat"/>
                ) : (
                  klant.klant.bedrijf.adres.straat
                )}
              </Td>
            </Tr>
            <Tr>
              <Td>Nummer</Td>
              <Td>
                {isEditing ? (
                  <Input defaultValue={klant.klant.bedrijf.adres.nummer} borderColor={"gray"} id="nummer"/>
                ) : (
                  klant.klant.bedrijf.adres.nummer
                )}
              </Td>
            </Tr>
            <Tr>
              <Td>Postcode</Td>
              <Td>
                {isEditing ? (
                  <Input defaultValue={klant.klant.bedrijf.adres.postcode} borderColor={"gray"} id="postcode"/>
                ) : (
                  klant.klant.bedrijf.adres.postcode
                )}
              </Td>
            </Tr>
            <Tr>
              <Td>Stad</Td>
              <Td>
                {isEditing ? (
                  <Input defaultValue={klant.klant.bedrijf.adres.stad} borderColor={"gray"} id="stad"/>
                ) : (
                  klant.klant.bedrijf.adres.stad
                )}
              </Td>
            </Tr>
            <Tr>
              <Td>Email</Td>
              <Td>
                {isEditing ? (
                  <Input defaultValue={klant.klant.email} borderColor={"gray"} id="email"/>
                ) : (
                  klant.klant.email
                )}
              </Td>
            </Tr>
            <Tr>
              <Td>Telefoonnummer</Td>
              <Td>
                {isEditing ? (
                  <Input defaultValue={klant.klant.bedrijf.telefoonnummer} borderColor={"gray"} id="telefoonnummer"/>
                ) : (
                  klant.klant.bedrijf.telefoonnummer
                )}
              </Td>
            </Tr>
            <Tr>
              <Td>Leveranciernummer</Td>
              <Td>

                <Text>{klant.klant.klantNummer}</Text>

              </Td>
            </Tr>
            <Tr>
              <Td>Leverancier sinds</Td>
              <Td>
                <Text>{new Date(klant.klant.bedrijf.gebruikerSinds).toLocaleDateString("en-GB")}</Text>
              </Td>
            </Tr>
          </Tbody>
        </Table>
        <Button colorScheme="blue" variant="solid" mt={4} onClick={handleWijzigen}>wijzigen </Button>
      </VStack>
    </Center>
  );
};

export default KlantProfiel;