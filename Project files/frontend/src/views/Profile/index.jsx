// React Imports
import { useState, useEffect } from "react";
// Hooks
import useTypedSelector from "../../hooks/useTypedSelector";
// Formik
import { Form, Formik } from "formik";
// Utils
import { onKeyDown } from "../../utils";
// Redux
import { selectedUserId, userIsDoctor } from "../../redux/auth/authSlice";
import {
  useGetDoctorQuery,
  useUpdateDoctorMutation,
} from "../../redux/api/doctorSlice";
// MUI Imports
import { Box, Button, Grid, Stack, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// Custom Imports
import { applyDoctorSchema } from "../ApplyDoctor/components/validationSchema";
import UserProfile from "./components/userProfile";
import Navbar from "../../components/Navbar";
import OverlayLoader from "../../components/Spinner/OverlayLoader";
import { Heading, SubHeading } from "../../components/Heading";
import ToastAlert from "../../components/ToastAlert/ToastAlert";
import PrimaryInput from "../../components/PrimaryInput/PrimaryInput";
import PrimaryPhoneInput from "../../components/PhoneInput";

const stepsStyle = {
  position: "absolute",
  background: "#5bc0de ",
  color: "#fff",
  left: "-40px",
  width: "35px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderTopLeftRadius: "10px",
  borderBottomRightRadius: "10px",
};

const Profile = () => {
  const userId = useTypedSelector(selectedUserId);
  const isDoctor = useTypedSelector(userIsDoctor);

  const [formValues, setFormValues] = useState({
    prefix: "",
    fullName: "",
    phoneNumber: "",
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

  const {
    data,
    isLoading,
    isSuccess,
    refetch: refetchUser,
  } = useGetDoctorQuery({
    userId,
  });

  useEffect(() => {
    if (isSuccess) {
      setFormValues({
        prefix: data?.data?.prefix,
        fullName: data?.data?.fullName,
        phoneNumber: data?.data?.phoneNumber,
        website: data?.data?.website,
        address: data?.data?.address,
        specialization: data?.data?.specialization,
        experience: data?.data?.experience,
        feePerConsultation: data?.data?.feePerConsultation,
        fromTime: data?.data?.fromTime,
        toTime: data?.data?.toTime,
      });
    }
  }, [data, isSuccess]);

  const [updateProfile, { isLoading: profileLoading }] = useUpdateDoctorMutation({});

  const profileHandler = async (data) => {
    try {
      const payload = { ...data };
      const response = await updateProfile({
        userId,
        body: payload,
      });

      if (response?.data?.status) {
        refetchUser();
        setToast({
          ...toast,
          message: "Profile updated successfully",
          appearence: true,
          type: "success",
        });
      } else if (response?.error) {
        setToast({
          ...toast,
          message: response?.error?.data?.message,
          appearence: true,
          type: "error",
        });
      }
    } catch (error) {
      setToast({
        message: "Something went wrong",
        appearence: true,
        type: "error",
      });
    }
  };

  return (
    <>
      {isDoctor ? (
        <>
          {isLoading && <OverlayLoader />}
          <Navbar>
            <Box>
              <Heading>Profile</Heading>
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
                  onSubmit={profileHandler}
                  validationSchema={applyDoctorSchema}
                  enableReinitialize
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
                                readOnly
                                helperText={errors.prefix && touched.prefix ? errors.prefix : ""}
                                error={!!(errors.prefix && touched.prefix)}
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
                                readOnly
                                sx={{ cursor: "not-allowed" }}
                                helperText={errors.fullName && touched.fullName ? errors.fullName : ""}
                                error={!!(errors.fullName && touched.fullName)}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </Box>
                          </Grid>

                          {/* Phone Number */}
                          <Grid item xs={4}>
                            <Box sx={{ marginBottom: "10px" }}>
                              <SubHeading sx={{ marginBottom: "5px" }}>Mobile Number</SubHeading>
                              <PrimaryPhoneInput
                                value={values.phoneNumber}
                                name="phoneNumber"
                                formik={props}
                                variant="outlined"
                                label=""
                                readOnly
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
                                helperText={errors.website && touched.website ? errors.website : ""}
                                error={!!(errors.website && touched.website)}
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
                                helperText={errors.address && touched.address ? errors.address : ""}
                                error={!!(errors.address && touched.address)}
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
                                helperText={errors.specialization && touched.specialization ? errors.specialization : ""}
                                error={!!(errors.specialization && touched.specialization)}
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
                                helperText={errors.experience && touched.experience ? errors.experience : ""}
                                error={!!(errors.experience && touched.experience)}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </Box>
                          </Grid>

                          {/* Fee */}
                          <Grid item xs={4}>
                            <Box sx={{ marginBottom: "10px" }}>
                              <SubHeading sx={{ marginBottom: "5px" }}>Fee Per Consultation</SubHeading>
                              <PrimaryInput
                                type="number"
                                name="feePerConsultation"
                                placeholder="Fee Per Consultation"
                                value={values.feePerConsultation}
                                helperText={errors.feePerConsultation && touched.feePerConsultation ? errors.feePerConsultation : ""}
                                error={!!(errors.feePerConsultation && touched.feePerConsultation)}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </Box>
                          </Grid>

                          {/* Start Time */}
                          <Grid item xs={4}>
                            <Box sx={{ marginBottom: "10px" }}>
                              <SubHeading sx={{ marginBottom: "5px" }}>Start Time</SubHeading>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Stack spacing={3}>
                                  <TimePicker
                                    label=""
                                    value={values.fromTime}
                                    onChange={(value) => setFieldValue("fromTime", value)}
                                    renderInput={(params) => <TextField {...params} />}
                                  />
                                </Stack>
                                {errors.fromTime && touched.fromTime && (
                                  <Box sx={{ color: "#d32f2f", fontSize: "0.7rem" }}>{errors.fromTime}</Box>
                                )}
                              </LocalizationProvider>
                            </Box>
                          </Grid>

                          {/* End Time */}
                          <Grid item xs={4}>
                            <Box sx={{ marginBottom: "10px" }}>
                              <SubHeading sx={{ marginBottom: "5px" }}>End Time</SubHeading>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Stack spacing={3}>
                                  <TimePicker
                                    label=""
                                    value={values.toTime}
                                    onChange={(value) => setFieldValue("toTime", value)}
                                    renderInput={(params) => <TextField {...params} />}
                                  />
                                </Stack>
                                {errors.toTime && touched.toTime && (
                                  <Box sx={{ color: "#d32f2f", fontSize: "0.7rem" }}>{errors.toTime}</Box>
                                )}
                              </LocalizationProvider>
                            </Box>
                          </Grid>
                        </Grid>

                        <Box sx={{ display: "flex", justifyContent: "end", marginTop: "20px" }}>
                          <Button
                            type="submit"
                            variant="contained"
                            disabled={profileLoading}
                            sx={{
                              padding: "5px 30px",
                              textTransform: "capitalize",
                              margin: "20px 0",
                            }}
                          >
                            {profileLoading ? "Update..." : "Update"}
                          </Button>
                        </Box>
                      </Form>
                    );
                  }}
                </Formik>
              </Box>
            </Box>
          </Navbar>
        </>
      ) : (
        <UserProfile />
      )}

      <ToastAlert
        appearence={toast.appearence}
        type={toast.type}
        message={toast.message}
        handleClose={handleCloseToast}
      />
    </>
  );
};

export default Profile;
