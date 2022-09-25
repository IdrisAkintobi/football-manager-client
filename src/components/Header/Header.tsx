import { ReactNode } from "react";
import {
  Center,
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Show,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { ColorModeSwitcher } from "../../ColorModeSwitcher";
import { removeUser, selectToken, selectEmail } from "../../redux/reducers/user.slice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Soccer } from "../Loading/Loading";

const Links: { [key: string]: string } = {
  Dashboard: "/dashboard",
  Market: "/market",
};

const NavLink = ({ children, link }: { children: ReactNode; link: string }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={link}
  >
    {children}
  </Link>
);

export default function Simple() {
  const isLoggedIn = useAppSelector(selectToken);
  const email = useAppSelector(selectEmail);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          {isLoggedIn && (
            <IconButton
              size={"md"}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={"Open Menu"}
              display={{ md: "none" }}
              onClick={isOpen ? onClose : onOpen}
            />
          )}
          <HStack spacing={4} alignItems={"center"}>
            <Box>{Soccer}</Box>
          </HStack>
          {isLoggedIn && (
            <Show above="md">
              <HStack spacing={2} alignItems={"center"}>
                {Object.keys(Links).map((link) => (
                  <NavLink key={link} link={Links[link]}>
                    {link}
                  </NavLink>
                ))}
              </HStack>
            </Show>
          )}

          <Flex alignItems={"center"}>
            <ColorModeSwitcher />
            {isLoggedIn && (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={"https://avatars.dicebear.com/api/male/username.svg"}
                  />
                </MenuButton>

                <MenuList alignItems={"center"} zIndex={"modal"}>
                  <br />
                  <Center>
                    <Avatar
                      size={"2xl"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>{email}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem
                    onClick={() => {
                      dispatch(removeUser());
                    }}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            )}
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Object.keys(Links).map((link) => (
                <NavLink key={link} link={Links[link]}>
                  {link}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
