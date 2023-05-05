import React from 'react';
import WarningCancel from '../popup/WarningCancel';
import EventIncome from '../popup/EventIncome';
import AssignMusician from '../popup/AssignMusician';
import UpdateEvent from '../popup/UpdateEvent';

function EventTableView(props) {
  const { status, BandName, Registered, Date, EventId, MusicalType } = props;
  let color = '';
  // switch color by status
  switch (status) {
    case 'published':
      color = 'text-center   rounded shadow-green-100 bg-green-100 ';
      break;
    case 'closed':
      color = ' text-center rounded shadow-red-100 bg-red-100';
      break;
    case 'assigned':
      color = 'text-center rounded shadow-yellow-100 bg-yellow-100';
      break;
    default:
      color = 'text-center rounded shadow-blue-100 bg-blue-100';
  }

  const [date, time] = Date.split(' '); // separate date and time components
  const [year, month, day] = date.split('-'); // extract year, month, and day values
  const [hour, minute, second] = time.split(':'); // extract hour, minute, and second values
  const eventDateObject = new window.Date(
    year,
    month - 1,
    day,
    hour,
    minute,
    second
  );

  const isBefore = (dateA, dateB) => dateA < dateB;

  //open the popup window
  // function handleUpdate() {
  //   // handle update button click
  // }

  // function handleAssign() {
  //   // handle assign button click
  // }

  // function handleAddIncome() {
  //   // handle add income button click
  // }
  return (
    <tr className={color}>
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white "
      >
        {BandName}
      </th>
      <td className="px-6 py-4 ">{Registered}</td>
      <td className="px-6 py-4">{Date}</td>
      <td>{status}</td>
      <td className=" grid grid-cols-2 gap-3 m-3 lg:flex lg:flex-row">
        <WarningCancel
          disabled={
            status === 'published' ||
            (status === 'assigned' &&
              !isBefore(eventDateObject, new window.Date()))
          }
          EventID={EventId}
        />
        {
          <UpdateEvent
            disabled={
              status === 'published' ||
              (status === 'assigned' &&
                !isBefore(eventDateObject, new window.Date()))
            }
            EventDate={Date}
            EventID={EventId}
            MusicalType={MusicalType}
          />
        }
        <AssignMusician
          EventDate={Date}
          EventID={EventId}
          disabled={
            status === 'published' ||
            (status === 'assigned' &&
              !isBefore(eventDateObject, new window.Date()))
          }
        />
        <EventIncome
          EventDate={Date}
          BandName={BandName}
          disabled={
            status === 'assigned' &&
            isBefore(eventDateObject, new window.Date())
          }
          EventID={EventId}
        />
      </td>
    </tr>
  );
}

export default EventTableView;
