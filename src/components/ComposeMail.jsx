import React, { useState } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Box, Input, Button } from "@chakra-ui/react";
import { convertToHTML } from "draft-convert";
import axios from "axios";
import { useSelector } from "react-redux";

export default function ComposeMail() {
  const auth = useSelector((state) => state.auth);
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [receiverEmail, setReceiverEmail] = useState("");
  const [subject, setSubject] = useState("");

  const receiverEmailChangeHandler = (e) => {
    setReceiverEmail(e.target.value);
  };

  const subjectChangeHandler = (e) => {
    setSubject(e.target.value);
  };

  async function composeAndSendMail() {
    const emailDescriptionInHTML = convertToHTML(editorState.getCurrentContent());
    // date and time details
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const formattedTime = currentDate.toLocaleTimeString();
    try {
      const [response1, response2] = await Promise.all([
        axios.post(
          `https://mailbox-00-default-rtdb.firebaseio.com/${auth.email.replace(
            /\./g,
            ""
          )}/sentbox.json`,
          {
            date: formattedDate + " " + formattedTime,
            emailDescription: emailDescriptionInHTML,
            emailSubject: subject,
            receiverEmail: receiverEmail, // Update this with the actual receiver's email
            senderEmail: auth.email,
          }
        ),
        axios.post(
          `https://mailbox-00-default-rtdb.firebaseio.com/${receiverEmail.replace(
            /\./g,
            ""
          )}/mailbox.json`,
          {
            date: formattedDate + " " + formattedTime,
            emailDescription: emailDescriptionInHTML,
            emailSubject: subject,
            receiverEmail: receiverEmail, // Update this with the actual receiver's email
            seen: false,
            senderEmail: auth.email,
          }
        ),
      ]);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Box>
      <Input onChange={receiverEmailChangeHandler} variant="flushed" placeholder="To: " />
      <Input onChange={subjectChangeHandler} variant="flushed" placeholder="Subject: " />
      <Editor editorState={editorState} onEditorStateChange={setEditorState} />
      <Button size={"sm"} colorScheme="blue" onClick={composeAndSendMail}>
        Send
      </Button>
    </Box>
  );
}
