const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
const app = express();




// Body parser middleware
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let numbersToUse = [5, 14, 5, 22, 17];
let targetNumber = 5;

function generateRandomIntegers(min, max, count) {
    const randomIntegers = [];
    for (let i = 0; i < count; i++) {
        const randomInteger = Math.floor(Math.random() * (max - min + 1)) + min;
        randomIntegers.push(randomInteger);
    }
    return randomIntegers;
}

function generateKryptoNumbers() {
    const kryptoNumbers = generateRandomIntegers(1, 25, 6);
    numbersToUse = kryptoNumbers.slice(0, 5);
    targetNumber = kryptoNumbers[5];
}

// Schedule the function to run every day at midnight (00:00)
cron.schedule('0 0 * * *', () => {
    generateKryptoNumbers();
}, {
    timezone: 'America/Chicago' // Replace 'Your_Timezone_Here' with your server's timezone (e.g., 'America/New_York')
});



app.get('/dailykrypto',(req,res) => {
	try {
        res.json({
            numbersToUse,
            targetNumber
        })
    } catch(error) {
        console.log(error);
    }
})


// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 3000;


/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});