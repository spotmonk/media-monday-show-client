import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Label, Input, FormGroup } from 'reactstrap';
import { useHistory } from 'react-router'

export const LoginModal = (props) => {
  const {
    buttonLabel,
    className,
    color
  } = props;
  const history = useHistory()
  const [modal, setModal] = useState(false);
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [invalid, setInvalid] = useState(false)

  const toggle = () => setModal(!modal);

  const logIn = () =>{
    
    setInvalid(false)
    return fetch("http://localhost:8000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                username,
                password,
            })
        })
            .then(res => res.json())
            .then(res => {
                if ("valid" in res && res.valid) {
                    localStorage.setItem("token", res.token)
                    history.push('/')
                }
                else {
                   setInvalid(true)
                }
            })
  }
  return (
    <div>
      <Button color={color} onClick={toggle} className="mr-4">{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Log In</ModalHeader>
        <ModalBody>
        <Form>
                <FormGroup>
                  <Label for="usernameInput">
                    Name:
                  </Label>
                  <Input type="text" name="usernameInput" id="usernameInput" placeholder="Enter your User Name" onChange={ e => setUserName(e.target.value)}/>
                  <Label for="passwordInput">
                    Password:
                  </Label>
                  <Input type="password" name="passwordInput" id="passwordInput" placeholder="Enter your password" onChange={ e => setPassword(e.target.value)}/>
                  {invalid ? 
                    <Label>
                    Invalid Username or Password
                    </Label>
                    :
                    null}
                </FormGroup>
              </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={logIn}>Log In</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default LoginModal;