import React, { useState } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Box, Input, Button } from "@chakra-ui/react";
import { convertToHTML } from "draft-convert";
import axios from "axios";

export default function ComposeMail() {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [senderEmail, setSenderEmail] = useState("");
  const [subject, setSubject] = useState("");

  const senderEmailChangeHandler = (e) => {
    setSenderEmail(e.target.value);
  };

  const subjectChangeHandler = (e) => {
    setSubject(e.target.value);
  };

  async function composeAndSendMail() {
    try {
      const emailDescriptionInHTML = convertToHTML(editorState.getCurrentContent());
      // date and time details
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString();
      const formattedTime = currentDate.toLocaleTimeString();

      const response = await axios.post(
        "https://mailbox-00-default-rtdb.firebaseio.com/sentbox.json",
        {
          date: formattedDate + " " + formattedTime,
          emailDescription: emailDescriptionInHTML,
          emailSubject: subject,
          id: "", // You might want to generate a unique ID here
          receiverEmail: "", // Update this with the actual receiver's email
          seen: "unseen",
          senderEmail: senderEmail,
        }
      );

      console.log("Mail sent successfully:", response.data);
    } catch (error) {
      console.error("Error sending mail:", error);
    }
  }

  return (
    <Box>
      <Input onChange={senderEmailChangeHandler} variant="flushed" placeholder="To: " />
      <Input onChange={subjectChangeHandler} variant="flushed" placeholder="Subject: " />
      <Editor editorState={editorState} onEditorStateChange={setEditorState} />
      <Button size={"sm"} colorScheme="blue" onClick={composeAndSendMail}>
        Send
      </Button>
    </Box>
  );
}
