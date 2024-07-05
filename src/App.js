import './App.css';
import React, { useState } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import WaitingRoom from './components/waitingroom';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

function App() {
  const [conn, setConnection] = useState(null);

  const joinChatRoom = async (username, chatroom) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("http://localhost:5158/chat", {
          withCredentials: true // Enable credentials if needed
        })
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("JoinSpecificChatRoom", (username, msg) => {
        console.log("msg: " + msg);
      });

      await connection.start();
      await connection.invoke("JoinSpecificChatRoom", { username, chatroom });

      setConnection(connection);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <main>
        <Container>
          <Row className='px-5 my-5'>
            <Col xs={12}>
              <h1 className='font-weight-light'>
                Welcome to F1 chat app
              </h1>
              <WaitingRoom joinChatRoom={joinChatRoom} />
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}

export default App;
