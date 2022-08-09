import React, { useState, useRef }  from "react";
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
  import NotificationAlert from "react-notification-alert";
  import DatePicker from "react-datepicker";
  import { useTranslation } from 'react-i18next';//
  import i18next from "i18next";//

  function Book() {
    const [startDate, setStartDate] = useState(new Date());
    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState(null);
    const [PDFName, setPDFName] = useState(null);
    const title = useRef();
    const author = useRef();
    const pegi = useRef();
    const { t, i18n } = useTranslation()//

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

     const handleBook = (e) =>{
      if(title.current.value && author.current.value && pegi.current.value)
      {fetch("/book/one", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
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
          if (res.message === "Book added successfully") {
            setTimeout(function(){
              window.location.href='/admin/bookList';
           }, 1500);
           
            console.log(res);
            notify("tc");
          } else if (res.errors) {
            let errors = Object.values(res.errors);
            setMessage(errors);
          }
        })
        .catch((err) => console.log(err));
      }
      else{
        notify1("tc");
      }
    }

    const notificationAlertRef = React.useRef(null);
  const notify = (place,type) => {
    var type = "success";
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>
          Book added successfully .
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
                  <Card.Title as="h4">{i18next.t('add book')}</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Form>
                    <Row>
                      <Col className="pr-1" md="6">
                        <Form.Group>
                          <label>{i18next.t('book title')}</label>
                          <Form.Control
                            placeholder="Book ..."
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
                          <label>{i18next.t('author')}</label>
                          <Form.Control
                            placeholder="author"
                            type="text"
                            ref={author}
                            required
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                      <label>{i18next.t('release date')}</label>
                      <DatePicker selected={startDate} onChange={(date:Date) => setStartDate(date)} />
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="6">
                        <Form.Group>
                          <label>{i18next.t('minimum age')}</label>
                          <Form.Control
                            placeholder="Age"
                            type="number"
                            ref={pegi}
                            required
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                       
                          <label>{i18next.t('book cover')}</label><br/>
                          <i aria-hidden="true" className="nc-icon  nc-album-2"></i> <input type="file" onChange={onImageChange} className="filetype" />
                          <img src={image} alt="preview image" width="400" height="200" />
                         
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                       
                          <label>{i18next.t('book pdf')}</label><br/>
                          <i aria-hidden="true" className="nc-icon nc-paper-2"></i> <input type="file" onChange={onPDFChange} className="filetype" />
                       
                      </Col>
                    </Row>
                    {/* <Row>
                      <Col md="12">
                       
                          <label>{i18next.t('audiobook')}</label><br/>
                          <i aria-hidden="true" className="nc-icon nc-audio-92"></i> <input type="file" className="filetype" />
                       
                      </Col>
                    </Row> */}
                    <Button
                     background="#7371B4"
                      className="btn-fill pull-right"
                      type="button"
                      variant="info"
                      onClick={handleBook}
                    >
                     {i18next.t('add book')}
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

export default Book;