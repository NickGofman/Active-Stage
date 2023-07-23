import React from 'react';
import Datepicker from 'react-tailwindcss-datepicker';
import { useState } from 'react';
import { Select, Option } from '@material-tailwind/react';
import dayjs from 'dayjs';
import {
  useGetMusicalStyles,
  useGetBandNames,
  useSortedEventReports,
  
} from '../hooks/useAdminEvents';
import ReportTable from '../components/tables/ReportTable';
function BusinessReportPage() {
  const currentDate = new Date();
  const [musicalTypeName, setMusicalTypeName] = useState('');

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
   
  } = useGetMusicalStyles();
 const {
  isLoading: bandNameLoading,
  data: bandNameList,
  isError: bandNameIsError,
} = useGetBandNames({ startDate: date.startDate, endDate: date.endDate });

  const {
    isLoading: reportsLoading,
    data: reportsNameList,
    isError: reportsNameIsError,
   
  } = useSortedEventReports(sortData);
 if (bandNameLoading || musicalStyleLoading || reportsLoading) {
   return <div>Loading...</div>;
 }

 if (bandNameIsError || musicalStyleIsError || reportsNameIsError) {
   return (
     <div>Error occurred while fetching data. Please try again later.</div>
   );
 }  
 const handleChangeStyle = (selectedMusicalTypeId) => {
   const selectedMusicalType = musicalStyleList.data.find(
     (style) => style.MusicalTypeID.toString() === selectedMusicalTypeId
   );

   if (selectedMusicalType) {
     setMusicalTypeName(selectedMusicalType.MusicalTypeName);
   } else {
    //  setMusicalTypeName('');
   }

   setInputs((prevState) => ({
     ...prevState,
     musicalTypeId: selectedMusicalTypeId,
   }));
 };
  const handleBandNameChange = (selectedBandName) => {
    setInputs((prevState) => ({ ...prevState, bandName: selectedBandName }));
  
    // const selectedBandName = event.target.value;
    // setInputs((prevInputs) => ({
    //   ...prevInputs,
    //   bandName: selectedBandName,
    // }));
  };
  //remove the duplicate strings

  const handleDateChange = (newValue) => {
    setInputs((prevState) => ({
      ...prevState,
      bandName: '',
      musicalTypeId: '',
    }));
    setMusicalTypeName('');

    setDate(newValue);
  };  return (
    <>
      <div className="grid grid-cols-3 gap-4 mt-10 mr-16 ml-16">
        <div>
          <Datepicker
            containerClassName=" relative max-w-sm"
            useRange={false}
            value={date}
            onChange={handleDateChange}
            displayFormat={'DD/MM/YYYY'}
          />
        </div>
        <Select
          className="col-span-1"
          label="Select band name"
          name="bandName"
          value={inputs.bandName}
          onChange={handleBandNameChange}
        >
          {bandNameList?.data?.bandNames?.map((band, index) => (
            <Option name="bandNameOption" value={band} key={index}>
              {band}
            </Option>
          ))}
        </Select>

        <Select
          className="col-span-1"
          label="Select Musical Type"
          name="musicalStyle"
          value={inputs.musicalTypeId}
          onChange={handleChangeStyle}
        >
          {musicalStyleList?.data?.map((style) => (
            <Option
              name="musicalStyleOption"
              key={style.MusicalTypeID}
              value={style.MusicalTypeID.toString()}
            >
              {style.MusicalTypeName}
            </Option>
          ))}
        </Select>
      </div>
      <div className="flex flex-col mt-10 mr-16 ml-16">
        <ReportTable data={sortData} reportsNameList={reportsNameList} />
      </div>
    </>
  );  
}

export default BusinessReportPage;
