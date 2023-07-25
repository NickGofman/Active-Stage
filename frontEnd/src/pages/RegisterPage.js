import React, { useState } from 'react';
import {
  Card,
  Input,
  Button,
  Typography,
  Textarea,
} from '@material-tailwind/react';
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import { makeRequest } from '../axios';
import { useRegister } from '../hooks/useAuth';
function RegisterPage() {
  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthDate: '',
    yearsOfExperience: '',
    phoneNumber: '',
    url: '',
    description: '',
    bandName: '',
  });
  const [err, setErr] = useState(null);
  const [errMessage, setErrMessage] = useState('');
  const navigate = useNavigate();
  const mut = useRegister();
  //send data to backEnd
  const handleRegistration = async (e) => {
    e.preventDefault();
    // Validate form data
    const errors = validateForm(inputs);
    if (Object.values(errors).some((current) => current !== '')) {
      return;
    } else {
      try {
        await mut.mutateAsync(inputs);
        navigate('/');
        setErrMessage('');
      } catch (error) {
        setErrMessage(error.response.data.error);
      }
    }
  };

  const handleChange = (e) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [e.target.name]: e.target.value,
    }));
    setErr(validateForm({ ...inputs, [e.target.name]: e.target.value }));
  };

  return (
    <div className="container px-5 py-24 mx-auto flex flex-wrap justify-center">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4">Register</Typography>
        <form className="mt-8  w-80 max-w-screen-lg sm:w-96 mb-4 flex flex-col gap-4">
          <Input
            required
            type="text"
            size="lg"
            label="First Name"
            name="firstName"
            onChange={handleChange}
            error={err?.firstName !== ''}
            success={err?.firstName === ''}
          />
          <Input
            required
            type="text"
            size="lg"
            label="Last Name"
            name="lastName"
            onChange={handleChange}
            error={err?.lastName !== ''}
            success={err?.lastName === ''}
          />
          <Input
            required
            type="text"
            size="lg"
            label="Band Name"
            name="bandName"
            onChange={handleChange}
            error={err?.bandName !== ''}
            success={err?.bandName === ''}
          />
          <Input
            required
            type="email"
            size="lg"
            label="Email"
            name="email"
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
          <Typography
            variant="small"
            color="gray"
            className="flex items-center gap-1 font-normal mt-2"
          >
            <InformationCircleIcon className="w-4 h-4 -mt-px" />
            Password should contain at least 8 characters with numbers and
            digits
          </Typography>
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
          <Input
            size="lg"
            label="Phone Number"
            name="phoneNumber"
            onChange={handleChange}
            error={err?.phoneNumber !== ''}
            success={err?.phoneNumber === ''}
          />
          <Typography
            variant="small"
            color="gray"
            className="flex items-center gap-1 font-normal mt-2"
          >
            <InformationCircleIcon className="w-4 h-4 -mt-px" />
            Phone number format 05X-XXXXXXX
          </Typography>
          <Input
            size="lg"
            label="Youtube URL"
            name="url"
            onChange={handleChange}
          />
          <Textarea
            required
            type="text"
            label="Description"
            name="description"
            onChange={handleChange}
          />
          <Typography color="red" variant="lead">
            {errMessage && errMessage}
          </Typography>
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
      phoneNumber: '',
      bandName: '',
    };

    // Check first name
    if (inputs.firstName === '') {
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
    // Check phone number
    if (!inputs.phoneNumber) {
      errors.phoneNumber = 'Phone number is required';
    } else if (!/^05\d([-]{0,1})\d{7}$/.test(inputs.phoneNumber)) {
      errors.phoneNumber =
        'Phone number must be a valid Israeli phone number in the format 054-315-9449';
    }

    if (!inputs.bandName) {
      errors.bandName = 'band name is required';
    }

    return errors;
  }
}

export default RegisterPage;
