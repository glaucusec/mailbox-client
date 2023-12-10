import React from "react";
import { useSelector } from "react-redux";
import { Box, VStack, StackDivider } from "@chakra-ui/react";
import DOMPurify from "dompurify";

export default function SoloMailView() {
  const mails = useSelector((state) => state.mails);
  const mail = mails.soloMail;
  const sanitizedHTML = DOMPurify.sanitize(mail.emailDescription);
  return (
    <Box pt={"25px"}>
      <VStack divider={<StackDivider borderColor="gray.100" />} spacing={1} align="stretch">
        <Box h="40px">From: {mail.senderEmail}</Box>
        <Box h="40px">Subject: {mail.emailSubject}</Box>
        <Box h="40px">
          <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
        </Box>
      </VStack>
    </Box>
  );
}
