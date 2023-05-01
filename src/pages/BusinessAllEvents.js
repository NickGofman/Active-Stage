import React from 'react';
import EventTableView from '../components/eventTable/EventTableView';
import { useState } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Radio } from '@material-tailwind/react';
function BusinessAllEvents() {
  //get all events
  const [sortType, setSortType] = useState('all');

  // function to handle the click event of each radio button
  const handleSortTypeChange = (event) => {
    console.log(event.target.value);
    setSortType(event.target.label);
    // send a query to the database based on the selected sort type
  };

  return (
    <div className="flex flex-col items-center space-y-9 mt-10">
      <div className="relative shadow-md sm:rounded-lg ">
        <div>
          <DatePicker disablePast={true} />
          <DatePicker disablePast={true} />
        </div>
        {/* Radio buttons for sorting */}
        <div className="space-x-7">
          <Radio
            label="All"
            type="radio"
            name="sortType"
            value="all"
            checked={sortType === 'all'}
            onChange={handleSortTypeChange}
          />

          <Radio
            label="Closed Events"
            type="radio"
            name="sortType"
            value="closedEvents"
            checked={sortType === 'closedEvents'}
            onChange={handleSortTypeChange}
          />

          <Radio
            label="Without Income"
            type="radio"
            name="sortType"
            value="withoutIncome"
            checked={sortType === 'withoutIncome'}
            onChange={handleSortTypeChange}
          />
          <Radio
            label="Assigned Events"
            type="radio"
            name="sortType"
            value="assignedEvents"
            checked={sortType === 'assignedEvents'}
            onChange={handleSortTypeChange}
          />
          <Radio
            label="Published Events"
            type="radio"
            name="sortType"
            value="publishedEvents"
            checked={sortType === 'publishedEvents'}
            onChange={handleSortTypeChange}
          />
        </div>
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Band Name
              </th>
              <th scope="col" className="px-6 py-3">
                Registered
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          {/* map throw the data from DB */}
          <tbody className="">
            <EventTableView
              Status="Confirmed"
              BandName="The Beatles"
              Registered="John Lennon"
              Date="05/01/2023"
            />
            <EventTableView
              Status="Confirmed"
              BandName="The Beatles"
              Registered="John Lennon"
              Date="05/01/2023"
            />
            <EventTableView
              Status="Confirmed"
              BandName="The Beatles"
              Registered="John Lennon"
              Date="05/01/2023"
            />
            <EventTableView
              Status="Confirmed"
              BandName="The Beatles"
              Registered="John Lennon"
              Date="05/01/2023"
            />
            <EventTableView
              Status="Confirmed"
              BandName="The Beatles"
              Registered="John Lennon"
              Date="05/01/2023"
            />
            <EventTableView
              Status="Confirmed"
              BandName="The Beatles"
              Registered="John Lennon"
              Date="05/01/2023"
            />
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BusinessAllEvents;
