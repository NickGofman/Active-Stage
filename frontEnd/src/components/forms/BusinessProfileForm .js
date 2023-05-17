import React from 'react';
import { Input, Button } from '@material-tailwind/react';
import { useState } from 'react';
import { useUpdateAdminData } from '../../hooks/useAdminProfileData';

function BusinessProfileForm(props) {
  console.log('PROPS ADMIN', props);
  const { businessName, address, phone, managerName } = props?.data.data[0];
  // useState handle user profile Update
  const [inputs, setInputs] = useState({
    businessName: businessName,
    address: address,
    phone: phone,
    managerName: managerName,
  });
  // send data to backEnd to update user profile

  // const {
  //   mutate: update,
  //   isError,
  //   error,
  //   isLoading,
  // } = useUpdateAdminData(inputs);

  // if (isLoading) {
  //   return <div>Loading....</div>;
  // }

  // if (isError) {
  //   return error;
  // }
  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="max-w-lg  w-auto md:w-full  px-6 py-12 bg-white shadow-md rounded-md">
      <form className="space-y-9">
        <Input
          label="Business Name"
          id="inputBusinessName"
          type="text"
          name="businessName"
          onChange={handleChange}
        />
        <Input
          type="text"
          label="Address"
          id="Address"
          name="address"
          onChange={handleChange}
        />
        <Input
          type="tel"
          label="Phone"
          id="phone"
          name="phone"
          required={true}
          onChange={handleChange}
        />

        <Input
          type="text"
          label="Manager Name"
          id="inputOrgPhone"
          required={true}
          name="managerName"
          onChange={handleChange}
        />

        {/* <Button onClick={update}>Save Changes</Button> */}
      </form>
    </div>
  );
}

export default BusinessProfileForm;
