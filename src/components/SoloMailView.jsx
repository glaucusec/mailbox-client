import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, VStack, StackDivider, Button } from "@chakra-ui/react";
import DOMPurify from "dompurify";
import { authActions } from "../context/Auth";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function SoloMailView() {
  const dispatch = useDispatch();
  const mails = useSelector((state) => state.mails);
  const mail = mails.soloMail;
  const sanitizedHTML = DOMPurify.sanitize(mail.emailDescription);

  const backButtonHandler = () => {
    dispatch(authActions.updatePage("inbox"));
  };

  return (
    <Box pt={"25px"}>
      <VStack divider={<StackDivider borderColor="gray.100" />} spacing={1} align="stretch">
        <Box h="40px">From: {mail.senderEmail}</Box>
        <Box h="40px">Subject: {mail.emailSubject}</Box>
        <Box h="40px">
          <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
        </Box>
      </VStack>

      <Button onClick={backButtonHandler} size={"sm"}>
        <IoMdArrowRoundBack />
        back
      </Button>
    </Box>
  );
}
