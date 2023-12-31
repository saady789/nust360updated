const { db } = require('../index'); // Update the path as needed
const mysql = require('mysql2');


exports.Login = async (req,res) => {
    console.log(req.body);

    db.query('SELECT * FROM user', (err, results) => {
        if (err) {
          console.error('Error querying database:', err);
          res.status(500).json({ error: 'Database error' });
          return;
        }
        res.json({ data: results });
        console.log(results);
      });

}