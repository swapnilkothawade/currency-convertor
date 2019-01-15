import React from 'react'
import { LineChart } from 'react-d3-components';

const Chart = (props) => {

    let mainObj = {};
    mainObj.cad = [];
    mainObj.aud = [];
    mainObj.gbp = [];
    mainObj.eur = [];

    props.currentRates.map(rate => {
        mainObj.cad.push({ x: rate.date, y: rate.cad });
        mainObj.aud.push({ x: rate.date, y: rate.aud });
        mainObj.gbp.push({ x: rate.date, y: rate.gbp });
        mainObj.eur.push({ x: rate.date, y: rate.eur });
    });

    let data = [{
        label: 'CAD',
        values: mainObj.cad
    }, {
        label: 'AUD',
        values: mainObj.aud
    }, {
        label: 'GBP',
        values: mainObj.gbp
    }, {
        label: 'EUR',
        values: mainObj.eur
    }]
    return (
        <div>
            {mainObj.cad.length > 0 ? <LineChart
                data={data}
                width={1400}
                height={400}
                margin={{ top: 10, bottom: 50, left: 50, right: 20 }}
                xAxis={{ innerTickSize: 10, label: "Date" }}
                yAxis={{ label: "Currency" }}
            /> : null}
        </div>
    )
}

export default Chart
