import React from "react";

import ErrorHandler from "../error/ErrorHandler";

function Header(props) {
  const {  errorHandler } = props;
  return (
    <div className="header d-flex justify-content-center py-2 shadow-sm">
      <ErrorHandler
        errorHandler={errorHandler || { hasError: false, message: "" }}
      />
       </div>
  );
}


export default Header;