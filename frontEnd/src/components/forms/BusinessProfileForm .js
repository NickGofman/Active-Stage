import React, { useEffect } from 'react';
import { Input, Button, Typography } from '@material-tailwind/react';
import { useState } from 'react';
import { useUpdateAdminData } from '../../hooks/useAdminProfileData';
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import Loader from '../loader/Loader';

function BusinessProfileForm(props) {
  const { businessName, address, PhoneNumber, managerName, Email } =
    props?.data?.data[0];
  const [err, setErr] = useState('');

  // useState handle user profile Update
  const [inputs, setInputs] = useState({
    businessName: businessName,
    address: address,
    phone: PhoneNumber,
    managerName: managerName,
    businessEmail: Email,
  });
  useEffect(() => {
    setInputs({
      businessName: businessName || '',
      address: address || '',
      phone: PhoneNumber || '',
      managerName: managerName || '',
      businessEmail: Email || '',
    });
  }, [props?.data?.data[0]]);
  // send data to backEnd to update user profile

  const {
    mutate: update,
    isError,
    error,
    isLoading,
  } = useUpdateAdminData(inputs);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return error;
  }
  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleUpdate = () => {
    if (
      /^05\d-\d{7}$/.test(inputs.phone) &&
      inputs.businessName !== '' &&
      inputs.address !== '' &&
      inputs.managerName !== ''
    ) {
      update(inputs);
      setErr('');
    } else {
      if (!/^05\d-\d{7}$/.test(inputs.phone))
        setErr('Phone number is not in the right format');
      else
        setErr(
          "Business Name , Address,Manager Name shouldn't be empty"
        );
      return;
    }
  };
  return (
    <div className="max-w-lg  w-auto md:w-full  px-6 py-12 bg-white shadow-md rounded-md">
      <Typography color="blue" className="mb-2" variant="h5">
        Here You Can Edit Your Profile
      </Typography>
      <form className="space-y-9">
        <Input
          label="Business Email"
          id="inputBusinessEmail"
          type="text"
          name="businessEmail"
          readOnly={true}
          value={inputs.businessEmail}
        />
        <Input
          label="Business Name"
          id="inputBusinessName"
          type="text"
          name="businessName"
          required={true}
          onChange={handleChange}
          value={inputs.businessName}
        />

        <Input
          type="text"
          label="Address"
          id="Address"
          name="address"
          required={true}
          value={inputs.address}
          onChange={handleChange}
        />
        <Input
          type="tel"
          label="Phone"
          id="phone"
          name="phone"
          required={true}
          value={inputs.phone}
          onChange={handleChange}
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
          type="text"
          label="Manager Name"
          id="inputOrgManagerName"
          required={true}
          name="managerName"
          value={inputs.managerName}
          onChange={handleChange}
        />
        {err && (
          <Typography
            variant="small"
            color="red"
            className="flex items-center gap-1 font-normal mt-2"
          >
            <InformationCircleIcon className="w-4 h-4 -mt-px" />
            {err && err}
          </Typography>
        )}

        <Button onClick={handleUpdate}>Save Changes</Button>
      </form>
    </div>
  );
}

export default BusinessProfileForm;
