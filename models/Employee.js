
const mongoose = require('mongoose');
// var Schema = mongoose.Schema;

const employeeSchema = mongoose.Schema(
    {
        _id:{
            type: String,
            // type: Schema.ObjectId,
            required:[true, "Random Id prefixed by UI"]
        },
        // enployee_id: {
        //     type: String,
        //     required:[true, "Random Id prefixed by UI"]
        // },
        name:{
            type: String,
            required: [true, 'Name of the employee']
        },
        email_address:{
            type: String,
            required: [true, 'Email address of the employee. Follows the typical email address format.']
        },
        phone_number:{
            type: Number,
            required: [true,'Phone number of the employee. Starts with either 9 or 8 and have 8 digits.'],
            trim: true,
            maxlength: [8, 'Phone number of the employee. Starts with either 9 or 8 and have 8 digits.'],
            validate: {
                validator: function(val) {
                    // ✅ get first digit of number as string
                    const firstDigitStr = String(val)[0];
                    return val.length < 8 || firstDigitStr != 8 || firstDigitStr != 9
                },
                message: () => `Phone number of the employee. Starts with either 9 or 8 and have 8 digits.`
            },
        },
        gender:{
            type: String,
            enum: ['Male','Female', 'Transgender'],
            required: true
        },
        days_worked:{
            type: Number,
            required: true,
            default: 0,
        },
        cafe:{
            type: String,
            required: true,
            default: null
        }
    },
    {
        timestamps: true
    }
);

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;
