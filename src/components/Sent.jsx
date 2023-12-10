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
  Center,
  Heading,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { MdMail, MdDelete } from "react-icons/md";

export default function Inbox() {
  const sentbox = useSelector((state) => state.mails.sentbox);

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
