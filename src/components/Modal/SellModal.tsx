import { useRef, FC, useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  useDisclosure,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  ModalFooter,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { AmountInput } from "../Inputs/Amount";
import { Player } from "../../utils/type-defs";
import { requestFunc, URL } from "../../utils/constants";
import { useAppSelector } from "../../redux/hooks";
import { selectToken } from "../../redux/reducers/user.slice";

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
        toast({ description: `${error.message}`, status: "error" });
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
