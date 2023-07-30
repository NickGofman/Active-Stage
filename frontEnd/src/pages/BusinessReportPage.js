import React, { useContext } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';
import { useState } from 'react';
import { Select, Option, Typography, Button } from '@material-tailwind/react';
import dayjs from 'dayjs';
import {
  useGetMusicalStylesByDate,
  useGetBandNames,
  useSortedEventReports,
} from '../hooks/useAdminEvents';
import ReportTable from '../components/tables/ReportTable';
import { DarkModeContext } from '../DarkModeContext';

import Loader from '../components/loader/Loader';
function BusinessReportPage() {
  const { darkMode } = useContext(DarkModeContext);
  const currentDate = new Date();
  // const [musicalTypeName, setMusicalTypeName] = useState('');

  const [date, setDate] = useState({
    startDate: dayjs(currentDate).subtract(1, 'year').format('YYYY-MM-DD'),
    endDate: dayjs(currentDate).format('YYYY-MM-DD'),
  });
  const [inputs, setInputs] = useState({
    bandName: '',
    musicalTypeId: '',
  });
  const sortData = {
    startDate: date.startDate,
    endDate: date.endDate,
    musicalTypeId: inputs.musicalTypeId,
    bandName: inputs.bandName,
  };

  const {
    isLoading: musicalStyleLoading,
    data: musicalStyleList,
    isError: musicalStyleIsError,
  } = useGetMusicalStylesByDate({
    startDate: date.startDate,
    endDate: date.endDate,
    bandName: inputs.bandName,
  });
  const {
    isLoading: bandNameLoading,
    data: bandNameList,
    isError: bandNameIsError,
  } = useGetBandNames({
    startDate: date.startDate,
    endDate: date.endDate,
    musicalTypeId: inputs.musicalTypeId,
  });

  const {
    isLoading: reportsLoading,
    data: reportsNameList,
    isError: reportsNameIsError,
  } = useSortedEventReports(sortData);
  if (bandNameLoading || musicalStyleLoading || reportsLoading) {
    return <Loader />;
  }

  if (bandNameIsError || musicalStyleIsError || reportsNameIsError) {
    return (
      <div>Error occurred while fetching data. Please try again later.</div>
    );
  }
  const handleChangeStyle = (selectedMusicalTypeId) => {
    // const selectedMusicalType = musicalStyleList.data.find(
    //   (style) => style.MusicalTypeID.toString() === selectedMusicalTypeId
    // );

    // if (selectedMusicalType) {
    //   setMusicalTypeName(selectedMusicalType.MusicalTypeName);
    // }

    setInputs((prevState) => ({
      ...prevState,
      musicalTypeId: selectedMusicalTypeId,
    }));
  };
  const handleBandNameChange = (selectedBandName) => {
    setInputs((prevState) => ({ ...prevState, bandName: selectedBandName }));
  };
  //remove the duplicate strings

  const handleDateChange = (newValue) => {
    setInputs((prevState) => ({
      ...prevState,
      bandName: '',
      musicalTypeId: '',
    }));
    // setMusicalTypeName('');

    setDate(newValue);
  };

  let totalRevenue = 0;
  reportsNameList?.data?.forEach((elem) => {
    totalRevenue += elem.Income;
  });
  const handleResetFilters = () => {
    setDate({
      startDate: dayjs(currentDate).subtract(1, 'year').format('YYYY-MM-DD'),
      endDate: dayjs(currentDate).format('YYYY-MM-DD'),
    });
    setInputs({
      bandName: '',
      musicalTypeId: '',
    });
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-4 mt-10 mr-16 ml-16">
        <div>
          <Datepicker
            containerClassName={`${
              darkMode ? 'darkModeDatePicker' : ''
            } border-[1px] border-blue-gray-200 rounded-[7px] relative  max-w-sm rounded-lg`}
            useRange={false}
            value={date}
            onChange={handleDateChange}
            displayFormat={'DD/MM/YYYY'}
            popoverDirection="down"
          />
        </div>
        <Select
          className="col-span-1 darkSelect dark:text-white  "
          label="Select band name"
          name="bandName"
          value={inputs.bandName}
          onChange={handleBandNameChange}
        >
          {bandNameList?.data.length !== 0 ? (
            bandNameList?.data?.map((band, index) => (
              <Option name="bandNameOption" value={band} key={index}>
                {band}
              </Option>
            ))
          ) : (
            <Option name="musicalStyleOption">
              No Band Name - change date range
            </Option>
          )}
        </Select>

        <Select
          className="col-span-1 dark:text-white"
          label="Select Musical Type"
          name="musicalStyle"
          value={inputs.musicalTypeId}
          onChange={handleChangeStyle}
        >
          {musicalStyleList?.data?.length !== 0 ? (
            musicalStyleList?.data?.map((style) => (
              <Option
                name="musicalStyleOption"
                key={style.MusicalTypeID}
                value={style.MusicalTypeID.toString()}
              >
                {style.MusicalTypeName}
              </Option>
            ))
          ) : (
            <Option name="musicalStyleOption">
              No Events - change date range
            </Option>
          )}
        </Select>
        <div className="col-span-3 flex justify-end">
          <Button onClick={handleResetFilters} size="sm">
            Reset Filters
          </Button>
        </div>
      </div>
      <div className="flex flex-col mt-10 mr-16 ml-16  ">
        <ReportTable data={sortData} reportsNameList={reportsNameList} />
        <Typography
          variant="lead"
          className="font-bold mt-2 border-2 rounded-lg"
        >
          Total Revenue: {totalRevenue}
        </Typography>
      </div>
    </>
  );
}

export default BusinessReportPage;
