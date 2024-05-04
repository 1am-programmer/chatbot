import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import "@chatscope/chat-ui-kit-style/dist/default/style.min.css";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

function App() {
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: "Hello I am Daniel's AI",
      direction: "incoming",
      user: "Hi",
    },
  ]);

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing",
    };
    const newMessages = [...messages, newMessage];
    // To update messages state with new message
    setMessages(newMessages);
    //Set a typing indicator
    setTyping(true);

    //process message to chatGPT (send it over & see response)
    await processMessageTochatGPT(newMessages);
  };
  async function processMessageTochatGPT(chatMessages) {
    //chatMessages { sender: "user" or "chatGPT", message: "The message content here"}
    //apiMessages { role: "user" or assistant, content: "The message content here" }

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "Daniel's AI") {
        role = "assistant";
      } else {
        role = "user";
      }
      return {
        role: role,
        content: messageObject.message,
      };
    });
    //role = "user" -> message from the user,"assistant" -> Message from chatGpt
    //"System" -> generally one that initial message defining How we want chatgpt to talk

    const systemMesssage = {
      role: "system",
      content: "Speak like a Nigga", //Speak like a pirate, explain like i have 10 years of experience
    };

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        systemMesssage,
        ...apiMessages,
        //[message1,message2,message3]
      ],
    };

    //send message to chatGPT
    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + import.meta.env.VITE_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        // console.log(data.choices[0].messages.content);
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: "Daniel's Ai",
            direction: "incoming",
          },
        ]);
        setTyping(false);
      });
  }
  return (
    <div className=" ">
      <div className="flex flex-col overflow-hidden h-screen">
        <h1 className="font-bold text-2xl py-2 md:text-3xl lg:text-3xl text-center text-blue-400">
          Daniel's AI{" "}
        </h1>

        <MainContainer>
          <ChatContainer>
            <MessageList
              scrollBehavior="smooth"
              typingIndicator={
                typing ? (
                  <TypingIndicator content="Daniel's Ai is typing" />
                ) : null
              }
            >
              {messages.map((message, index) => {
                return <Message key={index} model={message} />;
              })}
            </MessageList>
            <MessageInput
              placeholder="Talk to Daniel's ai"
              // className="mt-auto"
              onSend={handleSend}
            />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}

export default App;
