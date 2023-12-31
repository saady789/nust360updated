const express = require('express');
const mysql = require('mysql2');
const adminRouter = require("./router/Admin");
const studentRouter = require('./router/Student');
const facultyRouter = require('./router/Faculty');
const cors = require('cors');
const app = express();
app.use(express.json())
const db = mysql.createConnection({
  host: 'localhost' ,
  user: 'root',
  password: 'htjpep123@#',
  database: 'nust'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database...');
});

// Enable CORS middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

function calculateYearsDifference(currentDate, previousDate) {
  const oneYearInMilliseconds = 1000 * 60 * 60 * 24 * 365.25; // Approximate milliseconds in a year

  const diffInMilliseconds = currentDate.getTime() - previousDate.getTime();
  const diffInYears = diffInMilliseconds / oneYearInMilliseconds;

  return Math.floor(diffInYears); // Return the difference in complete years
}



// Define your API endpoints here
// app.get('/api/data', (req, res) => {
//   db.query('SELECT * FROM admin', (err, results) => {
//     if (err) {
//       return;
//       console.error('Error querying database:', err);
//       res.status(500).json({ error: 'Database error' });
//     }
//     res.json({data:results});
//     console.log("results found")
//   });
// });

app.post('/login', (req, res) => {
  const { Username, password } = req.body;
  db.query('SELECT * FROM user WHERE Username = ? AND password = ?', [Username, password], (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    if (results.length === 0) {
      res.status(401).json({ error: 'Incorrect username or password' });
      return;
    }
    res.status(200).json({ data: results[0] });
  });
});

app.post('/createstudent', (req, res) => { 
  const { fname, lname, email, cnic, dob, gender, password, phone, Username } = req.body;
  let age = calculateYearsDifference(new Date(), new Date(dob));

  db.query('INSERT INTO user (role, fname, lname, DOB, Username, password, profile_pic, phone_number, email, gender, cnic, nationality, religion, marital_status, age) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
   ['Student', fname, lname, dob, Username, password, 'pic', phone, email, gender, cnic, 'Pakistani', 'Islam', 'Single', age], (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.status(200).json("done");
  });
});




app.post('/createFaculty', (req, res) => { 
  const { fname, lname, email, cnic, dob, gender, password, phone, Username } = req.body;
  let age = calculateYearsDifference(new Date(), new Date(dob));

  db.query('INSERT INTO user (role, fname, lname, DOB, Username, password, profile_pic, phone_number, email, gender, cnic, nationality, religion, marital_status, age) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
   ['Faculty', fname, lname, dob, Username, password, 'pic', phone, email, gender, cnic, 'Pakistani', 'Islam', 'Single', age], (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.status(200).json("done");
  });
});



//Routing
// app.use('/admin',adminRouter);
// app.use('/student',studentRouter);
// app.use('/faculty',facultyRouter);
// Export db connection as a module
// module.exports = { db };




// Start the server
const PORT = 3001; // or any port you prefer
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
