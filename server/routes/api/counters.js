const Rate = require("../../models/Rate");

module.exports = app => {
  app.get("/api/rates", (req, res, next) => {
    Rate.find()
      .exec()
      .then(rates => res.json(rates))
      .catch(err => next(err));
  });

  app.post("/api/rates", function (req, res, next) {
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
