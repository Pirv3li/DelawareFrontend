import { useState, useEffect } from "react";
import * as React from "react";
import { Box, Center, Image, Text, VStack, Stack } from "@chakra-ui/react";
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
      setLeverancier(data);
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
      <Box
        maxW={"320px"}
        w={"full"}
        boxShadow={"2xl"}
        borderWidth={1}
        borderRadius={"lg"}
        overflow={"hidden"}
      >
        <Image
          mt={6}
          h={"120px"}
          w={"full"}
          src={leverancier.leverancier.bedrijf.logo}
          objectFit={"contain"}
        />
        <VStack p={6} spacing={2} align={"start"}>
          <Text fontWeight={"bold"} fontSize={"2xl"}>
            {leverancier.leverancier.gebruikersnaam}
          </Text>
          <Text fontStyle={"italic"} fontSize={"x-small"} color={"gray.500"}>
            {leverancier.leverancier.bedrijf.sector}
          </Text>
          <Text fontSize={"sm"} color={"gray.500"}>
            {leverancier.leverancier.bedrijf.adres.straat}{" "}
            {leverancier.leverancier.bedrijf.adres.nummer} <br />
            {leverancier.leverancier.bedrijf.adres.postcode}{" "}
            {leverancier.leverancier.bedrijf.adres.stad}
          </Text>

          <Stack spacing={0}>
            <Text fontSize={"sm"}>Email: {leverancier.leverancier.email}</Text>
            <Text fontSize={"sm"}>
              Tel: {leverancier.leverancier.bedrijf.telefoonnummer}
            </Text>
          </Stack>
          <Stack spacing={1}>
            <Text fontSize={"sm"}>Account Type: Leverancier</Text>
            <Text fontSize={"sm"}>
              leveranciernummer: {leverancier.leverancier.leverancierNummer}
            </Text>
          </Stack>
          <Text fontSize={"x-small"} color={"gray.500"}>
            Leverancier sinds:{" "}
            {new Date(
              leverancier.leverancier.bedrijf.gebruikerSinds
            ).toLocaleDateString("en-GB")}
          </Text>
        </VStack>
      </Box>
    </Center>
  );
};
