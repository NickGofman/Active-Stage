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
    error: musicalStyleError,
  } = useGetMusicalStyles();
  const {
    isLoading: bandNameLoading,
    data: bandNameList,
    isError: bandNameIsError,
    error: bandNameError,
  } = useGetBandNames(date); // Pass the startDate and endDate to the hook

  if (bandNameLoading) {
    return <div>Loading band names...</div>;
  }

  if (bandNameIsError) {
    console.log(bandNameError);
  }

  if (musicalStyleLoading) {
    return <div>musicalStyleLoading...</div>;
  }
  if (musicalStyleIsError) {
    console.log(musicalStyleError);
  }

  const handleChangeStyle = (e) => {
    const selectedMusicalTypeId = e;
    const selectedMusicalType = musicalStyleList.data.find(
      (style) => style.MusicalTypeID.toString() === selectedMusicalTypeId
    );

    if (selectedMusicalType) {
      setMusicalTypeName(selectedMusicalType.MusicalTypeName);
    } else {
      setMusicalTypeName('');
    }

    setInputs((prevState) => ({
      ...prevState,
      musicalTypeId: selectedMusicalTypeId,
    }));
  };
  const handleBandNameChange = (e) => {
    console.log('EEEE', e);
    setInputs((prevState) => ({ ...prevState, bandName: e }));
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
  };
  console.log(inputs, 'sortData', sortData);
  return (
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
        <ReportTable data={sortData} />
      </div>
    </>
  );
}

export default BusinessReportPage;
