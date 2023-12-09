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
  Icon,
} from "@chakra-ui/react";
import axios from "axios";
import { useSelector } from "react-redux";
import { MdMail, MdDelete } from "react-icons/md";

export default function Inbox() {
  const auth = useSelector((state) => state.auth);
  const [sentbox, setSentbox] = useState({});

  useEffect(() => {
    (async function fetchInbox() {
      const response = await axios.get(
        `https://mailbox-00-default-rtdb.firebaseio.com/${auth.email.replace(
          /\./g,
          ""
        )}/sentbox.json`
      );
      setSentbox(response.data);
    })();
  }, []);

  if (sentbox == null || !sentbox) {
    return (
      <Center>
        <Heading as="h2" size="sm">
          You haven't sent any mails!
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
            <Th>To</Th>
            <Th>Subject</Th>
            <Th>Date</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {Object.keys(sentbox).map((key) => {
            return (
              <Tr>
                <Td>
                  <Icon as={MdMail} />
                </Td>
                <Td>{sentbox[key].senderEmail}</Td>
                <Td>{sentbox[key].emailSubject}</Td>
                <Td>{sentbox[key].date}</Td>
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
