import React from "react";
import { Box, Text } from "@chakra-ui/react";
import ComposeMail from "./ComposeMail";
import Inbox from "./Inbox";
import Sent from "./Sent";
import SoloMailView from "./SoloMailView";

import { useDispatch, useSelector } from "react-redux";

export default function MainContent() {
  const currPage = useSelector((state) => state.auth.currPage);

  const dispatch = useDispatch();

  return (
    <Box flex="1">
      {currPage == "mailview" && <SoloMailView />}
      {currPage == "compose" && <ComposeMail />}
      {currPage == "inbox" && <Inbox />}
      {currPage == "sent" && <Sent />}
    </Box>
  );
}
