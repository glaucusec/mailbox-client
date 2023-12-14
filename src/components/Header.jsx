import { Box, Flex, Heading, Spacer, Button } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { authActions } from "../context/Auth";
import { useDispatch } from "react-redux";
import { useToast } from "@chakra-ui/react";

export default function Header() {
  const toast = useToast();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(authActions.remoteAuth());
    toast({
      status: "warning",
      title: "You are logged out!",
    });
  };

  return (
    <Box p={"25px"}>
      <Flex minWidth="max-content" alignItems="center" gap="2">
        <Box p="2">
          <Heading size="md">Welcome to your Mail Box</Heading>
        </Box>

        <Spacer />

        <Flex>
          <Box marginRight="4">{auth.email}</Box>
          <Box>
            <Button onClick={handleLogout} colorScheme="red" size={"sm"}>
              Log Out
            </Button>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
