import { Center, Container, Heading, Button } from "@chakra-ui/react";
import { useState } from "react";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";

const Auth = () => {
  const [signIn, setSignIn] = useState(true);
  return (
    <>
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
    </>
  );
};

export default Auth;
