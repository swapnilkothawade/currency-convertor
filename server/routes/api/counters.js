const Rate = require("../../models/Rate");

module.exports = app => {

  /**
 * Method to fetch all records for a currency rates.
 * 
 */

  app.get("/api/rates", (req, res, next) => {
    Rate.find()
      .exec()
      .then(rates => res.json(rates))
      .catch(err => next(err));
  });

  /**
   * Method to post records for a currency rates.
   * 
   */
  app.post("/api/rates", function (req, res, next) {
    let reqRates = req.body;
    let obj = {
      date: reqRates.date,
      aud: reqRates.rates['AUD'],
      cad: reqRates.rates['CAD'],
      gbp: reqRates.rates['GBP'],
      eur: reqRates.rates['EUR']
    }
    console.log(reqRates, obj)
    Rate.findById(reqRates.id)
      .exec()
      .then((rate) => {
        console.log(rate)
        rate.rates = [...rate.rates, obj];
        console.log(rate)
        rate.save()
          .then(() => res.json(rate))
          .catch((err) => next(err));
      });
  });
};
