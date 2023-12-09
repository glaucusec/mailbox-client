import React from "react";
import { Flex, Box, Text, Center, List, ListItem, Icon } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

import { MdAdd, MdInbox, MdMarkEmailRead } from "react-icons/md";
import { authActions } from "../context/Auth";
import { useDispatch } from "react-redux";

export default function NavBar() {
  const dispatch = useDispatch();

  const pageChangeHandler = (page) => {
    dispatch(authActions.updatePage(page));
  };

  return (
    <Box p={"10px"} height={"100vh"} w={["", "", "250px", "300px"]}>
      <Center>
        <List spacing={"1rem"}>
          <ListItem>
            <Button
              onClick={() => pageChangeHandler("compose")}
              borderRadius="full"
              width={"200px"}
            >
              <Icon mr={"10px"} as={MdAdd} />
              Compose
            </Button>
          </ListItem>

          <ListItem>
            <Button
              onClick={() => pageChangeHandler("inbox")}
              variant={"ghost"}
              size={"sm"}
              width={"100px"}
            >
              {" "}
              <Icon mr={"10px"} as={MdInbox} />
              Inbox
            </Button>
          </ListItem>
          <ListItem>
            <Button
              onClick={() => pageChangeHandler("sent")}
              variant={"ghost"}
              size={"sm"}
              width={"100px"}
            >
              {" "}
              <Icon mr={"10px"} as={MdMarkEmailRead} />
              Sent
            </Button>
          </ListItem>
        </List>
      </Center>
    </Box>
  );
}
