import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
  subHours,
} from 'date-fns';
import { useState } from 'react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Calendar(props) {
  const data = props.data;
  let today = startOfToday();
  let [selectedDay, setSelectedDay] = useState(today);
  let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'));
  let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());

  // Get the days of the current month to display on the calendar
  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  // Function to go to the previous month
  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
  }

  // Function to go to the next month
  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
  }

  // Filter the meetings for the selected day
  let selectedDayMeetings = data.filter((meeting) =>
    isSameDay(subHours(parseISO(meeting.Date), 3), selectedDay)
  );

  // Return the calendar UI
  return (
    <div className="rounded-md text-xl border-4 flex flex-col ">
      {/* Display event categories */}
      <div className="ml-4 mt-4 flex items-center">
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

      {/* Display selected day's meetings */}
      <div className="pt-12 max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6 ">
        <div className="md:grid md:grid-cols-2 space-x-5 md:divide-gray-200">
          <section className="mt-12 md:mt-0 md:pl-14">
            <h2 className="font-semibold ">
              Schedule for
              <time dateTime={format(selectedDay, 'yyyy-MM-dd')}>
                {format(selectedDay, ' dd MMM, yyy')}
              </time>
            </h2>
            <ol className="mt-4 space-y-1 text-sm leading-6 ">
              {selectedDayMeetings.length > 0 ? (
                selectedDayMeetings.map((meeting) => (
                  <Meeting
                    meeting={meeting}
                    selectedDay={selectedDay} // Pass the selectedDay as a prop
                    key={meeting.EventID}
                  />
                ))
              ) : (
                <p>No Event.</p>
              )}
            </ol>
          </section>

          {/* Display calendar grid */}
          <div>
            <div className="flex items-center">
              <h2 className="flex-auto font-semibold ">
                {format(firstDayCurrentMonth, 'MMMM yyyy')}
              </h2>
              <button
                type="button"
                onClick={previousMonth}
                className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500 dark:hover:text-red-500"
              >
                <span className="sr-only">Previous month</span>
                <ChevronLeftIcon className="w-6 h-6" aria-hidden="true" />
              </button>
              <button
                onClick={nextMonth}
                type="button"
                className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500 dark:hover:text-red-500"
              >
                <span className="sr-only">Next month</span>
                <ChevronRightIcon className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>
            <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
              <div>S</div>
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
            </div>
            <div className="grid grid-cols-7 mt-2 text-xl">
              {days.map((day, dayIdx) => (
                <div
                  key={day.toString()}
                  className={classNames(
                    dayIdx === 0 && colStartClasses[getDay(day)],
                    'py-1.5'
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedDay(day)}
                    className={classNames(
                      isEqual(day, selectedDay) && 'text-white',
                      !isEqual(day, selectedDay) &&
                        isToday(day) &&
                        'text-red-500',
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        isSameMonth(day, firstDayCurrentMonth),
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        !isSameMonth(day, firstDayCurrentMonth) &&
                        'text-gray-400',
                      isEqual(day, selectedDay) && isToday(day) && 'bg-red-500',
                      isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        'bg-gray-600',
                      !isEqual(day, selectedDay) &&
                        'hover:bg-gray-200 dark:hover:bg-gray-600',
                      (isEqual(day, selectedDay) || isToday(day)) &&
                        'font-semibold',
                      'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
                    )}
                  >
                    <time dateTime={format(day, 'yyyy-MM-dd')}>
                      {format(day, 'd')}
                    </time>
                  </button>

                  <div className="w-1 h-1 mx-auto mt-1">
                    {data.some((meeting) =>
                      isSameDay(subHours(parseISO(meeting.Date), 3), day)
                    ) && (
                      <>
                        {data
                          .filter((meeting) =>
                            isSameDay(subHours(parseISO(meeting.Date), 3), day)
                          )
                          .map((meeting) => (
                            <div
                              key={meeting.EventID}
                              className={`w-2 h-2 rounded-full ${
                                meeting.Status === 'Published'
                                  ? 'bg-green-500'
                                  : meeting.Status === 'Closed'
                                  ? 'bg-red-500'
                                  : 'bg-yellow-700'
                              }`}
                            ></div>
                          ))}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Display individual meeting items
function Meeting({ meeting }) {
  const date = parseISO(meeting.Date);
  const subHour = subHours(date, 3);
  return meeting.Status === 'Published' ? (
    <li className="flex flex-col items-start  px-4 py-2 group rounded-xl focus-within:bg-gray-100   ">
      <div>
        <p className="font-semibold">You Haven't Assign anyone</p>
      </div>
      <div className=" flex  w-full">
        <p className="font-semibold mr-3 ">Event Time:</p>
        <time dateTime={meeting.Date}>{format(subHour, 'HH:mm')}</time>
      </div>
    </li>
  ) : (
    <li className="flex items-center px-4 py-2 space-x-4 group rounded-xl focus-within:bg-gray-100 ">
      <img
        src={
          meeting.Photo
            ? `http://localhost:3001/${meeting.Photo}`
            : `http://localhost:3001/ProfileImg.jpg`
        }
        alt="avatar"
        className="flex-none w-20 h-20 rounded-full object-cover"
      />
      <div className="flex-auto ">
        {meeting.Status === 'Closed' && (
          <div className="rounded-full text-center bg-red-200">Closed</div>
        )}
        <p>{meeting.BandName}</p>
        <p>{meeting.PhoneNumber}</p>
        <div className=" flex flex-row space-x-2">
          <p>Event Time:</p>
          <time dateTime={meeting.Date}>{format(subHour, 'HH:mm')}</time>
        </div>
      </div>
    </li>
  );
}

// CSS classes for starting columns of calendar days
let colStartClasses = [
  '',
  'col-start-2',
  'col-start-3',
  'col-start-4',
  'col-start-5',
  'col-start-6',
  'col-start-7',
];
