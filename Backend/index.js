const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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
app.use('/zahtjevi', require('./routes/zahtjevi'));
app.use('/racunDjelovi', require('./routes/racunDjelovi'));

app.get('/', (req, res) => {
    res.send("Pokrenut backend");
})

app.listen(8081, () => {
    console.log("Server radi na http://localhost:8081")
})