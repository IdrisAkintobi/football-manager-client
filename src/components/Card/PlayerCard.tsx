import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
} from "@chakra-ui/react";
import { Player } from "../../utils/type-defs";
import { FC } from "react";
import SellModal from "../Modal/SellModal";
import BuyButton from "../Button/BuyButton";

const IMAGE = "male.png";

const PlayerCard: FC<{ player: Player; buy?: boolean }> = ({ player, buy }) => {
  const { firstName, lastName, country, position, value, price, onSale } =
    player;
  return (
    <Center py={12} mx={8}>
      <Box
        role={"group"}
        p={6}
        maxW={"330px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
      >
        <Box
          rounded={"lg"}
          mt={-12}
          pos={"relative"}
          height={"230px"}
          _after={{
            transition: "all .3s ease",
            content: '""',
            w: "full",
            h: "full",
            pos: "absolute",
            top: 5,
            left: 0,
            backgroundImage: `url(${IMAGE})`,
            filter: "blur(15px)",
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: "blur(20px)",
            },
          }}
        >
          {onSale && (
            <Box position="absolute" top="-16px" right="0">
              <Text
                textTransform="uppercase"
                bg={"green.400"}
                px={3}
                py={1}
                color={"whiteAlpha.800"}
                fontSize="sm"
                fontWeight="600"
                rounded="xl"
              >
                On Sale
              </Text>
            </Box>
          )}
          <Image
            rounded={"lg"}
            height={230}
            width={282}
            objectFit={"cover"}
            src={IMAGE}
          />
        </Box>
        <Stack pt={10} align={"center"}>
          <Text color={"gray.500"} fontSize={"sm"} textTransform={"uppercase"}>
            {position}
          </Text>
          <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
            {firstName} {lastName}
          </Heading>
          <Text color={"gray.500"} fontSize={"sm"}>
            {country}
          </Text>
          <Stack direction={"row"} align={"center"}>
            <Text fontWeight={800} fontSize={"xl"}>
              ${value || price}
            </Text>
          </Stack>
        </Stack>
        {buy ? <BuyButton {...player} /> : <SellModal {...player} />}
      </Box>
    </Center>
  );
};

export default PlayerCard;
