import './App.css';
import React, { useState } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import WaitingRoom from './components/waitingroom';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import ChatRoom from './components/ChatRoom';

function App() {
  const [conn, setConnection] = useState(null);
  const [messages, setMessage] = useState([]);
  const joinChatRoom = async (username, chatroom) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:7121/chat", {
          withCredentials: true // Enable credentials if needed
        })
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("JoinSpecificChatRoom", (username, msg) => {
        console.log("msg: " + msg);
      });
      connection.on("ReciveSpecificChatRoom", (username, msg) => {
        setMessage(messages => [...messages, { username, msg }])
      });
      await connection.start();
      await connection.invoke("JoinSpecificChatRoom", { username, chatroom });



      setConnection(connection);
    } catch (err) {
      console.error(err);
    }
  };

  const sendMessage = async (message) => {
    try {
      await conn.invoke("SendMessage", message);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="App">
      <main>
        <Container>
          <Row className='px-5 my-5'>
            <Col xs={12}>
              <h1 className='font-weight-light'>
                Welcome to F1 chat app
              </h1>

            </Col>
          </Row>
          {!conn
            ? <WaitingRoom joinChatRoom={joinChatRoom}></WaitingRoom >
            : <ChatRoom messages={messages} sendMessage={sendMessage} ></ChatRoom>
          }
        </Container>
      </main>
    </div>
  );
}

export default App;