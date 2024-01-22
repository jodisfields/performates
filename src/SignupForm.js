import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  useToast,
} from "@chakra-ui/react";

const SignupForm = () => {
  const [formData, setFormData] = useState({ email: "", name: "" });
  const toast = useToast();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventId = "806319211467";
    const eventbriteToken = process.env.REACT_APP_EVENTBRITE_TOKEN;
    const url = `https://www.eventbriteapi.com/v3/events/${eventId}/?token=${eventbriteToken}`;

    const attendeeData = {
      attendee: {
        profile: {
          email: formData.email,
          name: formData.name,
        },
      },
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(attendeeData),
      });

      if (!response.ok) {
        throw new Error(
          "Eventbrite API request failed: " + response.statusText
        );
      }

      toast({
        title: "Registration Successful",
        description: "You have been successfully registered.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error during Eventbrite API request:", error);
      toast({
        title: "Registration Failed",
        description:
          "There was a problem registering your information. " + error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4} maxW="md" borderWidth="1px" borderRadius="lg">
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl mt={4} isRequired>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </FormControl>

        <Button mt={4} colorScheme="teal" type="submit">
          Register
        </Button>
      </form>
    </Box>
  );
};

export default SignupForm;
