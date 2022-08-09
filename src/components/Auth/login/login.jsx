import React, { useRef, useState, useContext, useEffect } from "react";
import "./login.css";
import { useDispatch, useSelector } from 'react-redux'
import { login, loadingToggleAction } from '../../../redux/User/userAction.js'

import image from "../../AudioBook/bkg.png";

import { connect } from "react-redux";

import Header from "../../layout/header";
import useFullPageLoader from "../../../hooks/useFullPageLoader";


function LoginArea({ customClass = "", history, location, props }) {
  //login google
  const [loginData, setLoginData] = useState(
    localStorage.getItem('loginData')
      ? JSON.parse(localStorage.getItem('loginData'))
      : null
  );
  const handleLogoutG = () => {
    localStorage.removeItem('loginData');
    setLoginData(null);
  };
  ///////
  const responseGoogle = (response) => {
    console.log(response);
  }
  ///
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [errorHandler, setErrorHandler] = useState({

    hasError: false,
    message: "",
  });


  const [alertMsg, setAlertMsg] = useState(null);
  // const context = useContext(AuthContext);

  const dispatch = useDispatch()

  const [loader, showLoader, hideLoader] = useFullPageLoader();


  const handleLogin = (e) => {
    showLoader();

    e.preventDefault()
    dispatch(login(email, password, setErrorHandler, showLoader,hideLoader))
  }

  const { user } = useSelector(state => state.userReducer)
  console.log("user", user)

  const redirect = location.search ? location.search.split('=')[1] : '/admin/dashboard'
  /////google login
  const handleFailureG = (result) => {
    alert(result);
  };

  const handleLoginG = async (googleData) => {
    const res = await fetch('/api/google-login', {
      method: 'POST',
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    setLoginData(data);
    localStorage.setItem('loginData', JSON.stringify(data));
  };


  const redirection = (e) => {

    history.push("/signup");
    window.location.reload();

  };
  ///////////
  useEffect(() => {
    if (user) {
      history.push(redirect)
    }
  }, [user, history, redirect])


  //////////////////
  const fetchData = () => {
    showLoader();



    hideLoader();


  };


  return (



    <section className="vh-100" style={{ backgroundImage: `url(${image}` }}>

      <Header errorHandler={errorHandler} />



       {/* <useFullPageLoader /> */}
      <div className="container py-5" style={{ marginTop: "150px" }}>
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">


            <div className="card" style={{ borderRadius: "1rem" }}>
              <div className="row g-0">

                <div className="card-body p-5 text-center" style={{ width: "30px" }}>
                  {alertMsg &&
                    (Array.isArray(alertMsg) ? (
                      <div className="alert alert-danger" role="alert">
                        <ul className="errors" style={{ marginBottom: 0 }}>
                          {alertMsg.map((msg) => (
                            <li key={msg} className="error">
                              {msg}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <div className={`alert alert-success`} role="alert">
                        {alertMsg}
                      </div>
                    ))}

                  <form onSubmit={handleLogin}>

                    <div className="d-flex align-items-center mb-3 pb-1" >
                      <img src={require('./1.png').default} style={{ width: "120px", marginLeft: "140px", marginTop: "-100px" }} />
                    </div>

                    <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: " 1px" }}>Sign into your account</h5>

                    <div class="input-group mb-4">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1"><img src={require('./useravatar.png').default} style={{ width: "20px" }} /></span>
                      </div>
                      <input type="text" class="form-control" placeholder="Email" value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div class="input-group mb-4">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1"><img src={require('./lock.png').default} style={{ width: "20px" }} /></span>
                      </div>
                      <input type="password" class="form-control" placeholder="Password" value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div className="pt-1 mb-4">



                      <button className="btn btn-dark btn-lg btn-block" onClick={fetchData} type="submit" style={{ backgroundColor: "#7470B4", width: "380px" }}>Login


                      </button>


                    </div>
                    <a className="small text-muted" href="#!">Forgot password?</a>
                    <p className="mb-5 pb-lg-2" style={{ color: "#7470B4" }}>Don't have an account? <a onClick={redirection}
                      style={{ color: "#393f81" }}>Register here</a></p>
                    <a href="#!" className="small text-muted">Terms of use.</a>
                    <a href="#!" className="small text-muted">Privacy policy</a>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {loader}

    </section>

  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    login: (State, history, setErrorHandler, showLoader,hideLoader) => {
      dispatch(login(State, history, setErrorHandler, showLoader,hideLoader));
    },
  };
};
export default connect(mapDispatchToProps)(LoginArea);
