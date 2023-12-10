import React, { useState, useEffect } from "react";
import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Button,
  Center,
  Heading,
  Icon,
} from "@chakra-ui/react";
import axios from "axios";
import { useSelector } from "react-redux";
import { MdMarkEmailUnread, MdDelete } from "react-icons/md";
import { FaCircle } from "react-icons/fa";
import { mailActions } from "../context/Mails";
import { authActions } from "../context/Auth";
import { useDispatch } from "react-redux";

export default function Inbox() {
  const dispatch = useDispatch();
  const mails = useSelector((state) => state.mails);
  const inbox = mails.inbox;
  const auth = useSelector((state) => state.auth);

  const soloMailViewHandler = async (mailData, key) => {
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
  };

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
              <Tr key={key} cursor={"pointer"} onClick={() => soloMailViewHandler(inbox[key], key)}>
                <Td>{inbox[key].seen == false ? <Icon as={FaCircle} color={"blue"} /> : ""}</Td>
                <Td>{inbox[key].emailSubject}</Td>
                <Td>{inbox[key].senderEmail}</Td>
                <Td>{inbox[key].date}</Td>
                <Td>
                  <Button>
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
