const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/auto', require('./routes/auto'));
app.use('/automehanicar', require('./routes/automehanicar'));
app.use('/elektricar', require('./routes/elektricar'));
app.use('/firma', require('./routes/firma'));
app.use('/musterija', require('./routes/musterija'));
app.use('/nabavka', require('./routes/nabavka'));
app.use('/popravka', require('./routes/popravka'));
app.use('/racun', require('./routes/racun'));
app.use('/radnici', require('./routes/radnici'));
app.use('/dijelovi', require('./routes/dijelovi'));
app.use('/auth', require('./routes/auth'));

app.get('/', (req, res) => {
    res.send("Pokrenut backend");
})

app.listen(8081, () => {
    console.log("Server radi na http://localhost:8081")
})