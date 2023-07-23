import React from 'react';
import WarningCancel from '../popup/WarningCancel';
import EventIncome from '../popup/EventIncome';
import AssignMusician from '../popup/AssignMusician';
import UpdateEvent from '../popup/UpdateEvent';
// import { / } from '../../hooks/useAdminEvents';

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
  // switch color by status
  switch (status) {
    case 'Published':
      color = 'text-center rounded shadow-green-100 bg-green-100';
      break;
    case 'Closed':
      color = 'text-center rounded shadow-red-100 bg-red-100';
      break;
    case 'Assigned':
      color = 'text-center rounded shadow-yellow-100 bg-yellow-100';
      break;
    default:
      color = 'text-center rounded shadow-blue-100 bg-blue-100';
  }

  const [date, time] = eventDate.split('T'); // separate date and time components
  const [year, month, day] = date.split('-'); // extract year, month, and day values
  const [hour, minute] = time.split(':'); // extract hour and minute values

  const formattedDate = `${year}-${month}-${day}`;
  const formattedTime = `${hour}:${minute}`;

  const eventDateObject = eventDate;

  const isBefore = (dateA, dateB) => new Date(dateA) < dateB;
 
  let musicalTypeName = musicalStyleList.filter((style) => {
    return style.MusicalTypeID === MusicalTypeId;
  });
  musicalTypeName = musicalTypeName[0].MusicalTypeName;
  return (
    <tr className={color}>
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {status !== 'Published' && BandName}
      </th>
      <td className="px-6 py-4">{Registered}</td>
      <td className="px-6 py-4 text-gray-900">
        {formattedDate} {formattedTime}
      </td>
      <td>{status}</td>
      <td className="grid grid-cols-2 gap-3 m-3 lg:flex lg:flex-row">
        <WarningCancel
          disabled={
            status === 'Published' ||
            (status === 'Assigned' && !isBefore(eventDateObject, new Date()))
          }
          EventId={EventId}
          EventDate={formattedDate}
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
        />
        <AssignMusician
          EventDate={formattedDate}
          EventId={EventId}
          disabled={
            status === 'Published' && !isBefore(eventDateObject, new Date())
          }
        />
        <EventIncome
          EventDate={formattedDate}
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
