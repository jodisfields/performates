import React from "react";
import { Box, Container } from "@chakra-ui/react";
import SignupForm from "./SignupForm";

function App() {
  return (
    <Container maxW="container.md">
      <Box mt={10} textAlign="center">
        <SignupForm />
      </Box>
    </Container>
  );
}

export default App;
