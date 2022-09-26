import {
  Flex,
  Stat,
  StatArrow,
  StatGroup,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
interface propType {
  budget: number;
  value: number;
}
const Stats = ({ budget, value }: propType) => {
  return (
    <Flex justifyContent={"end"} mr={"16"}>
      <StatGroup gap={"4"}>
        <Stat>
          <StatLabel>Value</StatLabel>
          <StatNumber>${value}</StatNumber>
          <StatArrow
            type={value < 20000000 ? "decrease" : "increase"}
          ></StatArrow>
        </Stat>
        <Stat>
          <StatLabel>Budget</StatLabel>
          <StatNumber>${budget}</StatNumber>
          <StatArrow
            type={budget < 5000000 ? "decrease" : "increase"}
          ></StatArrow>
        </Stat>
      </StatGroup>
    </Flex>
  );
};

export default Stats;
