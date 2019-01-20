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
        rate.updated_at = new Date(reqRates.date);
        rate.rates = [...rate.rates, obj];
        rate.save()
          .then(() => res.json(rate))
          .catch((err) => next(err));
      });
  });

  /**
   * Method to popluate records for a currency rates.
   * 
   */
  app.post("/api/populateRates", function (req, res, next) {
    let reqRates = req.body;
    var newObj = {};
    newObj.rates = [];
    newObj.updated_at = Date.now();
    newObj.base = reqRates.base;
    Object.keys(reqRates).forEach(function (key) {
      let obj = {
        date: key,
        aud: reqRates[key]['AUD'],
        cad: reqRates[key]['CAD'],
        gbp: reqRates[key]['GBP'],
        eur: reqRates[key]['EUR']
      }
      newObj.rates = [...newObj.rates, obj]
    });
    const rate = new Rate(newObj);
    rate
      .save()
      .then(
        res.json(rate))
      .catch(err => next(err));
  });
};
