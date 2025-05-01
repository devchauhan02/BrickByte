// Facilities.jsx

import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, Group, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useContext, useEffect } from "react";
import UserDetailContext from "../context/UserDetailContext.jsx";
import useProperties from "../hooks/useProperties.jsx";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { createResidency } from "../utils/api";

const Facilities = ({
  prevStep,
  propertyDetails,
  setPropertyDetails,
  setOpened,
  setActiveStep,
}) => {
  // Form setup
  const form = useForm({
    initialValues: {
      bedrooms: propertyDetails.facilities.bedrooms,
      parkings: propertyDetails.facilities.parkings,
      bathrooms: propertyDetails.facilities.bathrooms,
    },
    validate: {
      bedrooms: (value) => (value < 1 ? "Must have at least one room" : null),
      bathrooms: (value) => (value < 1 ? "Must have at least one bathroom" : null),
    },
  });

  const { bedrooms, parkings, bathrooms } = form.values;

  // Handle form submit
  const handleSubmit = () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      const updatedDetails = {
        ...propertyDetails,
        facilities: { bedrooms, parkings, bathrooms },
      };

      // Debugging the updated property details
      console.log("Submitting property details:", updatedDetails);

      setPropertyDetails(updatedDetails);
      mutate(updatedDetails);  // Ensure the updated details are passed to the mutation
    }
  };

  // ==================== Upload Logic
  const { user } = useAuth0();

  // Ensure the token exists before accessing it
  const {
    userDetail: { token } = {},
  } = useContext(UserDetailContext);

  useEffect(() => {
    console.log("Token from context:", token);  // Debugging the token
  }, [token]);

  const { refetch: refetchProperties } = useProperties();

  // Prevent errors in mutation if token is not available
  const { mutate, isLoading } = useMutation({
    mutationFn: (updatedDetails) => {
      if (!token) {
        toast.error("Token is missing", { position: "bottom-right" });
        console.error("Token is missing!");  // Log the issue
        return; // Prevent mutation if token is unavailable
      }

      console.log("Token is available:", token);  // Confirm token availability
      console.log("Payload for createResidency:", updatedDetails);  // Check payload

      return createResidency(updatedDetails, token);
    },
    onError: ({ response }) => toast.error(response.data.message, { position: "bottom-right" }),
    onSettled: () => {
      toast.success("Added Successfully", { position: "bottom-right" });
      setPropertyDetails({
        title: "",
        description: "",
        price: 0,
        country: "",
        city: "",
        address: "",
        image: null,
        facilities: {
          bedrooms: 0,
          parkings: 0,
          bathrooms: 0,
        },
        userEmail: user?.email,
      });
      setOpened(false);
      setActiveStep(0);
      refetchProperties();
    },
  });

  return (
    <Box maw="30%" mx="auto" my="sm">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <NumberInput
          withAsterisk
          label="No of Bedrooms"
          min={0}
          {...form.getInputProps("bedrooms")}
        />
        <NumberInput
          label="No of Parkings"
          min={0}
          {...form.getInputProps("parkings")}
        />
        <NumberInput
          withAsterisk
          label="No of Bathrooms"
          min={0}
          {...form.getInputProps("bathrooms")}
        />
        <Group position="center" mt="xl">
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
          <Button type="submit" color="green" disabled={isLoading}>
            {isLoading ? "Submitting" : "Add Property"}
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default Facilities;
