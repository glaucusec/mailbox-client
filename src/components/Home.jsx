import React from "react";
import Header from "./Header";
import ComposeMail from "./ComposeMail";
import NavBar from "./NavBar";
import MainContent from "./MainContent";
import { Flex } from "@chakra-ui/react";

export default function Home() {
  return (
    <>
      <Header />
      <Flex>
        <NavBar />
        <MainContent />
      </Flex>
    </>
  );
}
