const mongoose = require('mongoose');

const cafeSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
        },
        description:{
            type: String,
            required: true,
        },
        logo:{
            type: String,
            required: true,
        },
        location:{
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Cafe = mongoose.model('Cafe', cafeSchema);
module.exports = Cafe;

