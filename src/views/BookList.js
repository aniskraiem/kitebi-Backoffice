import React, { useEffect, useState } from "react";
import axios from "axios";
import NotificationAlert from "react-notification-alert";
import dateFormat from 'dateformat';
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
function TableList() {
  const [books, setBook] = useState([]);
  useEffect(() => {
    axios
      .get("/book/all")
      .then((res) => {
        console.log(res)
        // setnbComment(res.data.comment.length);
        setBook(res.data.books);
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteBook = (e) =>{
     fetch("/book/one", {
       method: "DELETE",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({
         _id:e._id,
       }),
     })
       .then((res) => res.json())
       .then((res) => {
         if (res.message === "Book deleted") {
           console.log("tfasakh");
           let newBook = books.filter((item)=>{
             return item!=e
           })
           setBook(newBook);
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
             <b>warning</b> Book deleted !
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
                <Card.Title as="h4">Our books </Card.Title>
                <p className="card-category">
                  Here is our available books
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">title</th>
                      <th className="border-0">author</th>
                      <th className="border-0">release Date</th>
                      <th className="border-0">under age</th>
                      <th className="border-0"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {books.map((book) => (
                      <tr>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>{dateFormat(book.releaseDate, "mmm d, yyyy")}</td>
                        <td>{book.pegi}</td>
                        <td>
                          <Button
                            className="btn-fill pull-right"
                            type="submit"
                            variant="info"
                            onClick={() =>window.location.href='/admin/editBook/'+book._id}>
                            <i className="nc-icon nc-settings-tool-66"></i>
                          </Button>
                          <Button
                            className="btn-fill pull-right"
                            margin="10"
                            type="submit"
                            variant="danger"
                            onClick={() => deleteBook(book)}>
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

export default TableList;
