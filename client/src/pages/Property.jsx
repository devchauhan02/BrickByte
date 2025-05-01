import React, { useState, useContext } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { getProperty, deleteResidency, removeBooking } from '../utils/api';
import { PuffLoader } from 'react-spinners';
import { AiTwotoneCar } from 'react-icons/ai';
import { FaShower } from 'react-icons/fa';
import { MdMeetingRoom, MdLocationPin } from 'react-icons/md';
import Map from '../component/Map';
import useAuthCheck from '../hooks/useAuthCheck';
import { useAuth0 } from '@auth0/auth0-react';
import BookingModal from '../component/BookingModal';
import UserDetailContext from '../context/UserDetailContext';
import { Button } from '@mantine/core';
import { toast } from 'react-toastify';
import Heart from '../component/Heart';

const Property = () => {
  const { pathname } = useLocation();
  const id = pathname.split("/")[2];

  const { data, isLoading, isError } = useQuery(["residency", id], () => getProperty(id));
  const [modalOpened, setModalOpened] = useState(false);
  const { validateLogin } = useAuthCheck();
  const { user } = useAuth0();

  const {
    userDetail: { token, bookings },
    setUserDetail,
  } = useContext(UserDetailContext);

  // Mutation to delete property
  const { mutate: deleteProperty, isLoading: deleting } = useMutation({
    mutationFn: () => deleteResidency(id, token),
    onSuccess: () => {
      toast.success("Property deleted successfully", { position: "bottom-right" });
      // Optionally redirect or reload
    },
    onError: (error) => {
      toast.error(error.message || "Error deleting property", { position: "bottom-right" });
    },
  });

  // Mutation to cancel booking
  const { mutate: cancelBooking, isLoading: cancelling } = useMutation({
    mutationFn: () => removeBooking(id, user?.email, token),
    onSuccess: () => {
      setUserDetail((prev) => ({
        ...prev,
        bookings: prev.bookings.filter((booking) => booking?.id !== id),
      }));
      toast.success("Booking cancelled", { position: "bottom-right" });
    },
  });

  // Check if the current user is the owner (case-insensitive match)
  const isOwner =
    data?.residency?.userEmail?.toLowerCase() === user?.email?.toLowerCase();

  console.log("Property Owner:", data?.residency?.userEmail);
  console.log("Logged-in User:", user?.email);
  console.log("isOwner:", isOwner);

  if (isLoading)
    return (
      <div className="flex justify-center items-center mt-4">
        <PuffLoader color="#36d7b7" height={80} width={80} radius={1} aria-label="Loading..." />
      </div>
    );

  if (isError)
    return <div className="flex justify-center mt-4">Error while fetching data</div>;

  return (
    <div>
      <div className="gap-[2rem] relative">
        <div className="absolute top-[1.1rem] right-[15rem] cursor-pointer">
          <Heart id={id} />
        </div>
        <img
          src={data?.residency?.image}
          className="mx-auto max-h-[30rem] w-[70%] rounded-xl mt-[2rem] object-cover"
        />

        <div className="flex flex-col md:flex-row justify-between gap-8 w-[70%] mx-auto">
          {/* Left Section */}
          <div className="flex flex-col gap-6 flex-1">
            <div className="flex flex-col md:flex-row items-center gap-[1rem] mt-[1.9rem]">
              <span className="text-3xl font-bold text-primary">{data?.residency?.title}</span>
              <span className="text-orange-500 text-xl font-semibold">
                $ {data?.residency?.price}
              </span>
            </div>

            <div className="flex flex-col md:flex-row gap-4 text-sm p-4">
              <div className="flex items-center gap-2">
                <FaShower size={20} color="#1F3E72" />
                <span>{data?.residency?.facilities?.bathrooms} Bathrooms</span>
              </div>
              <div className="flex items-center gap-2">
                <AiTwotoneCar size={20} color="#1F3E72" />
                <span>{data?.residency?.facilities?.parkings} Parking</span>
              </div>
              <div className="flex items-center gap-2">
                <MdMeetingRoom size={20} color="#1F3E72" />
                <span>{data?.residency?.facilities?.bedrooms} Room/s</span>
              </div>
            </div>

            <span className="text-gray-500 text-justify">{data?.residency?.description}</span>

            <div className="flex items-center gap-4">
              <MdLocationPin size={25} />
              <span className="text-gray-600">
                {data?.residency?.address} {data?.residency?.city} {data?.residency?.country}
              </span>
            </div>

            {bookings?.map((booking) => booking.id).includes(id) ? (
              <>
                <Button
                  variant="outline"
                  w={"100%"}
                  color="red"
                  onClick={() => cancelBooking()}
                  disabled={cancelling}
                >
                  Cancel booking
                </Button>
                <span>
                  Your visit already booked for date{" "}
                  {bookings?.filter((booking) => booking?.id === id)[0].date}
                </span>
              </>
            ) : (
              <button
                className="w-[35%] mt-4 px-1 py-3 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer rounded-lg transition-transform hover:scale-105"
                onClick={() => {
                  validateLogin() && setModalOpened(true);
                }}
              >
                Book your visit
              </button>
            )}

            {/* Delete Property Button */}
            {isOwner && (
              <Button
                color="red"
                onClick={() => {
                  if (window.confirm("Are you sure you want to delete this property?")) {
                    deleteProperty();
                  }
                }}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete Property"}
              </Button>
            )}

            <BookingModal
              opened={modalOpened}
              setOpened={setModalOpened}
              propertyId={data?.residency?.id}
              email={user?.email}
            />
          </div>

          {/* Right Section (Map) */}
          <div className="flex flex-col gap-6 flex-1">
            <Map
              address={data?.residency?.address}
              city={data?.residency?.city}
              country={data?.residency?.country}
              email={user?.email}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Property;
