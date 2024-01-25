const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

// Use body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// Handle form submission
app.post('/form-handler', (req, res) => {
  // Save submitted data to a JSON file
  const data = {
    name: req.body.name,
    password: req.body.password,
    subjects: {
      algorithms: req.body.Algorithms === 'on',
      oop: req.body.OOP === 'on',
      dataStructures: req.body.DataStructures === 'on'
    },
    creditCard: req.body.credit_card,
    city: req.body.city,
    favoriteLanguages: req.body.languages || []
  };

  const jsonData = JSON.stringify(data, null, 2);
  fs.writeFile('data/submitted-data.json', jsonData, (err) => {
    if (err) {
      console.error(err);
    }
  });

  // Redirect to the /show-data URL
  res.redirect('/show-data');
});

// Handle GET request for showing submitted data
app.get('/show-data', (req, res) => {
  fs.readFile('data/submitted-data.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
      return;
    }

    const submittedData = JSON.parse(data);

    // Render the show-data view using the submitted data
    res.render('show-data', { data: submittedData });
  });
});

// Start the server

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
