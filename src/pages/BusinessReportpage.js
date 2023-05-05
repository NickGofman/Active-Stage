import React from 'react';
import Datepicker from 'react-tailwindcss-datepicker';
import { useState } from 'react';
import {
  Select,
  Option,
  Typography,
  Card,
  Button,
} from '@material-tailwind/react';
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
    {
      id: 4,
      bandName: 'Bob',
      date: '11 - 05 - 2023',
      Income: 25,
      style: 'Rock',
    },
    {
      id: 6,
      bandName: 'Bob',
      date: '11 - 05 - 2023',
      Income: 25,
      style: 'Rock',
    },
    {
      id: 7,
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
  MusicalStyleList = [...new Set(MusicalStyleList)]; //remove the duplicate strings

  const handleDateChange = (newValue) => {
    console.log('newValue:', newValue);
    setDate(newValue);
  };

  const TABLE_HEAD = ['Band Name', 'Date', 'Income', 'Musical Style'];
  return (
    <>
      <div className="grid grid-cols-3 gap-4 mt-10 mr-16 ml-16">
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
        <Select className="col-span-1" label="Select Musical Style">
          {MusicalStyleList.map((band, index) => (
            <Option key={index}>{band}</Option>
          ))}
        </Select>
      </div>
      <div className="flex flex-col mt-10 mr-16 ml-16">
        <Button className="w-1/4">Export To Excel File</Button>

        <Card className="overflow-scroll overflow-x-hidden h-96 w-full mt-5">
          <table className="w-full min-w-max table-auto text-left ">
            <thead className='sticky top-0 z-0 '>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mySQLData.map(({ id, bandName, date, Income, style }, index) => {
                const isLast = index === mySQLData.length - 1;
                const classes = isLast
                  ? 'p-4'
                  : 'p-4 border-b border-blue-gray-50';

                return (
                  <tr key={id}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {bandName}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {date}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {Income}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" className="font-medium">
                        {style}
                      </Typography>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </div>
    </>
  );
}

export default BusinessReportPage;
