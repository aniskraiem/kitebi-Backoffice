import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
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
  const { userId } = useParams();
  const [startDate, setStartDate] = useState(new Date());
  const [currentOption, setCurrentOption] = useState('test');
  const [gender, setgender] = useState('');
  const [password, sertPassword] = useState();
  const [user, setUser] = useState({});
  const email = useRef();
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

  const onChange1 = (event) => {
      
    setgender(event.target.value)
      console.log(event.target)
    
  }

  useEffect(() => {
    axios
    .get("/user/one/"+userId)
    .then((res) => {
      console.log(userId)
      console.log(res.data.user);
      setUser(res.data.user);
      setCurrentOption(res.data.user.region);
      sertPassword(res.data.user.password)
    })
    .catch((err) => console.log(err));
}, []);

  const handleUser = (e) =>{
    fetch("/user/one", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id:userId,
        email: email.current.value,
        password:password,
        firstname: firstname.current.value,
        lastname: lastname.current.value,
        birthdate: startDate,
        lib: lib.current.value,
        region: currentOption,
        city: city.current.value,
        gender:gender,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        if (res.message === "User updated successfully") {
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
      .catch((err) => console.log(err));
  }

  const notificationAlertRef = React.useRef(null);
  const notify = (place) => {
    var type = "info";
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>
          User updated successfully.
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
                <Card.Title as="h4">Edit User</Card.Title>
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
                          defaultValue={user.firstname}
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
                          defaultValue={user.lastname}
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
                          defaultValue={user.email}
                          ref={email}
                          required
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group>
                        <label>Password</label>
                        <Form.Control
                        disabled
                          placeholder="Password..."
                          type="text"
                          defaultValue={user.password}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <label>Region</label><br/>
                      <Select onChange={handleChange} options={options} placeholder={user.region}/>
                    </Col>
                    <Col md="6">
                      <Form.Group>
                        <label>City</label>
                        <Form.Control
                          placeholder="City..."
                          type="text"
                          defaultValue={user.city}
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
                          defaultValue={user.lib}
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
                    Edit User
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          {/* <Col md="4">
            <Card className="card-user">
              <div className="card-image">
                <img
                  alt="..."
                  src={
                    require("assets/img/photo-1431578500526-4d9613015464.jpeg")
                      .default
                  }
                ></img>
              </div>
              <Card.Body>
                <div className="author">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={require("assets/img/faces/face-3.jpg").default}
                    ></img>
                    <h5 className="title">Mike Andrew</h5>
                  </a>
                  <p className="description">michael24</p>
                </div>
                <p className="description text-center">
                  "Lamborghini Mercy <br></br>
                  Your chick she so thirsty <br></br>
                  I'm in that two seat Lambo"
                </p>
              </Card.Body>
              <hr></hr>
              <div className="button-container mr-auto ml-auto">
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-facebook-square"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-twitter"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-google-plus-square"></i>
                </Button>
              </div>
            </Card>
          </Col> */}
        </Row>
      </Container>
    </>
  );
}

export default User;
