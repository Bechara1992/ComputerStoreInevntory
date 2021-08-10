module.exports = app => {
    //const brands = require("../controllers/brand.controller.js");

    //const db = require("../models/index");
    const connection = require("../config/dbconf");
  

    app.route('/api/brands').get((req, res) => {
      connection.query(
        'SELECT * FROM brands WHERE IsActive = true',
        (error, results) => {
          if (error) {
            console.log(error);
            res.status(500).json({status: 'error'});
          } else {
            res.status(200).json({results});
          }
        }
      );
    })

    app.route('/api/brands').post((req, res) => {
      connection.query(
        'INSERT INTO brands (BrandName, IsActive) VALUES (?,?)',
        [req.body.BrandName, true],
        (error, results) => {
          if (error) {
            console.log(error);
            res.status(500).json({status: JSON.stringify(req.params)});
          } else {
            res.status(200).json(results);
          }
        }
      );
    })
  };