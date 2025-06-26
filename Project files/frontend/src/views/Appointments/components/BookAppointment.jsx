// React Imports
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// Redux
import {
  useBookedAppointmentsQuery,
  useCheckBookingAvailabilityMutation,
  useGetDoctorQuery,
} from "../../../redux/api/doctorSlice";
// Utils
import {
  add30Minutes,
  convertToAMPMFormat,
  formatDate,
  formatTime,
  onKeyDown,
  thousandSeparatorNumber,
} from "../../../utils";
// React Icons
import { RiLuggageDepositLine } from "react-icons/ri";
import { MdOutlineExplicit } from "react-icons/md";
import { CiLocationOn, CiMoneyCheck1 } from "react-icons/ci";
import { IoMdTime } from "react-icons/io";
// Formik
import { Form, Formik } from "formik";
// Yup
import * as Yup from "yup";
// MUI Imports
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Box, Grid, Divider, Button, TextField } from "@mui/material";
// Custom Imports
import DatePicker from "../../../components/DatePicker";
import Navbar from "../../../components/Navbar";
import { Heading, SubHeading } from "../../../components/Heading";
import OverlayLoader from "../../../components/Spinner/OverlayLoader";
import useTypedSelector from "../../../hooks/useTypedSelector";
import { selectedUserId, userIsDoctor } from "../../../redux/auth/authSlice";
import {
  useBookAppointmentMutation,
  useGetUserQuery,
} from "../../../redux/api/userSlice";
import ToastAlert from "../../../components/ToastAlert/ToastAlert";

const AppointmentSchema = Yup.object().shape({
  date: Yup.string().required("Date is required"),
  time: Yup.string().required("Time is required"),
});

const BookAppointment = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const loginUserId = useTypedSelector(selectedUserId);
  const isDoctor = useTypedSelector(userIsDoctor);
  const [isAvailable, setIsAvailable] = useState(false);
  const [appointment, setAppointment] = useState("");
  const [formValues] = useState({ date: null, time: null });
  const [toast, setToast] = useState({ message: "", appearence: false, type: "" });

  const handleCloseToast = () => setToast({ ...toast, appearence: false });

  const { data, isLoading } = useGetDoctorQuery({ userId });
  const { data: logedInUserData, isLoading: logedInUserLoading } = useGetUserQuery({ userId: loginUserId });
  const { data: getAppointmentData, isLoading: getAppointmentLoading } = useBookedAppointmentsQuery({ userId });

  const [bookAppointment, { isLoading: appointmentLoading }] = useBookAppointmentMutation();
  const [checkBookingAvailability, { isLoading: checkBookingLoading }] = useCheckBookingAvailabilityMutation();

  const appointmentHandler = async (appointmentData) => {
    const payload = {
      doctorId: userId,
      date: appointmentData.date,
      time: appointmentData.time,
    };

    if (appointment === "checkAvailability") {
      try {
        const doctorAvailability = await checkBookingAvailability(payload);
        if (doctorAvailability?.data?.status) {
          setIsAvailable(true);
          setToast({ message: doctorAvailability.data.message, appearence: true, type: "success" });
        } else {
          setToast({ message: doctorAvailability?.error?.data?.message, appearence: true, type: "error" });
        }
      } catch (error) {
        setToast({ message: "Something went wrong", appearence: true, type: "error" });
      }
    }

    if (appointment === "bookAppointment") {
      try {
        const response = await bookAppointment({
          ...payload,
          userId: loginUserId,
          doctorInfo: data?.data,
          userInfo: logedInUserData?.data,
        });

        if (response?.data?.status) {
          setIsAvailable(false);
          setToast({ message: response.data.message, appearence: true, type: "success" });
          setTimeout(() => navigate(isDoctor ? "/doctors/appointments" : "/appointments"), 1500);
        } else {
          setToast({ message: response?.error?.data?.message, appearence: true, type: "error" });
        }
      } catch (error) {
        setToast({ message: "Something went wrong", appearence: true, type: "error" });
      }
    }
  };

  return (
    <>
      {(isLoading || logedInUserLoading || getAppointmentLoading) && <OverlayLoader />}
      <Navbar>
        <Heading>Book Appointments</Heading>
        {/* UI content omitted for brevity */}
      </Navbar>
      <ToastAlert {...toast} handleClose={handleCloseToast} />
    </>
  );
};

export default BookAppointment;