import { Link } from "react-router-dom";
// import { Image } from "cloudinary-react";
// import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import * as ReactBootStrap from "bootstrap";
import { MDBCard, MDBCardBody, MDBCardText, MDBCardImage } from 'mdb-react-ui-kit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';

import PlayCircleIcon from '@mui/icons-material/PlayCircle';


import { Card, Button } from "react-bootstrap";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { FavoriteBorder } from "@material-ui/icons";


function AudioBooks() {

    const PER_PAGE = 6;
    const [currentPage, setCurrentpage] = useState(0);
    const [fav, setFav] = useState([{}]);
    const [audiobooks, setAudioBooks] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/audiobook/all")
            .then((res) => {
                console.log(res)
                setAudioBooks(res.data.audiobooks);
            })
            .catch((err) => console.log(err));
    }, []);

    const addToFavAudioBookList = async (AudiobookId, userId) =>
        await axios.post(`http://localhost:5000/audiobook/favoriteAudiobooks/` + userId + `/` + AudiobookId)


    function handlepageClick({ selected: selectedPage }) {
        console.log("seletedPage", selectedPage);
        setCurrentpage(selectedPage);
    }

    const offset = currentPage * PER_PAGE;



    const pageCount = Math.ceil(audiobooks.length / PER_PAGE);


    function handlefav(AudiobookId) {
        let array = fav
    
    
        array.push(...[AudiobookId])
    
        setFav([...array])
        localStorage.setItem("fav", JSON.stringify(fav));
      }
    

    return (
        <>

            <div className="containerr" >

                {audiobooks.slice(offset, offset + PER_PAGE).map((audiobook, i) => (
                    <div className="col-lg-3 col-sm-6" key={audiobook._id} style={{ marginLeft: "50px" }}>


                        <Card style={{ width: '18rem', height: '29rem' }} className="shadow  bg-white rounded">

                            <Card.Img style={{ marginBottom: "-43px", marginLeft: "-1px", width: "18rem", height: '25rem' }} variant="top" src={require('./e.jpeg')} />

                            <IconButton aria-label="add to favorites" onClick={() => {
                                const userId = (JSON.parse(localStorage.getItem("user")))
                                addToFavAudioBookList(userId.user._id, audiobook._id)
                                console.log(userId.user._id)
                                handlefav(audiobook._id);
                  
                            }}  >   {fav.includes(audiobook._id) ? (
                                <FavoriteIcon style={{ marginTop: "-680px", marginLeft: "250px", width: "2rem", height: "18rem" }} color="primary" />
                                ) : (
                
                                  <FavoriteBorder style={{ marginTop: "-680px", marginLeft: "250px", width: "2rem", height: "18rem" }} color="primary" />
                                )}                            </IconButton>

                            <Button style={{ marginTop: "-370px", width: "270px", backgroundColor: "transparent", border: "transparent", height: "45rem" }}>
                                <PlayCircleIcon style={{ marginTop: "70px", width: "3rem", height: "18rem" }} />
                            </Button>
                            <Card.Body>
                                <Card.Title style={{ marginLeft: "-10px", marginTop: "20px", height: "18rem", backgroundColor: "transparent", border: "transparent" }}>
                                    {audiobook.title}</Card.Title>
                                <Card.Text style={{ marginLeft: "-8px", marginTop: "-270px", height: "18rem", backgroundColor: "transparent", border: "transparent" }}>
                                    By {audiobook.author}
                                </Card.Text>
                                <Card.Text style={{ marginLeft: "190px", marginTop: "-310px", height: "18rem", backgroundColor: "transparent", border: "transparent" }}>
                                    3 min
                                </Card.Text>
                            </Card.Body>

                        </Card>
                    </div>
                ))}
            </div >
            <div className="paginate">
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlepageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                    className="pagination"


                />
            </div>
        </>
    );
}
console.log("audio")
export default AudioBooks;


