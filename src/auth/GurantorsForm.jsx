import React, { useState } from "react";
import { message, Modal, Button } from "antd";
import { useNavigate } from "react-router-dom";

function GuarantorForm() {
  const navigate=useNavigate()
  const [guarantor1, setGuarantor1] = useState({
    name: "",
    email: "",
    location: "",
    cnic: "",
  });
  const [guarantor2, setGuarantor2] = useState({
    name: "",
    email: "",
    location: "",
    cnic: "",
  });
  const [user, setUser] = useState({ name: "", address: "", phone: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isGuarantorModalOpen, setIsGuarantorModalOpen] = useState(true);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [currentGuarantor, setCurrentGuarantor] = useState(1); 

  const validateGuarantor = () => {
    if (
      !guarantor1.name ||
      !guarantor1.email ||
      !guarantor1.location ||
      !guarantor1.cnic
    ) {
      message.error("All fields for Guarantor 1 are required.");
      return false;
    }
    if (
      currentGuarantor === 2 &&
      (!guarantor2.name ||
        !guarantor2.email ||
        !guarantor2.location ||
        !guarantor2.cnic)
    ) {
      message.error("All fields for Guarantor 2 are required.");
      return false;
    }
    return true;
  };

  const validateUser = () => {
    if (!user.name || !user.address || !user.phone) {
      message.error("All user fields are required.");
      return false;
    }
    return true;
  };

  const handleGuarantorSubmit = () => {
    if (validateGuarantor()) {
      if (currentGuarantor === 1) {
        setCurrentGuarantor(2); 
      } else {
        setIsGuarantorModalOpen(false);
        setIsUserModalOpen(true); 
      }
    }
  };

  const handleUserSubmit = () => {
    if (validateUser()) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        message.success("Form submitted successfully!");
        setIsUserModalOpen(false);
      }, 2000);
    }
    navigate('/slipGenerate')
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {/* Guarantor Modal */}
      <Modal
        open={isGuarantorModalOpen}
        onCancel={() => message.warning("Please complete guarantor details.")}
        footer={null}
        centered
      >
        {currentGuarantor === 1 && (
          <>
            <h3 className="text-lg font-semibold mb-4">Guarantor 1</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  value={guarantor1.name}
                  onChange={(e) =>
                    setGuarantor1({ ...guarantor1, name: e.target.value })
                  }
                  className="w-full p-3 mt-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  value={guarantor1.email}
                  onChange={(e) =>
                    setGuarantor1({ ...guarantor1, email: e.target.value })
                  }
                  className="w-full p-3 mt-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Location</label>
                <input
                  type="text"
                  value={guarantor1.location}
                  onChange={(e) =>
                    setGuarantor1({ ...guarantor1, location: e.target.value })
                  }
                  className="w-full p-3 mt-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">CNIC</label>
                <input
                  type="text"
                  value={guarantor1.cnic}
                  onChange={(e) =>
                    setGuarantor1({ ...guarantor1, cnic: e.target.value })
                  }
                  className="w-full p-3 mt-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </>
        )}
        {currentGuarantor === 2 && (
          <>
            <h3 className="text-lg font-semibold mb-4">Guarantor 2</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  value={guarantor2.name}
                  onChange={(e) =>
                    setGuarantor2({ ...guarantor2, name: e.target.value })
                  }
                  className="w-full p-3 mt-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  value={guarantor2.email}
                  onChange={(e) =>
                    setGuarantor2({ ...guarantor2, email: e.target.value })
                  }
                  className="w-full p-3 mt-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Location</label>
                <input
                  type="text"
                  value={guarantor2.location}
                  onChange={(e) =>
                    setGuarantor2({ ...guarantor2, location: e.target.value })
                  }
                  className="w-full p-3 mt-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">CNIC</label>
                <input
                  type="text"
                  value={guarantor2.cnic}
                  onChange={(e) =>
                    setGuarantor2({ ...guarantor2, cnic: e.target.value })
                  }
                  className="w-full p-3 mt-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </>
        )}
        <Button
          type="primary"
          className="w-full mt-4"
          onClick={handleGuarantorSubmit}
        >
          {currentGuarantor === 1 ? "Next" : "Submit"}
        </Button>
      </Modal>

      {/* User Modal */}
      <Modal
        open={isUserModalOpen}
        onCancel={() => message.warning("Please complete user details.")}
        footer={null}
        centered
      >
        <h3 className="text-lg font-semibold mb-4">User Information</h3>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Address</label>
            <input
              type="text"
              value={user.address}
              onChange={(e) => setUser({ ...user, address: e.target.value })}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input
              type="text"
              value={user.phone}
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <Button

          type="primary"
          className="w-full mt-4"
          loading={isLoading}
          onClick={handleUserSubmit}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </Modal>
    </div>
  );
}

export default GuarantorForm;
