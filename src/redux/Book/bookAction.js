import {
    BOOK_LIST_REQUEST,
    BOOK_LIST_SUCCESS,
    BOOK_LIST_FAIL,
    DELETE_BOOK_REQUEST,
    DELETE_BOOK_SUCCESS,
    DELETE_BOOK_FAIL,
    UPDATE_BOOK_REQUEST,
    UPDATE_BOOK_SUCCESS,
    UPDATE_BOOK_FAIL,
    UPDATE_ERROR,
    DELETE_BOOK
} from './bookConstants'
import history from "../../history.js"
import {Redirect } from "react-router"
import axios from 'axios'



export const booksList = () => async (dispatch) => {
    try {
        dispatch({
            type: BOOK_LIST_REQUEST,
        })

        const { data } = await axios.get(`http://localhost:5000/book/all`)
        dispatch({
            type: BOOK_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: BOOK_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const removeBook = (id) => async (dispatch) => {
    try {
        console.log("first")
        await axios.put(`http://localhost:5000/book/one/delete`)
        dispatch({ type: DELETE_BOOK })
     
    } catch (error) {
       console.log(error)
    }
}




export const updateBook = (id,profile)=>async(dispatch)=>{

    try {
        const res = await  axios.put(`http://localhost:5000/auth/update-profile/${id}`,profile)
        console.log(res)
        if(res.status===200)
        {
            localStorage.setItem('user', JSON.stringify(res.data.user))
        }
        dispatch({
            type:UPDATE_BOOK_SUCCESS,
            payload:res
        })
            
        
    } catch (error) {
        dispatch({
            type:UPDATE_ERROR,
            payload:209
        })
    }

    
}


