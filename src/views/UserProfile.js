import React, { useEffect, useState, useRef } from "react";
import { Dropdown } from "react-bootstrap";
import Select from 'react-select';
import NotificationAlert from "react-notification-alert";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

function User() {
  const [startDate, setStartDate] = useState(new Date());
  const [currentOption, setCurrentOption] = useState('test');
  const [gender, setgender] = useState('');
  const email = useRef();
  const password = useRef();
  const firstname = useRef();
  const lastname = useRef();
  const lib = useRef();
  const city = useRef();
  const options = [
    { value: 'Tunis', label: 'Tunis' },
    { value: 'Monastir', label: 'Monastir' },
    { value: 'Sousse', label: 'Sousse' }
  ];

  const handleChange = (event) => {

    setCurrentOption(event.value)
    console.log(event.value)

  }

  const handleShow1 = () => {
    this.setState({
       show1: true
    })
  
    setTimeout(() => {
       this.setState({
           show1: false
       })
    }, 2000)
  }

  const onChange1 = (event) => {

    setgender(event.target.value)
    console.log(event.target.value)

  }

  const handleUser = (e) => {
    console.log(currentOption);
    if(email.current.value && password.current.value && firstname.current.value && lastname.current.value && lib.current.value && city.current.value)
    {fetch("/user/one", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.current.value,
        password: password.current.value,
        firstname: firstname.current.value,
        lastname: lastname.current.value,
        birthdate: startDate,
        lib: lib.current.value,
        way_signup: 1,
        region: currentOption,
        city: city.current.value,
        gender: gender,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message === "User added successfully") {
          console.log(res);
          setTimeout(function(){
            window.location.href='/admin/userList';
         }, 1500);
         notify("tc");
        } else if (res.errors) {
          let errors = Object.values(res.errors);
          setMessage(errors);
        }
      })
      .catch((err) => console.log(err));}
      else{
        notify1("tc");
      }
  }

  const notificationAlertRef = React.useRef(null);
  const notify = (place) => {
    var type = "success";
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>
          User added successfully
          </div>
        </div>
      ),
      type: type,
      icon: "nc-icon nc-bell-55",
      autoDismiss: 7,
    };
    notificationAlertRef.current.notificationAlert(options);
  };
  const notify1 = (place,type) => {
    var type = "danger";
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>
            <b>Warning</b> check the fields !
          </div>
        </div>
      ),
      type: type,
      icon: "nc-icon nc-bell-55",
      autoDismiss: 7,
    };
    notificationAlertRef.current.notificationAlert(options);
  };

  return (
    <>
     <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Add User</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>First Name</label>
                        <Form.Control
                          placeholder="Company"
                          type="text"
                          ref={firstname}
                          required
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Last Name</label>
                        <Form.Control
                          placeholder="Last Name"
                          type="text"
                          ref={lastname}
                          required
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">
                          Email address
                        </label>
                        <Form.Control
                          placeholder="Email"
                          type="email"
                          ref={email}
                          required
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group>
                        <label>Password</label>
                        <Form.Control
                          placeholder="Password..."
                          type="text"
                          ref={password}
                          required
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <label>Region</label><br />
                      <Select onChange={handleChange} options={options} />
                    </Col>
                    <Col md="6">
                      <Form.Group>
                        <label>City</label>
                        <Form.Control
                          placeholder="City..."
                          type="text"
                          ref={city}
                          required
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <Form.Group>
                        <label>Librery ID</label>
                        <Form.Control
                          placeholder="Librery..."
                          type="number"
                          ref={lib}
                          required
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>birthday</label>
                        <DatePicker selected={startDate} onChange={(date: Date) => setStartDate(date)} />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>gender</label><br />
                        <input type="radio" value="Male" name="gender" onChange={onChange1} /> Male <tr />
                        <input type="radio" value="Female" name="gender" onChange={onChange1} /> Female
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill pull-right"
                    type="button"
                    variant="info"
                    onClick={handleUser}
                  >
                    Add User
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default User;
