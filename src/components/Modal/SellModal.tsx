import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FC, useRef, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { selectToken } from "../../redux/reducers/user.slice";
import { requestFunc, URL } from "../../utils/constants";
import { Player } from "../../utils/type-defs";
import { AmountInput } from "../Inputs/Amount";

const SellModal: FC<Player> = ({ _id, firstName, lastName, onSale }) => {
  const token = useAppSelector(selectToken);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = useState("1000000");
  const [loading, setLoading] = useState(false);
  const initialRef = useRef(null);
  const toastID = "sell-toast";
  const toast = useToast({
    duration: 1800,
    position: "top-right",
    isClosable: true,
    variant: "left-accent",
    id: toastID,
  });

  const sellPlayer = async () => {
    setLoading(true);
    const { data, error } = await requestFunc("post", URL.SELL, token, {
      id: _id,
      price: +value,
    });
    if (data) {
      if (!toast.isActive(toastID)) {
        toast({ description: "Player posted", status: "success" });
      }
    } else {
      if (!toast.isActive(toastID)) {
        const msg = error.message.includes("field has to be unique")
          ? "Player already on sale"
          : error.message;
        toast({ description: `${msg}`, status: "error" });
      }
    }
    setLoading(false);
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen} disabled={onSale}>
        Sell
      </Button>

      <Modal
        closeOnOverlayClick={false}
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Sell {firstName} {lastName}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Amount</FormLabel>
              <AmountInput value={value} setValue={setValue} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={sellPlayer}
              disabled={loading}
            >
              {loading ? <Spinner /> : "Sell"}
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SellModal;
