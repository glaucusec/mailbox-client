import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Link as Clink } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

export default function SignUp() {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordChangeHandler = (e, confirm) => {
    if (confirm) {
      setConfirmPassword(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
        { email: email, password: password, returnSecureToken: true },
        {
          "Content-Type": "application/json",
        }
      );
      if (response.status == 200) {
        toast({
          title: "You signed up! Please login",
        });
      }
    } catch (error) {
      if (error) {
        toast({
          title: error.response.data.error.message,
        });
      }
    }
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} minW={"lg"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign Up</Heading>
        </Stack>
        <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
          <form onSubmit={submitHandler}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" onChange={emailChangeHandler} />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" onChange={passwordChangeHandler} />
              </FormControl>
              <FormControl id="password2">
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => passwordChangeHandler(e, true)}
                />
              </FormControl>
              <Stack spacing={10}>
                <Button
                  type={"submit"}
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign Up
                </Button>
              </Stack>
            </Stack>
          </form>
          <Link to={"/login"}>
            <Clink>Already registered? Login here...</Clink>
          </Link>
        </Box>
      </Stack>
    </Flex>
  );
}
