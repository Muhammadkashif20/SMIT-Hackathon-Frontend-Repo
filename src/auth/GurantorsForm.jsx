import React, { useState } from "react";
import { message, Modal, Button } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/baseurl";

function GuarantorForm() {
  const navigate = useNavigate();
  const [guarantors, setGuarantors] = useState([
    { name: "", email: "", location: "", cnic: "" },
    { name: "", email: "", location: "", cnic: "" },
  ]);
  const [user, setUser] = useState({ name: "", address: "", phone: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // Validate function for user and guarantor fields
  const validateFields = (fields) => {
    const isValid = Object.values(fields).every((field) => field.trim() !== "");
    console.log("Validating fields:", fields, "isValid:", isValid); // Debugging validation
    return isValid;
  };

  const handleNext = () => {
    console.log("Current Step:", currentStep); // Debugging the current step
    // Validate the current step's guarantor fields
    if (!validateFields(guarantors[currentStep])) {
      message.error(`All fields for Guarantor ${currentStep + 1} are required.`);
      return;
    }

    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleSubmit = async () => {
    console.log("User data on submit:", user); // Debugging the user data
    if (!validateFields(user)) {
      message.error("All user fields are required.");
      return;
    }

    const allGuarantorsValid = guarantors.every(validateFields);
    console.log("All guarantor fields valid:", allGuarantorsValid); // Debugging guarantor validation
    if (!allGuarantorsValid) {
      message.error("All fields for both guarantors are required.");
      return;
    }

    setIsLoading(true);

    try {
      const guarantorData = guarantors.map((guarantor) => ({
        name: guarantor.name.trim(),
        email: guarantor.email.trim(),
        cnic: guarantor.cnic.trim(),
        location: guarantor.location.trim(),
      }));

      // Prepare user data
      const userData = {
        name: user.name.trim(),
        address: user.address.trim(),
        phone: user.phone.trim(),
      };

      // Log the payload for debugging
      console.log("Submitting payload:", { user: userData, guarantors: guarantorData });

      // Send user & guarantor data
      const res = await axios.post(`${BASE_URL}/guarantor/addGuarantorInfo`, {
        user: userData,
        guarantors: guarantorData,
      });

      // Handle API response
      console.log("API Response:", res); // Debugging the response
      if (res.data.error) {
        throw new Error(res.data.message || "Submission failed! Please try again.");
      }

      message.success("Form submitted successfully!");
      navigate("/slipGenerate");
    } catch (error) {
      console.error("Error occurred during form submission:", error); // Debugging the error
      message.error(error.message || "Submission failed! Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Modal open={currentStep < 3} footer={null} centered closable={false}>
        <h3 className="text-lg font-semibold mb-4">
          {currentStep < 2 ? `Guarantor ${currentStep + 1}` : "User Information"}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.keys(currentStep < 2 ? guarantors[currentStep] : user).map((key) => (
            <div key={key}>
              <label className="block text-sm font-medium capitalize">{key}</label>
              <input
                type="text"
                value={currentStep < 2 ? guarantors[currentStep][key] : user[key]}
                onChange={(e) => {
                  const value = e.target.value.trim();
                  console.log(`Updating ${key} for ${currentStep < 2 ? `Guarantor ${currentStep + 1}` : "User"}`); // Debugging input change
                  if (currentStep < 2) {
                    setGuarantors((prev) => {
                      const updated = [...prev];
                      updated[currentStep] = { ...updated[currentStep], [key]: value };
                      console.log("Updated guarantor data:", updated); // Debugging updated guarantor
                      return updated;
                    });
                  } else {
                    setUser((prev) => ({ ...prev, [key]: value }));
                    console.log("Updated user data:", { ...user, [key]: value }); // Debugging updated user
                  }
                }}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md"
              />
            </div>
          ))}
        </div>
        <Button
          type="primary"
          className="w-full mt-4"
          loading={isLoading}
          onClick={currentStep < 2 ? handleNext : handleSubmit}
        >
          {currentStep < 2 ? "Next" : "Submit"}
        </Button>
      </Modal>
    </div>
  );
}

export default GuarantorForm;
