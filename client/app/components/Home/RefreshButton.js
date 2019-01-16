import React from "react";

const RefreshButton = props => {
  return (
    <div className="refresh-button">
      <button className="btn btn-primary" onClick={(e) => props.refreshdata(e)}>
        Refresh
      </button>
    </div>
  );
};

export default RefreshButton;
