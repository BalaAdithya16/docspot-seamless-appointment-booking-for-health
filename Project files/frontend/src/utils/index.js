import { parsePhoneNumber } from "libphonenumber-js";
import moment from "moment";

// Prevent auto form submission on Enter key
export function onKeyDown(keyEvent) {
  if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
    keyEvent.preventDefault();
  }
}

// Remove dashes and spaces from the number
export const removeDashAndSpace = (value) => {
  return value.replace(/[- ]/g, "");
};

// Format date and time - e.g., 2023-11-19T08:58:06.435Z => 11/19/2023, 1:58 AM
export function formatDateTime(dateString) {
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const date = new Date(dateString);
  return date.toLocaleString("en-US", options);
}

// Format date only - e.g., 2023-11-21T19:00:00.000Z => 11/22/2023
export function formatDate(dateString) {
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  const date = new Date(dateString);
  return date.toLocaleString("en-US", options);
}

// Format time only - e.g., "2023-11-21T11:00:00.644Z" => 4:00 AM
export function formatTime(inputDateString) {
  const options = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const date = new Date(inputDateString);
  return date.toLocaleString("en-US", options);
}

// Masking Mobile Number e.g., +923234910944 => 0323 4910955
export const maskingPhoneNumber = (value) => {
  if (value) {
    const phoneNumber = parsePhoneNumber(value);
    return phoneNumber.formatNational();
  }
};

// Add 30 minutes to time
export const add30Minutes = (timeString) => {
  const momentTime = moment(timeString);
  const newTime = momentTime.add(30, "minutes");
  return newTime.format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
};

// Notification Friendly Messages
export function processNotification(notification) {
  switch (notification) {
    case "new-doctor-request":
      return "New Doctor 🩺 Request";
    case "new-doctor-request-changed":
      return "🎉 Your request was successfully accepted";
    case "new-appointment-request":
      return "New 💉 Appointment Request";
    case "appointment-status-changed":
      return "Appointment Confirmation";
    default:
      return "Unknown Notification";
  }
}

// Salman Muazam => SM
export function getNameInitials(name) {
  const words = name?.split(" ");
  const initials = words?.map((word) => word.charAt(0).toUpperCase());
  return initials?.join("");
}

// Convert ISO timestamp to AM/PM format
export function convertToAMPMFormat(timestamp) {
  const date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  return `${hours}:${minutes} ${ampm}`;
}

// 1200 => 1,200
export function thousandSeparatorNumber(number) {
  if (typeof number !== "number" || isNaN(number)) {
    return "Invalid number";
  }

  const numberString = number.toString();
  const [integerPart, decimalPart] = numberString.split(".");
  const formattedIntegerPart = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ","
  );

  return decimalPart
    ? `${formattedIntegerPart}.${decimalPart}`
    : formattedIntegerPart;
}
