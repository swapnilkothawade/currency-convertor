exports.sort = function (e, this) {
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
    return null
}