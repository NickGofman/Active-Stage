import React, { useContext } from 'react';
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
import { DarkModeContext } from '../DarkModeContext';
function BusinessAllEvents() {
  const { darkMode } = useContext(DarkModeContext);

  // State to store sorting type and date range
  const [sortType, setSortType] = useState('all');
  const currentDate = new Date();

  // Object containing sorting data to be used in the API query
  const [date, setDate] = useState({
    startDate: dayjs(currentDate).subtract(1, 'year').format('YYYY-MM-DD'),
    endDate: dayjs(currentDate).add(1, 'year').format('YYYY-MM-DD'),
  });

  const sortData = {
    sortType: sortType,
    startDate: date.startDate,
    endDate: date.endDate,
  };

  // Fetch events based on sort type and date range using custom hooks
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
  // Function to handle the click event of each radio button
  const handleSortTypeChange = (event) => {
    setSortType(event.target.value);
  };
  
  // Function to handle date range changes
  const handleDateChange = (newValue) => {
    setDate(newValue);
  };

  return (
    <div className="flex flex-col  items-center space-y-9 mt-10 ">
      <div className=" shadow-md sm:rounded-lg ">
        <div className="flex justify-end ">
          <Datepicker
            containerClassName={`${
              darkMode ? 'darkModeDatePicker' : ''
            } border-[1px] relative  max-w-sm border-[1px] border-blue-gray-200 rounded-[7px] border-blue-gray-200 rounded-lg`}
            useRange={false}
            value={date}
            onChange={handleDateChange}
            displayFormat={'DD/MM/YYYY'}
            popoverDirection="down"
          />
        </div>
        <div className="flex flex-row mt-2">
          <div className="ml-4 mt-1 flex items-center">
            <div className="text-sm font-semibold w-32">Published events</div>
            <div className={'w-3 h-3 rounded-full bg-green-500'}></div>
          </div>
          <div className="ml-4 mt-1  flex items-center">
            <div className="text-sm font-semibold w-32">Assigned events</div>
            <div className={'w-3 h-3 rounded-full bg-yellow-700'}></div>
          </div>
          <div className=" ml-4 mt-1  flex items-center">
            <div className="text-sm font-semibold w-32">Closed events</div>
            <div className={'w-3 h-3 rounded-full bg-red-500'}></div>
          </div>
        </div>
        {/* Radio buttons for sorting */}
        <div className="space-x-7 pb-3 ">
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
        <div className="h-96 overflow-scroll overflow-x-hidden border rounded dark:text-black">
          <table className="w-full text-sm text-left rounded ">
            <thead className=" sticky top-0 text-xs uppercase bg-gray-50  dark:bg-black dark:text-white ">
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
            <tbody className="overflow-y-scroll ">
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
