import React from 'react';
import WarningCancel from '../popup/WarningCancel';
import { Button } from '@material-tailwind/react';

function EventTableView(props) {
  const { Status, BandName, Registered, Date, EventId } = props;

  //open the popup window
  function handleUpdate() {
    // handle update button click
  }

  function handleAssign() {
    // handle assign button click
  }

  function handleAddIncome() {
    // handle add income button click
  }
  return (
    <tr>
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {Status}
      </th>
      <td className="px-6 py-4">{BandName}</td>
      <td className="px-6 py-4">{Registered}</td>
      <td className="px-6 py-4">{Date}</td>
      <td className="space-x-5">
        <WarningCancel EventID={EventId} />
        <Button size="sm" onClick={handleUpdate}>
          Update
        </Button>
        <Button size="sm" onClick={handleAssign}>
          Assign
        </Button>
        <Button size="sm" onClick={handleAddIncome}>
          Add income
        </Button>
      </td>
    </tr>
  );
}

export default EventTableView;
