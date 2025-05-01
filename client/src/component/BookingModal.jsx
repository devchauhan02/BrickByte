import React, { useContext, useState } from "react";
import { Modal, Button } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useMutation } from "react-query";
import UserDetailContext from "../context/UserDetailContext";
import { bookVisit } from "../utils/api";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import "react-toastify/dist/ReactToastify.css";

const BookingModal = ({ opened, setOpened, email, propertyId }) => {
  const [value, setValue] = useState(null);
  const {
    userDetail: { token },
    setUserDetail,
  } = useContext(UserDetailContext);

  const handleBookingSuccess = () => {
    toast.success("You have booked your visit", {
      position: "bottom-right",
    });

    // Update the bookings array in context and localStorage
    setUserDetail((prev) => {
      const updatedBookings = [
        ...(prev.bookings || []), // If bookings is undefined, initialize as empty array
        { id: propertyId, date: dayjs(value).format("DD/MM/YYYY") },
      ];

      // Save updated bookings to localStorage
      const newDetail = { ...prev, bookings: updatedBookings };
      localStorage.setItem("userDetail", JSON.stringify(newDetail));

      return newDetail;
    });
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: () => bookVisit(value, propertyId, email, token),
    onSuccess: () => handleBookingSuccess(),
    onError: ({ response }) => toast.error(response?.data?.message || "Booking failed"),
    onSettled: () => setOpened(false),
  });

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Select your date of visit"
      centered
    >
      <div className="flex flex-col justify-center items-center" style={{ gap: "1rem" }}>
        <DatePicker value={value} onChange={setValue} minDate={new Date()} />
        <Button disabled={!value || isLoading} onClick={() => mutate()}>
          Book visit
        </Button>
      </div>
    </Modal>
  );
};

export default BookingModal;
