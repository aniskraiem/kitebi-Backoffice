import React, { useState, useRef, useEffect}  from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NotificationAlert from "react-notification-alert";
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
import { data } from "jquery";

  function EditBook() {
    const { bookId } = useParams();
    const [startDate, setStartDate] = useState(new Date());
    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState(null);
    const [PDFName, setPDFName] = useState(null);
    const [book, setBook] = useState({});
    const title = useRef();
    const author = useRef();
    const pegi = useRef();
    const onImageChange = (event) => {
      if (event.target.files && event.target.files[0]) {
        setImage(URL.createObjectURL(event.target.files[0]));
       // console.log(event.target.files[0].name)
        setImageName(event.target.files[0].name);
      }
     }
     const onPDFChange = (event) => {
      if (event.target.files && event.target.files[0]) {
        setPDFName(event.target.files[0].name)
      }
     }

     const onImageChange1 = (event) => {
      if (event.target.files && event.target.files[0]) {
       console.log(event.target.files[0])
      }
     }

     useEffect(() => {
        axios
        .get("/book/one/"+bookId)
        .then((res) => {
          console.log(bookId)
          console.log(res.data.book);
          setBook(res.data.book);
        })
        .catch((err) => console.log(err));
    }, []);

     const editBook = (e) =>{
      if(title.current.value && author.current.value && pegi.current.value)
       {fetch("/book/one", {
         method: "PUT",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
           _id:bookId,
           title:title.current.value,
           author:author.current.value,
           releaseDate:startDate,
           pegi:pegi.current.value,
           coverId: imageName,
           pdfId: PDFName,
         }),
       })
         .then((res) => res.json())
         .then((res) => {
           if (res.message === "Book updated successfully") {
             console.log("tbadel");
             setTimeout(function(){
              window.location.href='/admin/bookList';
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
       var type = "info";
       var options = {};
       options = {
         place: place,
         message: (
           <div>
             <div>
             Book updated successfully .
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
                  <Card.Title as="h4">Edit Book</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Form>
                    <Row>
                      <Col className="pr-1" md="6">
                        <Form.Group>
                          <label>Book Name</label>
                          <Form.Control
                            placeholder="Book ..."
                            defaultValue={book.title}
                            type="text"
                            ref={title}
                            required
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <Form.Group>
                          <label>Author</label>
                          <Form.Control
                            placeholder="author"
                            type="text"
                            defaultValue={book.author}
                            ref={author}
                            required
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                      <label>release Date</label>
                      <DatePicker selected={startDate} onChange={(date:Date) => setStartDate(date)} />
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="6">
                        <Form.Group>
                          <label>Minimum Age</label>
                          <Form.Control
                            placeholder="Age"
                            type="number"
                            defaultValue={book.pegi}
                            ref={pegi}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                       
                          <label>Book cover</label><br/>
                          <i aria-hidden="true" className="nc-icon  nc-album-2"></i> <input type="file" onChange={onImageChange} className="filetype" />
                          <img src={image} alt="preview image" width="400" height="200" />
                         
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                       
                          <label>Book PDF</label><br/>
                          <i aria-hidden="true" className="nc-icon nc-paper-2"></i> <input type="file" onChange={onPDFChange} className="filetype" />
                       
                      </Col>
                    </Row>
                    <Button
                     background="#7371B4"
                      className="btn-fill pull-right"
                      type="button"
                      variant="info"
                      onClick={editBook}
                    >
                      Edit Book
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

export default EditBook;