import React from 'react';
import WarningCancel from '../popup/WarningCancel';
import EventIncome from '../popup/EventIncome';
import AssignMusician from '../popup/AssignMusician';
import UpdateEvent from '../popup/UpdateEvent';
import { format } from 'date-fns';

function EventTableView(props) {
  const {
    status,
    BandName,
    Registered,
    eventDate,
    EventId,
    MusicalTypeId,
    Description,
    musicalStyleList,
  } = props;
  let color = '';
  // Set color classes based on the event status
  switch (status) {
    case 'Published':
      color =
        'text-center rounded shadow-green-100 bg-green-100 dark:bg-green-200';
      break;
    case 'Closed':
      color = 'text-center rounded shadow-red-100 bg-red-100 dark:bg-red-200';
      break;
    case 'Assigned':
      color =
        'text-center rounded shadow-yellow-100 bg-yellow-100 dark:bg-yellow-200';
      break;
    default:
      color =
        'text-center rounded shadow-blue-100 bg-blue-100 dark:bg-blue-200';
  }

  // Extract and format the event date and time
  const [date, time] = eventDate.split('T'); // separate date and time components
  const [year, month, day] = date.split('-'); // extract year, month, and day values
  const [hour, minute] = time.split(':'); // extract hour and minute values
  const formattedDate = `${year}-${month}-${day}`;
  const formattedTime = `${hour}:${minute}`;
  const dateObj = new Date(formattedDate);
  const newDateObj = format(dateObj, 'dd-MM-yyyy');
  const eventDateObject = eventDate;

  //function to determines if dateA occurs chronologically before dateB.
  const isBefore = (dateA, dateB) => new Date(dateA) < dateB;

  // Get the musical type name based on the MusicalTypeId
  let musicalTypeName = musicalStyleList.filter((style) => {
    return style.MusicalTypeID === MusicalTypeId;
  });
  musicalTypeName = musicalTypeName[0].MusicalTypeName;

  return (
    <tr className={color}>
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
      >
        {status !== 'Published' && BandName}
      </th>
      <td className="px-6 py-4">{Registered}</td>
      <td className="px-6 py-4 text-gray-900">
        {newDateObj} {formattedTime}
      </td>
      <td>{status}</td>
      <td className="grid grid-cols-2 gap-3 m-3 lg:flex lg:flex-row lg:justify-end">
        <WarningCancel
          disabled={
            status === 'Published' ||
            (status === 'Assigned' && !isBefore(eventDateObject, new Date()))
          }
          EventId={EventId}
          EventDate={eventDate}
          eventStatus={status}
        />
        <UpdateEvent
          disabled={
            status === 'Published' ||
            (status === 'Assigned' && !isBefore(eventDateObject, new Date()))
          }
          EventDate={formattedDate}
          EventTime={formattedTime}
          EventId={EventId}
          MusicalTypeId={MusicalTypeId}
          Description={Description}
          musicalStyleList={musicalStyleList}
          musicalTypeName={musicalTypeName}
          eventStatus={status}
        />
        <AssignMusician
          EventDate={eventDate}
          EventId={EventId}
          disabled={
            (status === 'Published' || status === 'Assigned') &&
            !isBefore(eventDateObject, new Date())
          }
          assignedBandName={BandName}
        />
        <EventIncome
          EventDate={eventDate}
          BandName={BandName}
          disabled={
            status === 'Assigned' && isBefore(eventDateObject, new Date())
          }
          EventId={EventId}
        />
      </td>
    </tr>
  );
}

export default EventTableView;
