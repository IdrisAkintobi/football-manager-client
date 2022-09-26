import { Center, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAppSelector } from "../../redux/hooks";
import { selectToken } from "../../redux/reducers/user.slice";
import { requestFunc, URL } from "../../utils/constants";
import { Team } from "../../utils/type-defs";
import { Loading } from "../Loading/Loading";
import Stats from "../Stat/Stats";
import ListPlayers from "./ListPlayers";

const Dashboard = () => {
  const navigate = useNavigate();
  const token = useAppSelector(selectToken);
  const [team, setTeam] = useState<Team | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeam = async () => {
      const { data } = await requestFunc("get", URL.GET_TEAM, token);
      if (data) {
        setTeam(data);
      } else {
        setError("Something went wrong!");
        setTimeout(() => navigate("/"), 2000);
      }
    };
    fetchTeam();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return error ? (
    <div style={{ margin: "24px 0", textAlign: "center" }}>{error}</div>
  ) : !team ? (
    <Loading />
  ) : (
    <div style={{ marginBottom: "80px", marginTop: "40px" }}>
      <Center flexDirection={"column"}>
        <Heading>{team.teamName}</Heading>
        <Text>{team.country}</Text>
      </Center>
      <Stats {...team} />
      <ListPlayers players={team.players} />
    </div>
  );
};

export default Dashboard;
