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
import { useRegister } from '../hooks/useAuth';
import { FiEye, FiEyeOff } from 'react-icons/fi';
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
  const [countChar, setCountChar] = useState(0);
  // State to keep track of password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const mut = useRegister();
  //send data to backEnd
  const handleRegistration = async (e) => {
    e.preventDefault();
    // Validate form data
    if (countChar > 255) {
      setErrMessage('Description must be no longer than 255 character');
      return;
    }
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
    if (e.target.name === 'description') {
      setCountChar(e.target.value.length);
    }
    setInputs((prevInputs) => ({
      ...prevInputs,
      [e.target.name]: e.target.value,
    }));

    setErr(validateForm({ ...inputs, [e.target.name]: e.target.value }));
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  // Function to toggle confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
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
          <div>
            <div className="relative flex items-center">
              <Input
                required
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                size="lg"
                label="Password"
                name="password"
                onChange={handleChange}
                error={err?.password !== ''}
                success={err?.password === ''}
              />
              <div
                className="absolute right-4 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </div>
            </div>

            <Typography
              variant="small"
              color="gray"
              className="flex items-center gap-1 font-normal mt-2"
            >
              <InformationCircleIcon className="w-4 h-4 -mt-px" />
              Password should contain at least 8 characters with numbers and
              digits
            </Typography>
          </div>

          <div className="relative">
            <Input
              required
              type={showConfirmPassword ? 'text' : 'password'}
              size="lg"
              label="Confirm Password"
              name="confirmPassword"
              onChange={handleChange}
              error={err?.confirmPassword !== ''}
              success={err?.confirmPassword === ''}
            />
            <div
              className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
            </div>
          </div>
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
          <div>
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
          </div>
          <Input
            size="lg"
            label="Youtube URL"
            name="url"
            onChange={handleChange}
          />
          <div>
            <Textarea
              required
              type="text"
              label="Description"
              name="description"
              className="p-0"
              onChange={handleChange}
            />
            <Typography color="gray" className="text-xs">
              <span className={countChar > 255 ? 'text-red-700' : undefined}>
                {countChar}
              </span>
              <span>/255</span>
            </Typography>
          </div>
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
    } else if (!/^\S+@\S+\.\S+[a-zA-Z0-9]$/.test(inputs.email)) {
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
    } else if (!/^05\d-\d{7}$/.test(inputs.phoneNumber)) {
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
