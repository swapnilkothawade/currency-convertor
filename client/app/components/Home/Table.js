import React from "react";

const Table = props => {
  let rates = props.currentRates;
  const tableHeader = (
    <thead className="thead-light">
      <tr onChange={(e) => props.filterdata(e)}>
        <td><input type="text" name="date" className="form-control"></input></td>
        <td><input type="number" name="cad" className="form-control"></input></td>
        <td><input type="number" name="aud" className="form-control"></input></td>
        <td><input type="number" name="eur" className="form-control"></input></td>
        <td><input type="number" name="gbp" className="form-control"></input></td>
      </tr>
      <tr onClick={(e) => props.sortData(e)} className="sort-header">
        <td id="date">Date</td>
        <td id="cad">USD/CAD</td>
        <td id="aud">USD/AUD</td>
        <td id="eur">USD/EUR</td>
        <td id="gbp">USD/GBP</td>
      </tr>
    </thead>
  );
  const display =
    rates &&
    rates.map(rate => (
      <tr key={rate._id}>
        <td>{rate.date}</td>
        <td>{rate.cad}</td>
        <td>{rate.aud}</td>
        <td>{rate.gbp}</td>
        <td>{rate.eur}</td>
      </tr>
    ));
  return (
    <div className="table-responsive table table-bordered">
      <table className="table text-center table-striped">
        {tableHeader}
        <tbody>{display}</tbody>
      </table>
    </div>
  );
};

export default Table;
