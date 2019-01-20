import React, { Component } from "react";
import "whatwg-fetch";
import Header from "../Header/Header";
import Table from "./Table";
import RefreshButton from "./RefreshButton";
import Chart from './Chart'

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rates: [],
      currentRate: {},
      filteredRates: [],
      updatedDate: ""
    };
  }

  // Fetch currency rates on refresh and update the value in DB if the value is not updated in DB
  fetchRates(e) {
    let date = new Date().toISOString().split("T")[0];
    let updatedDate = this.state.updatedDate && new Date(this.state.updatedDate).toISOString().split("T")[0];
    let timeDiff = Math.abs((new Date(date)).getTime() - (new Date(this.state.updatedDate)).getTime());
    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    console.log(diffDays);
    let url = `https://api.openrates.io/${date}?symbols=GBP,EUR,AUD,CAD&base=USD`;
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(currentRate => {
        if (e && updatedDate != currentRate.date) {
          currentRate.id = this.state.docId;
          let data = JSON.stringify(currentRate);
          fetch("/api/rates", {
            method: 'POST',
            body: data,
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then(res => res.json())
            .then(rates => {
              let updatedDate = new Date(rates.updated_at).toISOString().split("T")[0];
              this.setState({
                updatedDate: updatedDate,
                rates: rates.rates,
                filteredRates: rates.rates
              });
            });
        }


        this.setState({
          currentRate
        });
      });
  }

  //
  handleClick(e) {
    this.fetchRates(e);
  }

  //Filter based on column input
  handleChange(e) {
    const originalRates = this.state.rates;
    let regex = new RegExp(e.target.value, 'g');
    let filteredRates = originalRates.filter(el => {
      return regex.test(el[e.target.name]);
    });
    this.setState({ filteredRates });
  }

  // Sorting table columns
  sort(e) {
    const originalRates = this.state.rates;
    let filteredRates = [];
    if (e.target.id === 'date') {
      if (e.target.className === 'asc') {
        e.target.className = 'desc';
        filteredRates = originalRates.sort((a, b) => {
          return (b[e.target.id] > a[e.target.id]) ? 1 : ((a[e.target.id] > b[e.target.id]) ? -1 : 0);
        });
      } else {
        e.target.className = 'asc';
        filteredRates = originalRates.sort((a, b) => {
          return (a[e.target.id] > b[e.target.id]) ? 1 : ((b[e.target.id] > a[e.target.id]) ? -1 : 0);
        });
      }
    } else {
      if (e.target.className === 'asc') {
        e.target.className = 'desc';
        filteredRates = originalRates.sort((a, b) => {
          return b[e.target.id] - a[e.target.id];
        });
      } else {
        e.target.className = 'asc';
        filteredRates = originalRates.sort((a, b) => {
          return a[e.target.id] - b[e.target.id];
        });
      }
    }

    this.setState({ filteredRates });
  }

  componentDidMount() {
    this.fetchRates();
    //Internal API to getch currency rates from DB
    fetch("/api/rates").then(response => response.json())
      .then(rates => {
        let updatedDate = rates.length && new Date(rates[0].updated_at).toISOString().split("T")[0];
        let date = new Date().toISOString().split("T")[0];
        this.setState({
          rates: rates.length ? rates[0].rates : [],
          filteredRates: rates.length ? rates[0].rates : [],
          updatedDate: updatedDate,
          docId: rates.length ? rates[0]._id : ''
        });

        // Openrates API to fetch currency rate last 30 days 
        if (!rates.length) {
          let date = new Date().toISOString().split("T")[0];
          let now = new Date();
          let backDate = now.setDate(now.getDate() - 30);
          backDate = new Date(backDate).toISOString().split("T")[0];
          let url = `https://api.openrates.io/history?start_at=${backDate}&end_at=${date}&symbols=GBP,EUR,AUD,CAD&base=USD`;
          fetch(url)
            .then(response => {
              return response.json();
            })
            .then(rates => {
              var ff = JSON.stringify(rates.rates);
              fetch("/api/populateRates", {
                method: 'POST',
                body: ff,
                headers: {
                  'Content-Type': 'application/json'
                }
              })
                .then(res => res.json())
                .then(rates => {
                  let updatedDate = new Date(rates.updated_at).toISOString().split("T")[0];
                  this.setState({
                    updatedDate: updatedDate,
                    rates: rates.rates,
                    filteredRates: rates.rates
                  });
                });
            });
        }
      });
  }

  render() {
    return (
      <>
        <div>
          <Header currentRates={this.state.currentRate} updatedDate={this.state.updatedDate} />
          <RefreshButton refreshdata={(e) => this.handleClick(e)} />
          <Table currentRates={this.state.filteredRates} sortData={e => this.sort(e)} filterdata={(e) => this.handleChange(e)} />
          <Chart currentRates={this.state.rates}></Chart>
        </div>
      </>
    );
  }
}

export default Home;
