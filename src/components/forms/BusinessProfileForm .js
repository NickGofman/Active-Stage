import React from 'react';
import { Input, Textarea, Button } from '@material-tailwind/react';
import { useState } from 'react';

function BusinessProfileForm(prop) {
  const { businessName, address, phone, managerName } = prop.admin;
  // useState handle user profile Update
  const [inputs, setInputs] = useState({
    businessName: businessName,
    address: address,
    phone: phone,
    managerName: managerName,
  });
  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  // send data to backEnd to update user profile
  const handleSubmit = () => {};

  return (
    <div className="max-w-lg w-full px-6 py-12 bg-white shadow-md rounded-md">
      <form className="space-y-9">
        <Input
          label="Business Name"
          id="inputBusinessName"
          value={inputs.businessName}
          type="text"
          name="businessName"
          onChange={handleChange}
        />
        <Input
          type="text"
          label="Address"
          id="Address"
          value={inputs.address}
          name="address"
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

        <Input
          type="text"
          label="Manager Name"
          id="inputOrgPhone"
          required={true}
          value={inputs.managerName}
          name="managerName"
          onChange={handleChange}
        />

        <Button onClick={handleSubmit}>Save Changes</Button>
      </form>
    </div>
  );
}

export default BusinessProfileForm;
