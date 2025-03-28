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
  const [user, setUser] = useState({ name: "", address: "", phone: "" ,email:""});
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const validateFields = (fields) => {
    return Object.values(fields).every((field) => field.trim() !== "");
  };

  const handleNext = () => {
    if (!validateFields(guarantors[currentStep])) {
      message.error(`All fields for Guarantor ${currentStep + 1} are required.`);
      return;
    }
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleSubmit = async () => {
    if (!validateFields(user)) {
      message.error("All user fields are required.");
      return;
    }

    const allGuarantorsValid = guarantors.every(validateFields);
    if (!allGuarantorsValid) {
      message.error("All fields for both guarantors are required.");
      return;
    }

    setIsLoading(true);

    try {
      const guarantorData = guarantors.map((guarantor) => ({
        name: guarantor.name,
        email: guarantor.email,
        cnic: guarantor.cnic,
        location: guarantor.location,
      }));

      const userData = {
        name: user.name,
        address: user.address,
        phone: user.phone,
        email: user.email,

      };

      console.log("Submitting payload:", { user: userData, guarantors: guarantorData });

      // Send request to backend
      const res = await axios.post(`${BASE_URL}/guarantor/addGuarantorInfo`, {
        user: userData,
        guarantors: guarantorData,
      });

      console.log("API Response:", res);

      if (res.data.error) {
        throw new Error(res.data.message || "Submission failed! Please try again.");
      }

      message.success("Form submitted successfully!");
      navigate("/slipGenerate");
    } catch (error) {
      console.error("Error occurred during form submission:", error);
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
                  if (currentStep < 2) {
                    setGuarantors((prev) => {
                      const updated = [...prev];
                      updated[currentStep] = { ...updated[currentStep], [key]: value };
                      return updated;
                    });
                  } else {
                    setUser((prev) => ({ ...prev, [key]: value }));
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