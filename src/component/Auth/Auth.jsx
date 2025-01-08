import React from 'react';
import { Box, Modal } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

const Auth = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleOnClose = () => {
        navigate("/");
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
    };

    return (
        <>
            <Modal
                open={
                    location.pathname === "/account/register" ||
                    location.pathname === "/account/login"
                }
                onClose={handleOnClose}
            >
                <Box sx={style}>
                    {/* Add your modal content here */}
                     
                    <h2>{location.pathname === "/account/register" ?<RegisterForm/> : <LoginForm/>}</h2>
                </Box>
            </Modal>
        </>
    );
};

export default Auth;
