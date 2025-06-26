// React Imports
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// MUI Imports
import { Box, Button, Grid, Stack, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// Utils
import { onKeyDown } from "../../utils";

// Formik Imports
import { Form, Formik } from "formik";

// Hooks
import useTypedSelector from "../../hooks/useTypedSelector";

// Redux
import {
  selectedUserEmail,
  selectedUserId,
  selectedUserName,
  selectedUserPhoneNumber,
} from "../../redux/auth/authSlice";

import {
  useDoctorSignupMutation,
  useGetDoctorQuery,
} from "../../redux/api/doctorSlice";

// Custom Imports
import ToastAlert from "../../components/ToastAlert/ToastAlert";
import PrimaryPhoneInput from "../../components/PhoneInput";
import { Heading, SubHeading } from "../../components/Heading";
import Navbar from "../../components/Navbar";
import PrimaryInput from "../../components/PrimaryInput/PrimaryInput";
import OverlayLoader from "../../components/Spinner/OverlayLoader";

// Validation Schema
import { applyDoctorSchema } from "./components/validationSchema";

const stepsStyle = {
  position: "absolute",
  background: "#5bc0de",
  color: "#fff",
  left: "-40px",
  width: "35px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderTopLeftRadius: "10px",
  borderBottomRightRadius: "10px",
};

const ApplyDoctor = () => {
  const navigate = useNavigate();
  const userEmail = useTypedSelector(selectedUserEmail);
  const userId = useTypedSelector(selectedUserId);
  const userPhoneNumber = useTypedSelector(selectedUserPhoneNumber);
  const userName = useTypedSelector(selectedUserName);

  const [formValues, setFormValues] = useState({
    prefix: "Dr.",
    fullName: userName,
    phoneNumber: userPhoneNumber,
    website: "",
    address: "",
    specialization: "",
    experience: "",
    feePerConsultation: "",
    fromTime: null,
    toTime: null,
  });

  const [toast, setToast] = useState({
    message: "",
    appearence: false,
    type: "",
  });

  const handleCloseToast = () => {
    setToast({ ...toast, appearence: false });
  };

  const [applyDoctor, { isLoading }] = useDoctorSignupMutation();

  const applyDoctorHandler = async (data) => {
    try {
      const payload = {
        userId,
        prefix: data.prefix,
        fullName: data.fullName,
        email: userEmail,
        phoneNumber: data.phoneNumber,
        website: data.website,
        address: data.address,
        specialization: data.specialization,
        experience: data.experience,
        feePerConsultation: data.feePerConsultation,
        fromTime: data.fromTime,
        toTime: data.toTime,
      };

      const user = await applyDoctor(payload);

      if (user?.data?.status) {
        setToast({
          ...toast,
          message: "Doctor Account Applied Successfully",
          appearence: true,
          type: "success",
        });
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else if (user?.error) {
        setToast({
          ...toast,
          message: user?.error?.data?.message,
          appearence: true,
          type: "error",
        });
      }
    } catch (error) {
      console.error("Doctor Sign Up Error:", error);
      setToast({
        ...toast,
        message: "Something went wrong",
        appearence: true,
        type: "error",
      });
    }
  };

  const { data, isLoading: doctorLoading } = useGetDoctorQuery({ userId });

  return (
    <>
      {doctorLoading && <OverlayLoader />}
      <Navbar>
        <Box>
          <Heading>Apply For Doctor</Heading>
          {data?.data?.status ? (
            <Grid container rowSpacing={2} columnSpacing={4}>
              <Box
                sx={{
                  margin: "30px 0 20px 0",
                  background: "#fff",
                  borderRadius: "6px",
                  padding: "15px 20px",
                  boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 10px",
                }}
              >
                You already applied please wait for Admin Approval
              </Box>
            </Grid>
          ) : (
            <Box
              sx={{
                margin: "20px 0",
                background: "#fff",
                borderRadius: "6px",
                padding: "20px 25px",
                boxShadow: "rgba(0, 0, 0, 0.16) 3px 16px 87px 0px",
              }}
            >
              <SubHeading sx={{ marginBottom: "20px", fontSize: "17px", position: "relative" }}>
                <Box sx={stepsStyle}>1</Box>
                Basic Information
              </SubHeading>
              <Formik
                initialValues={formValues}
                onSubmit={applyDoctorHandler}
                validationSchema={applyDoctorSchema}
              >
                {(props) => {
                  const {
                    values,
                    touched,
                    errors,
                    handleBlur,
                    handleChange,
                    setFieldValue,
                  } = props;

                  return (
                    <Form onKeyDown={onKeyDown}>
                      <Grid container rowSpacing={2} columnSpacing={4}>
                        {/* Prefix */}
                        <Grid item xs={4}>
                          <Box sx={{ marginBottom: "10px" }}>
                            <SubHeading sx={{ marginBottom: "5px" }}>Prefix</SubHeading>
                            <PrimaryInput
                              type="text"
                              name="prefix"
                              placeholder="Prefix"
                              value={values.prefix}
                              readOnly={true}
                              helperText={touched.prefix && errors.prefix ? errors.prefix : ""}
                              error={touched.prefix && !!errors.prefix}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </Box>
                        </Grid>

                        {/* Full Name */}
                        <Grid item xs={4}>
                          <Box sx={{ marginBottom: "10px" }}>
                            <SubHeading sx={{ marginBottom: "5px" }}>Full Name</SubHeading>
                            <PrimaryInput
                              type="text"
                              name="fullName"
                              placeholder="Full Name"
                              value={values.fullName}
                              readOnly={true}
                              sx={{ cursor: "not-allowed" }}
                              helperText={touched.fullName && errors.fullName ? errors.fullName : ""}
                              error={touched.fullName && !!errors.fullName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </Box>
                        </Grid>

                        {/* Mobile Number */}
                        <Grid item xs={4}>
                          <Box sx={{ marginBottom: "10px" }}>
                            <SubHeading sx={{ marginBottom: "5px" }}>Mobile Number</SubHeading>
                            <PrimaryPhoneInput
                              value={values.phoneNumber}
                              name="phoneNumber"
                              formik={props}
                              variant="outlined"
                              label=""
                              readOnly={true}
                            />
                          </Box>
                        </Grid>

                        {/* Website */}
                        <Grid item xs={4}>
                          <Box sx={{ marginBottom: "10px" }}>
                            <SubHeading sx={{ marginBottom: "5px" }}>Website</SubHeading>
                            <PrimaryInput
                              type="text"
                              name="website"
                              placeholder="Website"
                              value={values.website}
                              helperText={touched.website && errors.website ? errors.website : ""}
                              error={touched.website && !!errors.website}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </Box>
                        </Grid>

                        {/* Address */}
                        <Grid item xs={4}>
                          <Box sx={{ marginBottom: "10px" }}>
                            <SubHeading sx={{ marginBottom: "5px" }}>Address</SubHeading>
                            <PrimaryInput
                              type="text"
                              name="address"
                              placeholder="Address"
                              value={values.address}
                              helperText={touched.address && errors.address ? errors.address : ""}
                              error={touched.address && !!errors.address}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </Box>
                        </Grid>
                      </Grid>

                      {/* Professional Info */}
                      <SubHeading sx={{ margin: "20px 0", fontSize: "17px", position: "relative" }}>
                        <Box sx={stepsStyle}>2</Box>
                        Professional Information
                      </SubHeading>

                      <Grid container rowSpacing={2} columnSpacing={4}>
                        {/* Specialization */}
                        <Grid item xs={4}>
                          <Box sx={{ marginBottom: "10px" }}>
                            <SubHeading sx={{ marginBottom: "5px" }}>Specialization</SubHeading>
                            <PrimaryInput
                              type="text"
                              name="specialization"
                              placeholder="Specialization"
                              value={values.specialization}
                              helperText={
                                touched.specialization && errors.specialization
                                  ? errors.specialization
                                  : ""
                              }
                              error={touched.specialization && !!errors.specialization}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </Box>
                        </Grid>

                        {/* Experience */}
                        <Grid item xs={4}>
                          <Box sx={{ marginBottom: "10px" }}>
                            <SubHeading sx={{ marginBottom: "5px" }}>Experience</SubHeading>
                            <PrimaryInput
                              type="number"
                              name="experience"
                              placeholder="Experience"
                              value={values.experience}
                              helperText={
                                touched.experience && errors.experience ? errors.experience : ""
                              }
                              error={touched.experience && !!errors.experience}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </Box>
                        </Grid>

                        {/* Fee */}
                        <Grid item xs={4}>
                          <Box sx={{ marginBottom: "10px" }}>
                            <SubHeading sx={{ marginBottom: "5px" }}>
                              Fee Per Consultation
                            </SubHeading>
                            <PrimaryInput
                              type="number"
                              name="feePerConsultation"
                              placeholder="Fee Per Consultation"
                              value={values.feePerConsultation}
                              helperText={
                                touched.feePerConsultation && errors.feePerConsultation
                                  ? errors.feePerConsultation
                                  : ""
                              }
                              error={touched.feePerConsultation && !!errors.feePerConsultation}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </Box>
                        </Grid>

                        {/* Time Pickers */}
                        <Grid item xs={4}>
                          <Box sx={{ marginBottom: "10px" }}>
                            <SubHeading sx={{ marginBottom: "5px" }}>Start Time</SubHeading>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <TimePicker
                                value={values.fromTime}
                                onChange={(value) => setFieldValue("fromTime", value)}
                                renderInput={(params) => <TextField {...params} />}
                              />
                            </LocalizationProvider>
                            {touched.fromTime && errors.fromTime && (
                              <Box sx={{ color: "#d32f2f", fontSize: "0.7rem", marginLeft: "2px" }}>
                                {errors.fromTime}
                              </Box>
                            )}
                          </Box>
                        </Grid>
                        <Grid item xs={4}>
                          <Box sx={{ marginBottom: "10px" }}>
                            <SubHeading sx={{ marginBottom: "5px" }}>End Time</SubHeading>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <TimePicker
                                value={values.toTime}
                                onChange={(value) => setFieldValue("toTime", value)}
                                renderInput={(params) => <TextField {...params} />}
                              />
                            </LocalizationProvider>
                            {touched.toTime && errors.toTime && (
                              <Box sx={{ color: "#d32f2f", fontSize: "0.7rem", marginLeft: "2px" }}>
                                {errors.toTime}
                              </Box>
                            )}
                          </Box>
                        </Grid>
                      </Grid>

                      <Box sx={{ display: "flex", justifyContent: "end", marginTop: "20px" }}>
                        <Button
                          type="submit"
                          variant="contained"
                          disabled={isLoading}
                          sx={{ padding: "5px 30px", textTransform: "capitalize", margin: "20px 0" }}
                        >
                          {isLoading ? "Apply..." : "Apply"}
                        </Button>
                      </Box>
                    </Form>
                  );
                }}
              </Formik>
            </Box>
          )}
        </Box>
      </Navbar>
      <ToastAlert
        appearence={toast.appearence}
        type={toast.type}
        message={toast.message}
        handleClose={handleCloseToast}
      />
    </>
  );
};

export default ApplyDoctor;
