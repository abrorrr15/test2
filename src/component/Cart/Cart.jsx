import React from "react";
import CartItem from "./CartItem";
import Divider from "@mui/material/Divider";
import AddressCart from "./AddressCart";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import { Card, Button, Modal, Grid, TextField, Box } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  outline: "none",
  boxShadow: 24,
  p: 4,
};

const initialValues = {
  streetAddress: "",
  state: "",
  pincode: "",
  city: "",
};

const validationSchema = Yup.object().shape({
  streetAddress: Yup.string().required("Street Address is required"),
  state: Yup.string().required("State is required"),
  pincode: Yup.string().required("Pincode is required"),
  city: Yup.string().required("City is required"),
});

const Cart = () => {
  const [open, setOpen] = React.useState(false);

  const createOrderUsingSelectedAddress = (address) => {
    console.log("Selected Address:", address);
  };

  const handleOpenAddressModal = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (values, { resetForm }) => {
    console.log("Form Data:", values);
    resetForm();
    setOpen(false);
  };

  return (
    <>
      <main className="lg:flex justify-between">
        {/* Left Section */}
        <section className="lg:w-[30%] space-y-6 lg:min-h-screen pt-10">
          {[1, 1].map((_, index) => (
            <CartItem key={index} />
          ))}
          <Divider />
          <div className="billDetails px-5 text-sm">
            <p className="font-extralight py-5">Bill Details</p>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-500">
                <p>Item Total</p>
                <p>599$</p>
              </div>
              <div className="flex justify-between text-gray-500">
                <p>Delivery Fee</p>
                <p>29$</p>
              </div>
              <div className="flex justify-between text-gray-500">
                <p>Platform Fee</p>
                <p>5$</p>
              </div>
              <div className="flex justify-between text-gray-500">
                <p>GST and Restaurant Charges</p>
                <p>33$</p>
              </div>
              <Divider />
            </div>
            <div className="flex justify-between text-gray-400">
              <p>Total Pay</p>
              <p>3300$</p>
            </div>
          </div>
        </section>

        <Divider orientation="vertical" flexItem />

        {/* Right Section */}
        <section className="lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0">
          <div>
            <h1 className="text-center font-semibold text-2xl py-10">
              Choose Delivery Address
            </h1>
            <div className="flex gap-5 flex-wrap justify-center">
              {[1, 1, 1, 1, 1].map((_, index) => (
                <AddressCart
                  key={index}
                  handleSelectAddress={() => createOrderUsingSelectedAddress(index)}
                  item={{
                    name: `Address ${index + 1}`,
                    address: "Example address here",
                  }}
                  showButton
                />
              ))}
              <Card className="flex gap-5 w-64 p-5 bg-gray-800">
                <AddLocationAltIcon className="text-white" />
                <div className="space-y-3 text-gray-400">
                  <h1 className="font-semibold text-lg text-white">
                    Add New Address
                  </h1>
                  <p>Provide a new delivery address here.</p>
                  <Button
                    variant="outlined"
                    fullWidth
                    color="primary"
                    onClick={handleOpenAddressModal}
                  >
                    Add Address
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ touched, errors }) => (
              
                <Form>
                  <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="streetAddress"
                      label="Street Address"
                      fullWidth
                      variant="outlined"
                      error={touched.streetAddress && !!errors.streetAddress}
                      helperText={<ErrorMessage name="streetAddress" />}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      as={TextField}
                      name="state"
                      label="state"
                      fullWidth
                      variant="outlined"
                      error={touched.state && !!errors.state}
                      helperText={<ErrorMessage name="state" />}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      as={TextField}
                      name="city"
                      label="city"
                      fullWidth
                      variant="outlined"
                      error={touched.city && !!errors.city}
                      helperText={<ErrorMessage name="city" />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="pincode"
                      label="pincode"
                      fullWidth
                      variant="outlined"
                      error={touched.pincode && !!errors.pincode}
                      helperText={<ErrorMessage name="pincode" />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" type="submit" color="primary" fullWidth>Deliver Here</Button>
                  </Grid>
                </Grid>
                </Form>
                
             
            )}
          </Formik>
        </Box>
      </Modal>
    </>
  );
};

export default Cart;
