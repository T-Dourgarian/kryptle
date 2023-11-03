const express = require('express');
const cors = require('cors');
require('dotenv').config();
const cron = require('node-cron');
const app = express();
const pool = require('./pool');


// Body parser middleware
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let numbersToUse = [10, 4, 23, 19, 2];
let targetNumber = 24;

function generateRandomIntegers(min, max, count) {
    const randomIntegers = [];
    for (let i = 0; i < count; i++) {
        const randomInteger = Math.floor(Math.random() * (max - min + 1)) + min;
        randomIntegers.push(randomInteger);
    }
    return randomIntegers;
}

async function generateKryptoNumbers() {
    const kryptoNumbers = generateRandomIntegers(1, 25, 6);
    numbersToUse = kryptoNumbers.slice(0, 5).join(' ');
    targetNumber = kryptoNumbers[5];


    try {
        await pool.query(`INSERT INTO public.daily_krypto(
            numbers, target)
            VALUES ($1, $2);`, [numbersToUse, targetNumber]);
    } catch(error) {
        console.log('error');
    }
}


// Schedule the function to run every day at midnight (00:00)
cron.schedule('0 0 * * *', () => {
    generateKryptoNumbers();
}, {
    timezone: 'America/Chicago' // Replace 'Your_Timezone_Here' with your server's timezone (e.g., 'America/New_York')
});

app.post('/solution', async (req,res) => {
    try {
        const {id, solution, solutionSeconds } = req.body;

        await pool.query(`
            INSERT INTO 
                public.solutions(daily_krypto_id, solution, solution_seconds)
                VALUES ($1, $2, $3);`, [id, solution, solutionSeconds]);


    } catch(error) {
        console.log(error)
    }
})



app.get('/dailykrypto',async (req,res) => {
	try {

        const { rows:  daily_krypto } = await pool.query('SELECT * FROM public.daily_krypto ORDER BY created_at DESC LIMIT 1 ');

        let numbersToUse;
        let targetNumber;
        let id = null;
        let avgTimeSeconds = null;

        if (daily_krypto[0]) {
            id = daily_krypto[0].id
            numbersToUse = daily_krypto[0].numbers.split(' ');
            targetNumber = daily_krypto[0].target;

            const result  = await pool.query('SELECT ROUND(AVG(solution_seconds)) as avg_time_seconds FROM solutions WHERE daily_krypto_id = $1', [id])

            avgTimeSeconds = result.rows[0].avg_time_seconds;

        } else {
            numbersToUse = [ '14', '23', '18', '3', '7'];
            targetNumber = 2;
        }


        res.json({
            id,
            numbersToUse,
            targetNumber,
            avgTimeSeconds
        })
    } catch(error) {
        console.log(error);
    }
})


// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;


/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});