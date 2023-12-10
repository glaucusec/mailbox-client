import React, { useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import ComposeMail from "./ComposeMail";
import Inbox from "./Inbox";
import Sent from "./Sent";
import SoloMailView from "./SoloMailView";
import { mailActions } from "../context/Mails";
import { authActions } from "../context/Auth";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";

export default function MainContent() {
  const auth = useSelector((state) => state.auth);
  const currPage = auth.currPage;

  const dispatch = useDispatch();

  useEffect(() => {
    (async function fetchInbox() {
      const response = await axios.get(
        `https://mailbox-00-default-rtdb.firebaseio.com/${auth.email.replace(
          /\./g,
          ""
        )}/mailbox.json`
      );
      dispatch(mailActions.setInbox(response.data));
    })();
  }, []);

  useEffect(() => {
    (async function fetchInbox() {
      const response = await axios.get(
        `https://mailbox-00-default-rtdb.firebaseio.com/${auth.email.replace(
          /\./g,
          ""
        )}/sentbox.json`
      );
      dispatch(mailActions.setSentBox(response.data));
    })();
  }, []);

  return (
    <Box flex="1">
      {currPage == "mailview" && <SoloMailView />}
      {currPage == "compose" && <ComposeMail />}
      {currPage == "inbox" && <Inbox />}
      {currPage == "sent" && <Sent />}
    </Box>
  );
}
