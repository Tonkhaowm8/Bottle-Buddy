const express = require('express');
const axios = require('axios'); // Import Axios for making HTTP requests
const db = require('./db.js');
const {Dashboard} = require('./Pages/Dashboard/Dashboard.jsx');

const router = express.Router();
router.use(express.json());

console.log("mlPerDay:", Dashboard.mlPerDay);
console.log("drinkFreq:", Dashboard.drinkFreq);

router.post('/user', async (req, res) => {
    const { success, data, error } = await db.createOrUpdate(req.body, 'product');

    if (success) {
        // If the operation is successful, prepare data for the API endpoint
        const postData = {
            mlPerDay: mlPerDay,
            drinkFreq: drinkFreq,
            text: hi
            // Add other required data properties here
        };

        try {
            // Make a POST request to the API endpoint with the prepared data
            const response = await axios.post('https://76yp3k3sbd.execute-api.ap-southeast-1.amazonaws.com', postData);
            console.log('Response from API:', response.data);
            // Return the response from the API to the client
            return res.json(response.data);
        } catch (error) {
            console.error('Error posting data to API:', error.response.data);
            // If there's an error, return a 500 Internal Server Error with an error message
            return res.status(500).json({ success: false, message: 'Error posting data to API', error: error.response.data });
        }
    }

    // If there's an error with the database operation, return a 500 Internal Server Error with an error message
    return res.status(500).json({ success: false, message: error, data: req.body });
});

module.exports = router;
