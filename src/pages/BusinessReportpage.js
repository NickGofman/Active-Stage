import React from 'react';
import { JsonToTable } from 'react-json-to-table';
import Datepicker from 'react-tailwindcss-datepicker';
import { useState } from 'react';
import { Select, Option } from '@material-tailwind/react';
function BusinessReportPage() {
  const mySQLData = [
    {
      id: 1,
      bandName: 'John',
      date: '11 - 05 - 2023',
      Income: 30,
      style: 'jazz',
    },
    {
      id: 2,
      bandName: 'Jane',
      date: '11 - 05 - 2023',
      Income: 35,
      style: 'Punk',
    },
    {
      id: 3,
      bandName: 'Bob',
      date: '11 - 05 - 2023',
      Income: 25,
      style: 'Rock',
    },
  ];

  const [date, setDate] = useState({
    //set  startDate to the first event date with income
    startDate: new Date().setMonth(-8),
    endDate: new Date(),
  });
  let bandNameList = mySQLData.map((obj) => obj.bandName);
  let MusicalStyleList = mySQLData.map((obj) => obj.style);
  

  const handleDateChange = (newValue) => {
    console.log('newValue:', newValue);
    setDate(newValue);
  };
  return (
    <>
      <div className="grid grid-cols-3  gap-4 mt-10 mr-16 ml-16">
        <Datepicker
          containerClassName=" relative max-w-sm"
          useRange={false}
          value={date}
          onChange={handleDateChange}
          displayFormat={'DD/MM/YYYY'}
        />

        <Select className="col-span-1" label="Select band name">
          {bandNameList.map((band, index) => (
            <Option key={index}>{band}</Option>
          ))}
        </Select>
        <Select className="col-span-1" label="Select band name">
          {MusicalStyleList.map((band, index) => (
            <Option key={index}>{band}</Option>
          ))}
        </Select>
      </div>
      <div className="flex flex-col mt-10 mr-16 ml-16">
        <JsonToTable  json={mySQLData} />
      </div>
    </>
  );
}

export default BusinessReportPage;
