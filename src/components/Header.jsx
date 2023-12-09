import { Box, Flex, Heading, Spacer, ButtonGroup, Button } from "@chakra-ui/react";
import { useSelector } from "react-redux";

export default function Header() {
  const auth = useSelector((state) => state.auth);
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
            <Button colorScheme="red" size={"sm"}>
              Log Out
            </Button>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
