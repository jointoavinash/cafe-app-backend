const express = require('express');
const mongoose = require('mongoose');
const crypto = require("crypto");
import { USER_NAME, USER_PASSWORD } from './config';
// Create Express app
const app = express();
const Cafe = require('./models/Cafe');
const Employee = require('./models/Employee');

app.use(express.json())

const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));


app.get('/',(req, res)=>{
    res.send("Server is running on port 3000");
})

//Get all the cafes based on location provided
app.get('/cafes', async (req, res) => {
    try {
      const { location } = req.query;
      let cafes;

      if (location) {
        cafes = await Cafe.find({ location }).sort({ employees: -1 });
      } else {
        cafes = await Cafe.find().sort({ employees: -1 });
      }
      res.json(cafes);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

app.get('/cafes/:id', async (req, res) => {
    try {
      const { id } = req.params;
      let cafes;
      cafes = await Cafe.findById(id);
      res.json(cafes);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

app.post('/cafes', async(req, res) => {
    try{
        const cafe = await Cafe.create(req.body);
        res.status(200).json(req.body);
    }catch (error){
        res.status(500).json({message: error.message})
    }
});

// PUT /cafe
app.put('/cafes', async (req, res) => {
    try {
      const { id, name, location, description, logo } = req.body;
      const cafe = await Cafe.findByIdAndUpdate(id, { name, location, description, logo });
      res.json(cafe);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

// DELETE /cafe
app.delete('/cafes/:id', async (req, res) => {
    try {
      const { id } = req.params;;
      await Cafe.findByIdAndDelete(id);
    // await Employee.deleteMany({ cafe: id });
    // res.json({ message: 'Cafe and its employees deleted successfully'});
    res.json({ message: 'Cafe deleted successfully'});
}
    catch(err){
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

//Employee Related API's
app.get('/employees', async (req, res) => {
    try {
      const { cafe } = req.query;
      let employees;
      if (cafe) {
        employees = await Employee.find({ cafe }).sort({ days_worked: -1 });
      } else {
        employees = await Employee.find().sort({ days_worked: -1 });
      }

      res.json(employees);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/employees/:id', async (req, res) => {
    try {
        const { id } = req.params;
        let employees;
        employees = await Employee.findById(id);
        res.json(employees);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/employees', async(req, res) => {
    try{
        const _id = new Object(`UI${crypto.randomBytes(8).toString("hex").toUpperCase()}`);

        const employees = await Employee.create({ ...req.body, _id});
        res.status(200).json(req.body);
    }catch (error){
        res.status(500).json({message: error.message})
    }
});

// PUT /employee
app.put('/employees', async (req, res) => {
    try {
      const { id } = req.body;
      const employee = await Employee.findByIdAndUpdate(id, { ...req.body });
      res.json(employee);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

// DELETE /cafe
app.delete('/employees/:id', async (req, res) => {
  try {

    const { id } = req.params;
    await Employee.findByIdAndDelete(id);
    res.json({ message: 'Employees deleted successfully'});
  }
  catch(err){
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(4000, () => {
   console.log('Server is running on port 4000');
   mongoose.connect(`mongodb+srv://${USER_NAME}:${USER_PASSWORD}.glxjz2y.mongodb.net/GIC-API?retryWrites=true&w=majority`)
  .then(() => console.log('Connected to MongoDB!'))
  .catch((error)=>{
    console.log(error);
  });
});
