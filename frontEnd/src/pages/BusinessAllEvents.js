import React from 'react';
import EventTableView from '../components/tables/EventTableView';
import { useState } from 'react';
import { Radio } from '@material-tailwind/react';
import Datepicker from 'react-tailwindcss-datepicker';
import {
  useGetMusicalStyles,
  useSortedEventDataByType,
} from '../hooks/useAdminEvents';
import dayjs from 'dayjs';
import Loader from '../components/loader/Loader';

function BusinessAllEvents() {
  //get all events
  const [sortType, setSortType] = useState('all');
  const currentDate = new Date();

  const [date, setDate] = useState({
    startDate: dayjs(currentDate).subtract(1, 'year').format('YYYY-MM-DD'),
    endDate: dayjs(currentDate).add(1, 'year').format('YYYY-MM-DD'),
  });

  //axios will be here we wil have 4 routes that get sortType and date
  const sortData = {
    sortType: sortType,
    startDate: date.startDate,
    endDate: date.endDate,
  };
  // Fetch events based on sort type and date range

  const { data, isError, isLoading } = useSortedEventDataByType(sortData);
  const {
    isLoading: musicalStyleLoading,
    data: musicalStyleList,
    isError: musicalStyleIsError,
  } = useGetMusicalStyles();
  if (isLoading || musicalStyleLoading) {
    return <Loader />;
  }

  if (musicalStyleIsError || isError) {
    return <div>ERROR</div>;
  }
  // function to handle the click event of each radio button
  const handleSortTypeChange = (event) => {
    setSortType(event.target.value);

    // send a query to the database based on the selected sort type
  };
  const handleDateChange = (newValue) => {
    setDate(newValue);
  };
  return (
    <div className="flex flex-col  items-center space-y-9 mt-10">
      <div className=" shadow-md sm:rounded-lg">
        <div className="flex justify-end">
          <Datepicker
            containerClassName=" relative max-w-sm "
            useRange={false}
            value={date}
            onChange={handleDateChange}
            displayFormat={'DD/MM/YYYY'}
          />
        </div>
        {/* Radio buttons for sorting */}
        <div className="space-x-7 pb-3">
          <Radio
            label="All"
            type="radio"
            id="sortType-all"
            name="sortType"
            value="all"
            checked={sortType === 'all'}
            onChange={handleSortTypeChange}
          />

          <Radio
            label="Closed Events"
            type="radio"
            id="sortType-closed"
            name="sortType"
            value="Closed"
            checked={sortType === 'Closed'}
            onChange={handleSortTypeChange}
          />

          <Radio
            label="Without Income"
            type="radio"
            id="sortType-withoutIncome"
            name="sortType"
            value="WithoutIncome"
            checked={sortType === 'WithoutIncome'}
            onChange={handleSortTypeChange}
          />
          <Radio
            label="Assigned Events"
            type="radio"
            id="sortType-assigned"
            name="sortType"
            value="Assigned"
            checked={sortType === 'Assigned'}
            onChange={handleSortTypeChange}
          />
          <Radio
            label="Published Events"
            type="radio"
            id="sortType-published"
            name="sortType"
            value="Published"
            checked={sortType === 'Published'}
            onChange={handleSortTypeChange}
          />
        </div>
        <div className="h-96 overflow-scroll overflow-x-hidden border rounded ">
          <table className="w-full text-sm text-left text-gray-500 rounded ">
            <thead className=" sticky top-0 text-xs text-gray-700 uppercase bg-gray-50  ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Assigned Band
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
            <tbody className="overflow-y-scroll">
              {data?.data?.map((event) => {
                return (
                  <EventTableView
                    key={event.EventID}
                    EventId={event.EventID}
                    status={event.Status}
                    MusicalTypeId={event.MusicalTypeID}
                    BandName={event.BandName}
                    Registered={event.NumberOfRegisters}
                    eventDate={event.Date}
                    Description={event.Description}
                    musicalStyleList={musicalStyleList?.data}
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
