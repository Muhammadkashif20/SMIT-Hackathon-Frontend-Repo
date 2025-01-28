import React, { useState } from "react";
import { message, Modal, Button } from "antd";

function GuarantorForm() {
  const [guarantor1, setGuarantor1] = useState({ name: "", email: "", location: "", cnic: "" });
  const [guarantor2, setGuarantor2] = useState({ name: "", email: "", location: "", cnic: "" });
  const [user, setUser] = useState({ name: "", address: "", phone: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isGuarantorModalOpen, setIsGuarantorModalOpen] = useState(true);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  const validateGuarantor = () => {
    if (
      !guarantor1.name ||
      !guarantor1.email ||
      !guarantor1.location ||
      !guarantor1.cnic ||
      !guarantor2.name ||
      !guarantor2.email ||
      !guarantor2.location ||
      !guarantor2.cnic
    ) {
      message.error("All guarantor fields are required.");
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
      setIsGuarantorModalOpen(false);
      setIsUserModalOpen(true);
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
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {/* Guarantor Modal */}
      <Modal
        title="Guarantor Details"
        open={isGuarantorModalOpen}
        onCancel={() => message.warning("Please complete guarantor details.")}
        footer={null}
        centered
      >
        <h3 className="text-lg font-semibold mb-4">Guarantor 1</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              value={guarantor1.name}
              onChange={(e) => setGuarantor1({ ...guarantor1, name: e.target.value })}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={guarantor1.email}
              onChange={(e) => setGuarantor1({ ...guarantor1, email: e.target.value })}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Location</label>
            <input
              type="text"
              value={guarantor1.location}
              onChange={(e) => setGuarantor1({ ...guarantor1, location: e.target.value })}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">CNIC</label>
            <input
              type="text"
              value={guarantor1.cnic}
              onChange={(e) => setGuarantor1({ ...guarantor1, cnic: e.target.value })}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <h3 className="text-lg font-semibold mt-6 mb-4">Guarantor 2</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              value={guarantor2.name}
              onChange={(e) => setGuarantor2({ ...guarantor2, name: e.target.value })}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={guarantor2.email}
              onChange={(e) => setGuarantor2({ ...guarantor2, email: e.target.value })}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Location</label>
            <input
              type="text"
              value={guarantor2.location}
              onChange={(e) => setGuarantor2({ ...guarantor2, location: e.target.value })}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">CNIC</label>
            <input
              type="text"
              value={guarantor2.cnic}
              onChange={(e) => setGuarantor2({ ...guarantor2, cnic: e.target.value })}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <Button
          type="primary"
          className="w-full mt-4"
          onClick={handleGuarantorSubmit}
        >
          Next
        </Button>
      </Modal>

      {/* User Modal */}
      <Modal
        title="User Details"
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
