import React from 'react';
import { Card, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

const AddressCart = ({ item, showButton,handleSelectAddress }) => {

  return (
    <Card className="flex gap-5 w-64 p-5 bg-gray-800">
      <HomeIcon className="text-white" />
      <div className="space-y-3 text-gray-400">
        <h1 className="font-semibold text-lg text-white">{item?.name || 'Home'}</h1>
        <p>{item?.address || 'No address provided '}</p>
        {showButton && (
          <Button
            variant="outlined"
            fullWidth
            color="primary"
            onClick={()=>handleSelectAddress(item)}
          >
            Select
          </Button>
        )}
      </div>
    </Card>
  );
};

export default AddressCart;
