import React, { useEffect, useState } from "react";
import axios from "axios";
import dateFormat from 'dateformat';
import NotificationAlert from "react-notification-alert";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";
function UserList() {
  const [users, setUser] = useState([]);
  useEffect(() => {
    axios
      .get("/user/all")
      .then((res) => {
        console.log(res)
        // setnbComment(res.data.comment.length);
        setUser(res.data.users);
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteUser = (e) =>{
     fetch("/user/one", {
       method: "DELETE",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({
         _id:e._id,
       }),
     })
       .then((res) => res.json())
       .then((res) => {
         if (res.message === "Users" + e._id + " have been deleted") {
           console.log("tfasakh");
           let newUser = users.filter((item)=>{
             return item!=e
           })
           setUser(newUser);
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
     var type = "danger";
     var options = {};
     options = {
       place: place,
       message: (
         <div>
           <div>
           <b>warning</b> User deleted !
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
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Our Users </Card.Title>
                <p className="card-category">
                  Here is our Users
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">First Name</th>
                      <th className="border-0">Last Name</th>
                      <th className="border-0">Birthday</th>
                      <th className="border-0">Email</th>
                      <th className="border-0">region</th>
                      <th className="border-0"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr>
                        <td>{user.firstname}</td>
                        <td>{user.lastname}</td>
                        <td>{dateFormat(user.birthdate, "mmm d, yyyy")}</td>
                        <td>{user.email}</td>
                        <td>{user.region}</td>
                        <td>
                          <Button
                            className="btn-fill pull-right"
                            type="submit"
                            variant="info"
                            onClick={() =>window.location.href='/admin/editUser/'+user._id}>
                            <i className="nc-icon nc-settings-tool-66"></i>
                          </Button>
                          <Button
                            className="btn-fill pull-right"
                            margin="10"
                            type="submit"
                            variant="danger"
                            onClick={() => deleteUser(user)}>
                            <i className="nc-icon nc-simple-remove"></i>
                          </Button>
                        </td>
                      </tr>))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default UserList;
