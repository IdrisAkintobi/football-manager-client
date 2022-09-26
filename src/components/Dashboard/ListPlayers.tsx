import { Center, Flex } from "@chakra-ui/react";
import { Player } from "../../utils/type-defs";
import PlayerCard from "../Card/PlayerCard";

interface propType {
  players: Player[];
  buy?: boolean;
}
const ListPlayers = ({ players, buy }: propType) => {
  return (
    <Center marginX={"10%"}>
      <Flex wrap={"wrap"} justify={"space-evenly"}>
        {players.map((player) => (
          <PlayerCard key={player._id} player={player} buy={buy} />
        ))}
      </Flex>
    </Center>
  );
};

export default ListPlayers;
