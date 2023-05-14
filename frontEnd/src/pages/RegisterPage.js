import React, { useState } from 'react';
import {
  Card,
  Input,
  Button,
  Typography,
  Textarea,
} from '@material-tailwind/react';
import { FiUpload } from 'react-icons/fi';
import { makeRequest } from '../axios';
function RegisterPage() {
  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthDate: '',
    yearsOfExperience: '',
    description: '',
  });
  const [err, setErr] = useState(null);
  //check use password

  //send data to backEnd
  const handleRegistration = (e) => {
    e.preventDefault();
    // Validate form data

    const errors = validateForm(inputs);
    if (Object.entries(errors).every((current)=>current.length===0)) {
      console.log("Errors",errors);
      setErr(errors);
      return;
    }

    // Check password confirmation
    else {
      makeRequest
        .post('/auth/register', inputs)
        .then((response) => {
          console.log("Responce:",response);
          // Handle successful registration
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleChange = (e) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [e.target.name]: e.target.value,
    }));
    setErr(validateForm({ ...inputs, [e.target.name]: e.target.value }));
  };
  // const checkText = function(name){
  //   return inputs[name] === ''
  // }

  return (
    <div className="container px-5 py-24 mx-auto flex flex-wrap justify-center">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4">Register</Typography>
        <form className="mt-8  w-80 max-w-screen-lg sm:w-96 mb-4 flex flex-col gap-6">
          <Input
            type="text"
            size="lg"
            label="First Name"
            name="firstName"
            onChange={handleChange}
            error={err?.firstName !== ''}
            success={err?.firstName === ''}
          />
          <Input
            type="text"
            size="lg"
            label="Last Name"
            name="lastName"
            onChange={handleChange}
            error={err?.lastName !== ''}
            success={err?.lastName === ''}
          />
          <Input
            type="email"
            size="lg"
            label="Email"
            name="email"
            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
            onChange={handleChange}
            error={err?.email !== ''}
            success={err?.email === ''}
          />
          <Input
            required
            type="password"
            variant="outlined"
            size="lg"
            label="Password"
            name="password"
            onChange={handleChange}
            error={err?.password !== ''}
            success={err?.password === ''}
          />
          <Input
            required
            type="password"
            size="lg"
            label="Confirm Password"
            name="confirmPassword"
            onChange={handleChange}
            error={err?.confirmPassword !== ''}
            success={err?.confirmPassword === ''}
          />
          <Input
            required
            type="date"
            label="Birth date"
            name="birthDate"
            onChange={handleChange}
            error={err?.birthDate !== ''}
            success={err?.birthDate === ''}
          />
          <Input
            size="lg"
            label="Years Of Experience"
            name="yearsOfExperience"
            onChange={handleChange}
            error={err?.yearsOfExperience !== ''}
            success={err?.yearsOfExperience === ''}
          />
          <Textarea
            required
            type="text"
            label="Description"
            name="description"
            onChange={handleChange}
          />

          <Button className="mt-6" fullWidth onClick={handleRegistration}>
            Register
          </Button>
        </form>
      </Card>
    </div>
  );

  function validateForm(inputs) {
    const errors = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      birthDate: '',
      yearsOfExperience: '',
    };

    // Check first name
    if (inputs.firstName === '') {
      console.log('In IF', inputs.firstName);
      errors.firstName = 'First name is required';
    }

    // Check last name
    if (!inputs.lastName) {
      errors.lastName = 'Last name is required';
    }

    // Check email
    if (!inputs.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(inputs.email)) {
      errors.email = 'Invalid email address';
    }

    // Check password
    if (!inputs.password) {
      errors.password = 'Password is required';
    } else if (!/^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/.test(inputs.password)) {
      errors.password = 'Password must be at least 8 characters long';
    }
    // Check confirm password
    if (!inputs.confirmPassword) {
      errors.confirmPassword = 'Confirm password is required';
    } else if (
      inputs.confirmPassword !== inputs.password ||
      !/^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/.test(inputs.confirmPassword)
    ) {
      errors.confirmPassword = 'Passwords do not match';
    }

    // Check birth date
    const birthDate = new Date(inputs.birthDate);
    const ageInMs = Date.now() - birthDate.getTime();
    const ageInYears = ageInMs / 1000 / 60 / 60 / 24 / 365;
    if (isNaN(ageInYears) || ageInYears < 18) {
      errors.birthDate = 'You must be 18 years or older';
    }

    // Check years of experience
    if (!inputs.yearsOfExperience) {
      errors.yearsOfExperience = 'Years of experience is required';
    } else if (isNaN(inputs.yearsOfExperience)) {
      errors.yearsOfExperience = 'Years of experience must be a number';
    }

    return errors;
  }
}

export default RegisterPage;
