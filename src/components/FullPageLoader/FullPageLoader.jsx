import React from "react";
import Spinner from "../../assets/img/Curve-Loading.gif";
 import "./Loader.css"
const FullPageLoader = () => {
    return (
        <div className="fp-container">
            <img src={Spinner} className="fp-loader" alt="loading" />
        </div>
    );
};

export default FullPageLoader;