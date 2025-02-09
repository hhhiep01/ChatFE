import { useState } from "react";
import { InputGroup, Button, Form } from "react-bootstrap";

const SendMessageForm = ({ sendMessage }) => {
    const [msg, setMessage] = useState('');

    return (
        <Form onSubmit={e => {
            e.preventDefault();
            sendMessage(msg);
            setMessage('');
        }}>
            <InputGroup>
                <InputGroup.Text>
                    Chat
                </InputGroup.Text>
                <Form.Control
                    onChange={e => setMessage(e.target.value)}
                    value={msg}
                    placeholder="type message"
                />
                <Button variant="primary" type="submit" disabled={!msg}>Send</Button>
            </InputGroup>
        </Form>
    );
}

export default SendMessageForm;
