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

export default function Inbox() {
  const auth = useSelector((state) => state.auth);
  const [inbox, setInbox] = useState({});

  useEffect(() => {
    (async function fetchInbox() {
      const response = await axios.get(
        `https://mailbox-00-default-rtdb.firebaseio.com/${auth.email.replace(
          /\./g,
          ""
        )}/mailbox.json`
      );
      setInbox(response.data);
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
              <Tr>
                <Td>
                  <Icon as={MdMarkEmailUnread} />
                </Td>
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
