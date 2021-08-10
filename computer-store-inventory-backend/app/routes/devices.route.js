module.exports = app => {
    const connection = require("../config/dbconf");
  

    app.route('/api/devices/:BrandID').get((req, res) => {
      connection.query(
        'SELECT D.ID, D.DeviceName, B.ID BrandID, B.BrandName, D.ModelNumber, D.Mem, ' +
        'D.CPUSpecs, D.GraphicsCard, D.Quantity, D.Image ' +
        'FROM devices D ' + 
        'INNER JOIN brands B ON B.ID = D.Brand ' +
        'WHERE D.IsActive = true AND D.Brand = ?',
        [req.params.BrandID],
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

    app.route('/api/devices').post((req, res) => {
      connection.query(
        'INSERT INTO devices (DeviceName, Brand, ModelNumber, Mem, CPUSpecs, ' + 
        'GraphicsCard, Quantity, IsActive, Image' + 
        ') VALUES (?,?,?,?,?,?,?,?,?)',
        [req.body.ComputerName,req.body.Brand,req.body.ModelNumber,
          req.body.Memory,req.body.CPUSpecs,req.body.GraphicsCard,
          req.body.Quantity,true,req.body.Img],
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


    app.route('/api/devices/update').post((req, res) => {
      connection.query(
        'Update devices set DeviceName=?, Brand=?, ModelNumber=?, Mem=?, CPUSpecs=?, ' +  
        'GraphicsCard= ?, Quantity= ?, Image= ? WHERE ID = ?',
        [req.body.ComputerName,req.body.Brand,req.body.ModelNumber,
          req.body.Memory,req.body.CPUSpecs,req.body.GraphicsCard,
          req.body.Quantity,req.body.Img,req.body.ID],
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
    
    app.route('/api/devices/delete/:DeviceID').get((req, res) => {
      connection.query(
        'UPDATE devices set IsActive = false WHERE ID = ?',
        [req.params.DeviceID],
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