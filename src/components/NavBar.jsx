import React from "react";
import { Flex, Box, Badge, Center, List, ListItem, Icon } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

import { MdAdd, MdInbox, MdMarkEmailRead } from "react-icons/md";
import { authActions } from "../context/Auth";
import { mailActions } from "../context/Mails";
import { useDispatch, useSelector } from "react-redux";

export default function NavBar() {
  const mails = useSelector((state) => state.mails);
  const inbox = mails.inbox;
  const inboxMessageCount = Object.keys(inbox).length;
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
            <Badge colorScheme="red">{inboxMessageCount} mails</Badge>
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
