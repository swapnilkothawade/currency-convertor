import React from 'react'
import { LineChart } from 'react-d3-components';

const Chart = (props) => {

    let mainObj = {};
    mainObj.cad = [];
    mainObj.aud = [];
    mainObj.gbp = [];
    mainObj.eur = [];

    // Mapping data for x & y axis for graph
    props.currentRates.map(rate => {
        mainObj.cad = [...mainObj.cad, { x: rate.date, y: rate.cad }];
        mainObj.aud = [...mainObj.aud, { x: rate.date, y: rate.aud }];
        mainObj.gbp = [...mainObj.gbp, { x: rate.date, y: rate.gbp }];
        mainObj.eur = [...mainObj.eur, { x: rate.date, y: rate.eur }];
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
