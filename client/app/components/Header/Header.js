import React from "react";

const Header = props => {
  const rate = props.currentRates && props.currentRates.rates && props.currentRates.rates["CAD"];
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <span className="navbar-brand text-bold">
        Last updated at <b>{props.updatedDate}</b> Current <b>USD/CAD</b> rate is <b>{rate}</b>
      </span>
    </nav>
  );
};

export default Header;
