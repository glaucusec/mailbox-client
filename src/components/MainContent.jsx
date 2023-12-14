import React from "react";
import { Box } from "@chakra-ui/react";
import ComposeMail from "./ComposeMail";
import Inbox from "./Inbox";
import Sent from "./Sent";
import SoloMailView from "./SoloMailView";
import { mailActions } from "../context/Mails";
import useGetAxios from "../hooks/useGetAxios";

import { useDispatch, useSelector } from "react-redux";

export default function MainContent() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const currPage = auth.currPage;
  // fetch mailBox Data
  const mailboxURL = `https://mailbox-00-default-rtdb.firebaseio.com/${auth.email.replace(
    /\./g,
    ""
  )}/mailbox.json`;
  const [mailboxResponse] = useGetAxios(mailboxURL);
  if (mailboxResponse) {
    dispatch(mailActions.setInbox(mailboxResponse.data));
  }
  // fetch sentBox Data
  const sentboxURL = `https://mailbox-00-default-rtdb.firebaseio.com/${auth.email.replace(
    /\./g,
    ""
  )}/sentbox.json`;
  const [sentboxResponse] = useGetAxios(sentboxURL);

  if (sentboxResponse) {
    dispatch(mailActions.setSentBox(sentboxResponse.data));
  }

  return (
    <Box flex="1">
      {currPage == "mailview" && <SoloMailView />}
      {currPage == "compose" && <ComposeMail />}
      {currPage == "inbox" && <Inbox />}
      {currPage == "sent" && <Sent />}
    </Box>
  );
}
