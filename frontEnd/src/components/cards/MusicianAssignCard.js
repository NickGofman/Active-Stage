import {
  Button,
  Card,
  Typography,
  CardBody,
  CardFooter,
  CardHeader,
} from '@material-tailwind/react';
import React from 'react';
import { useAssignMusicianById } from '../../hooks/useAdminEvents';
import { useBlockUser } from '../../hooks/useAdminActivities';
import BlockUserWaraning from '../popup/BlockUserWaraning';

function MusicianAssignCard(props) {
  const {
    userId,
    eventId,
    bandName,
    experience,
    description,
    setOpen,
    Url,
    phoneNumber,
    Photo,
  } = props;
  const { mutate: assignMusician } = useAssignMusicianById();

  const handleAssign = () => {
    const data = { eventId, userId };
    assignMusician(data);
    setOpen(false); // Activate the setOpen function to close the dialog
  };
  const { mutate: blockUser } = useBlockUser();

  return (
    // <Card className="mt-6 w-96 items-center">
    //   <CardHeader className="text-xl">
    //     <h2 className="font-semibold text-gray-900">{bandName}</h2>
    //   </CardHeader>
    //   <CardBody className="flex-1">
    //     <div className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
    //       <Typography variant="h5" color="blue-gray" className="mb-2">
    //         Preforming Already {experience} Years
    //       </Typography>
    //       <Typography
    //         variant="small"
    //         color="blue-gray"
    //         className="mb-2 font-bold text-sm"
    //       >
    //         Phone Number: {phoneNumber}
    //       </Typography>
    //       {Url && (
    //         <a
    //           href={Url}
    //           target="_blank"
    //           rel="noreferrer"
    //           className="mb-2 text-black font-bold text-sm"
    //         >
    //           Youtube Channel: {Url}
    //         </a>
    //       )}
    //       <Typography variant="small">{description}</Typography>
    //     </div>
    //   </CardBody>
    // <CardFooter className="flex gap-28">
    //   <Button onClick={handleAssign}>Assign</Button>
    //   <BlockUserWaraning handleBlockUser={blockUser} userId={userId}/>
    // </CardFooter>
    // </Card>
    <Card className="mt-6 w-96">
      <CardHeader color="blue-gray" className="relative h-56">
        <img
          src={
            Photo
              ? `http://localhost:3001/${Photo}`
              : `http://localhost:3001/ProfileImg.jpg`
          }
          alt="profileImage"
        />
      </CardHeader>
      <CardBody className="flex-1">
        <Typography variant="h5" color="blue-gray" className="mb-2">
          Band Name: {bandName}
        </Typography>
        <Typography variant="h6" color="blue-gray" className="mb-2">
          Preforming Already {experience} Years
        </Typography>
        {Url && (
          <a
            href={Url}
            target="_blank"
            rel="noreferrer"
            className="mb-2 text-black font-bold text-sm"
          >
            Youtube Channel: {Url}
          </a>
        )}
        <Typography>{description}</Typography>
      </CardBody>

      <CardFooter className="flex gap-28">
        <Button onClick={handleAssign}>Assign</Button>
        <BlockUserWaraning handleBlockUser={blockUser} userId={userId} />
      </CardFooter>
    </Card>
  );
}

export default MusicianAssignCard;
