import React, { useState, useEffect } from "react";
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Button,
  Center,
  Heading,
  Icon,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { FaCircle } from "react-icons/fa";
import { mailActions } from "../context/Mails";
import { authActions } from "../context/Auth";
import { useDispatch } from "react-redux";

export default function Inbox() {
  const toast = useToast();
  const dispatch = useDispatch();
  const mails = useSelector((state) => state.mails);
  const inbox = mails.inbox;
  const auth = useSelector((state) => state.auth);

  const handleTrClick = (e, emailData, key) => {
    if (!e.target.closest("button")) {
      soloMailViewHandler(emailData, key);
    }
  };

  async function soloMailViewHandler(mailData, key) {
    // make the mail as viewed
    try {
      await axios.patch(
        `https://mailbox-00-default-rtdb.firebaseio.com/${auth.email.replace(
          /\./g,
          ""
        )}/mailbox/${key}.json`,
        { seen: true }
      );
    } catch (error) {
      console.log(error);
    }
    // store the solo mail data.
    dispatch(mailActions.setSoloMail(mailData));
    // change the page to mailview.
    dispatch(authActions.updatePage("mailview"));
  }

  async function mailDeleteHandler(key) {
    try {
      const response = await axios.delete(
        `https://mailbox-00-default-rtdb.firebaseio.com/${auth.email.replace(
          /\./g,
          ""
        )}/mailbox/${key}.json`
      );
      if (response.status === 200) {
        toast({
          title: "Mail Deleted.",
          description: "The selected mail has been successfully deleted.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }

      dispatch(mailActions.deleteMail(key));
    } catch (err) {
      toast({
        title: "Error!",
        description: "Something went wrong...",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.log(err);
    }
  }

  if (inbox == null || !inbox) {
    return (
      <Center>
        <Heading as="h2" size="sm">
          You have no mails!
        </Heading>
      </Center>
    );
  }
  return (
    <TableContainer>
      <Table variant={"striped"}>
        <Thead>
          <Tr>
            <Th></Th>
            <Th>Subject</Th>
            <Th>Sender</Th>
            <Th>Date</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {Object.keys(inbox).map((key) => {
            return (
              <Tr key={key} cursor={"pointer"} onClick={(e) => handleTrClick(e, inbox[key], key)}>
                <Td>{inbox[key].seen == false ? <Icon as={FaCircle} color={"blue"} /> : ""}</Td>
                <Td>{inbox[key].emailSubject}</Td>
                <Td>{inbox[key].senderEmail}</Td>
                <Td>{inbox[key].date}</Td>
                <Td>
                  <Button onClick={() => mailDeleteHandler(key)}>
                    <Icon as={MdDelete} />
                  </Button>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
