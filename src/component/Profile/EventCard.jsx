import React from 'react';
import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const EventCard = () => {
  return (
    <div>
      <Card sx={{width:245}}>
        <CardMedia
          component="img"
          sx={{height:245}}
          image="https://avatars.mds.yandex.net/i?id=a14943c376622f9edcc7ddbcfb5fa1bc7dc8fc5a-8498011-images-thumbs&n=13"
          alt="Event Image"
        />
        <CardContent>
          <Typography variant="h5" component="div">
            Jizzakh Fast Food
          </Typography>
          <Typography variant="body2" component="div">
            50% off on your first order
          </Typography>
          <div className='py-2 space-y-2'>
            <p>{"jizzakh"}</p>
            <p className='text-sm text-blue-500'>Desember 06.12.2024 12:00 AM </p>
            <p className='text-sm text-red-500'>Desember 06.12.2024 12:00 PM </p>
          </div>
        </CardContent>
       {true&&<CardActions>
            <IconButton>
                <DeleteIcon/>
            </IconButton>
        </CardActions>}
      </Card>
    </div>
  );
};

export default EventCard;
