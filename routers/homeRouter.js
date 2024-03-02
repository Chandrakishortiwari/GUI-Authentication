const express = require('express');
const Router  = express.Router();
const homeSchema = require('../modules/homeSchema');

Router.get('/',(err,res)=>{
    res.render('register',{title :'Fill Form',password:'',email:''})
})

Router.post('/register', async (req, res) => {
    try {
      const { name, number, email, password, cpassword } = req.body;
  
      if (password === cpassword) {
        const userExists = await homeSchema.findOne({ email });
  
        if (userExists) {
          res.render('register', { title: '', password: '', email: 'Email is already taken, please choose a different one' });
        } else {
          const userData = new homeSchema({
            name,
            number,
            email,
            password,
          });
  
          await userData.save(); // Using await to handle promises
  
          res.render('register', { title: 'Done', password: '', email: '' });
        }
      } else {
        res.render('register', { title: '', password: 'Passwords do not match', email: '' });
      }
    } catch (error) {
      console.error(error);
      res.render('register', { title: 'Error in Code', password: '', email: '' });
    }
  });
  
// singin 

// Inside your '/login' route
// Inside your '/login' route
Router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await homeSchema.findOne({ email });

    if (!user) {
      console.log('Invalid credentials - User not found');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isPasswordMatch = password === user.password;

    if (!isPasswordMatch) {
      console.log('Invalid credentials - Password does not match');
      return res.status(400).json({ message: 'Password does not match' });
    }

    res.render('login')
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// // Add a comparePassword method in your homeSchema model
// homeSchema.methods.comparePassword = async function (enteredPassword) {
//   // Compare the entered password with the hashed password in the database
//   return enteredPassword === this.password;
//};




module.exports = Router;