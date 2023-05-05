import React from 'react';
import EventTableView from '../components/eventTable/EventTableView';
import { useState } from 'react';
import { Radio } from '@material-tailwind/react';
import { events } from '../constants/index';
import Datepicker from 'react-tailwindcss-datepicker';

function BusinessAllEvents() {
  //get all events
  const [sortType, setSortType] = useState('all');
  const [date, setDate] = useState({
    startDate: new Date().setMonth(-3),
    endDate: new Date().setMonth(11),
  });
  //axios will be here we wil have 4 routes that get sortType and date

  // function to handle the click event of each radio button
  const handleSortTypeChange = (event) => {
    setSortType(event.target.value);
    // send a query to the database based on the selected sort type
  };
  const handleDateChange = (newValue) => {
    console.log('newValue:', newValue);
    setDate(newValue);
  };

  return (
    <div className="flex flex-col items-center space-y-9 mt-10">
      <div className="relative shadow-md sm:rounded-lg">
        <div className="flex justify-end">
          <Datepicker
            containerClassName=" relative max-w-sm"
            useRange={false}
            value={date}
            onChange={handleDateChange}
            displayFormat={'DD/MM/YYYY'}
          />
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
        <div className='h-96 overflow-scroll border rounded'>
          <table className="w-full text-sm text-left text-gray-500 rounded ">
            <thead className=" sticky top-0 z-10 text-xs text-gray-700 uppercase bg-gray-50 ">
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
              {events.map((event) => {
                return (
                  <EventTableView
                    key={event.id}
                    EventId={event.id}
                    status={event.status}
                    MusicalType={event.MusicalType}
                    BandName={event.bandName}
                    Registered={event.registered}
                    Date={event.date}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BusinessAllEvents;
