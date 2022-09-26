import { Center, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { selectToken } from "../../redux/reducers/user.slice";
import { requestFunc, URL } from "../../utils/constants";
import { Player } from "../../utils/type-defs";
import ListPlayers from "../Dashboard/ListPlayers";
import { Loading } from "../Loading/Loading";

const Market = () => {
  const token = useAppSelector(selectToken);
  const [market, setMarket] = useState<[Player] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeam = async () => {
      const { data } = await requestFunc("get", URL.MARKET, token);
      if (data.length > 0) {
        setMarket(data);
      } else if (!data.length) {
        setError("No player for sale");
      } else {
        setError("Something went wrong!");
      }
    };
    fetchTeam();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ marginBottom: "80px", marginTop: "40px" }}>
      <Center flexDirection={"column"}>
        <Heading>Transfer Market</Heading>
      </Center>
      {error ? (
        <div style={{ margin: "24px 0", textAlign: "center" }}>{error}</div>
      ) : !market ? (
        <Loading />
      ) : (
        <ListPlayers players={market} buy />
      )}
    </div>
  );
};

export default Market;
