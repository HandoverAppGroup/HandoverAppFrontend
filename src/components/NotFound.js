import React from "react";

// This component is used when a non-existing route (url) is used
const NotFound = () => {
  return (
    <div className="not-found">
      <div className="container">
        <h1 className="pt-3">Sorry, Page Not Found</h1>
      </div>
    </div>
  );
};

export default NotFound;