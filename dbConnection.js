const mongoose = require('mongoose');

mongoose
    .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
    })
    .then(() => {
        console.log('connected with db!!');
    })
    .catch((err) => {
        console.log('error with db connection ', err);
    });

module.exports = mongoose;