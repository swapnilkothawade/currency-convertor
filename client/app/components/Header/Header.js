import React from "react";

const Header = props => {
  const rate = props.currentRates && props.currentRates.rates && props.currentRates.rates["CAD"];
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="navbar-brand text-bold">
        <div className="pull-left">Last updated at <b>{props.updatedDate}</b></div><div className="pull-right">Current <b>USD/CAD</b> rate is <b>{rate}</b></div>
      </div>
    </nav>
  );
};

export default Header;
