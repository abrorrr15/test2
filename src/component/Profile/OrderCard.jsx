import { Card, Button } from '@mui/material';  // Corrected import
import React from 'react';

const OrderCard = () => {
  return (
    <Card className='flex justify-between items-center p-5'>
        <div className='flex items-center space-x-5'>
            <img className='h-16 w-16'  // Corrected the image size class
            src="https://avatars.mds.yandex.net/i?id=dfb4a790c56bbfd920266a6da01a79d6f073d3d4-10445007-images-thumbs&n=13" alt="" />
            <div>
                <p>Biryani</p>
                <p>399$</p>
            </div>
        </div>
        <div>
            <Button disabled className="cursor-not-allowed">Order</Button> {/* Corrected Button usage */}
        </div>
    </Card>
  );
}

export default OrderCard;
