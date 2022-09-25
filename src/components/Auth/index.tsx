import { Center, Container, Heading, Button } from "@chakra-ui/react";
import { useState } from "react";
import { Navigate } from "react-router";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import { useAppSelector } from "../../redux/hooks";
import { selectToken } from "../../redux/reducers/user.slice";

const Auth = () => {
  const isLoggedIn = useAppSelector(selectToken);
  const [signIn, setSignIn] = useState(true);
  return isLoggedIn ? (
    <Navigate to={"/dashboard"} replace />
  ) : (
    <Center marginY={20}>
      <Container>
        <Heading textAlign={"left"} marginBottom={8}>
          {signIn ? "Sign in" : "Sign up"}
        </Heading>
        {signIn ? <SignInForm /> : <SignUpForm />}
        <Button onClick={() => setSignIn(!signIn)} marginTop={8}>
          {signIn ? "Don't have an account?" : "Already a member?"}
        </Button>
      </Container>
    </Center>
  );
};

export default Auth;
