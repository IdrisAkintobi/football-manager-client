import { FC, useState } from "react";
import { Button, Flex, Spinner, useToast } from "@chakra-ui/react";
import { Player } from "../../utils/type-defs";
import { requestFunc, URL } from "../../utils/constants";
import { useAppSelector } from "../../redux/hooks";
import { selectToken } from "../../redux/reducers/user.slice";

const BuyButton: FC<Player> = ({ _id }) => {
  const token = useAppSelector(selectToken);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [delLoading, setDelLoading] = useState(false);
  const toastID = "buy-toast";
  const toast = useToast({
    duration: 1800,
    position: "top-right",
    isClosable: true,
    status: "success",
    variant: "left-accent",
    id: toastID,
  });

  const sellPlayer = async () => {
    setLoading(true);
    const { data, error } = await requestFunc(
      "post",
      `${URL.BUY}/${_id}`,
      token
    );
    if (data) {
      if (!toast.isActive(toastID)) {
        toast({ description: "Player purchased" });
      }
      setDone(true);
    } else {
      if (!toast.isActive(toastID)) {
        toast({ description: `${error.message}`, status: "error" });
      }
    }
    setLoading(false);
  };
  const delPlayer = async () => {
    setDelLoading(true);
    const { data, error } = await requestFunc(
      "delete",
      `${URL.DEL}/${_id}`,
      token
    );
    if (data) {
      toast({ description: "Player removed from market" });
      setDone(true);
    } else {
      toast({ description: `${error.message}`, status: "error" });
    }
    setDelLoading(false);
  };

  return (
    <Flex justifyContent={"space-between"}>
      <Button onClick={sellPlayer} disabled={done || loading}>
        {loading ? <Spinner /> : "Buy"}
      </Button>
      <Button onClick={delPlayer} disabled={done || delLoading}>
        {delLoading ? <Spinner /> : "Remove"}
      </Button>
    </Flex>
  );
};

export default BuyButton;
