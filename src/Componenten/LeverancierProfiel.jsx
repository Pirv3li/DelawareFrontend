import { useState, useEffect } from "react";
import * as React from "react";
import { Box, Center, Image, Text, VStack, Stack, Table, Tbody, Tr, Td } from "@chakra-ui/react";
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
      console.log("data: " + data);
    } catch (error) {
      console.error(error);
    }
  }

  console.log(leverancier);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Center py={6}>
     
      <Table variant="striped" colorScheme="blue">
        <Tbody>
          <Tr>
            <Td>Logo</Td>
            <Td>
              <Image src={leverancier.leverancier.bedrijf.logo} maxH={"100px"}/>
            </Td>
          </Tr>
          <Tr>
            <Td>Gebruikersnaam</Td>
            <Td>{leverancier.leverancier.gebruikersnaam}</Td>
          </Tr>
          <Tr>
            <Td>Sector</Td>
            <Td>{leverancier.leverancier.bedrijf.sector}</Td>
          </Tr>
          <Tr>
            <Td>Adres</Td>
            <Td>
              {leverancier.leverancier.bedrijf.adres.straat}{" "}
              {leverancier.leverancier.bedrijf.adres.nummer}, {" "}
              {leverancier.leverancier.bedrijf.adres.postcode}{" "}
              {leverancier.leverancier.bedrijf.adres.stad}
            </Td>
          </Tr>
          <Tr>
            <Td>Email</Td>
            <Td>{leverancier.leverancier.email}</Td>
          </Tr>
          <Tr>
            <Td>Telefoonnummer</Td>
            <Td>{leverancier.leverancier.bedrijf.telefoonnummer}</Td>
          </Tr>
          <Tr>
            <Td>Leveranciernummer</Td>
            <Td>{leverancier.leverancier.leverancierNummer}</Td>
          </Tr>
          <Tr>
            <Td>Leverancier sinds</Td>
            <Td>
              {new Date(
                leverancier.leverancier.bedrijf.gebruikerSinds
              ).toLocaleDateString("en-GB")}
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </Center>
  );

};
