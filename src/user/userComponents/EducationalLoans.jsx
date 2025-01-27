import { useState } from "react";
import UserLayout from "./Sidebar";
import { Modal } from 'antd';

function EducationalLoans(){

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
       setIsModalOpen(true);
     };
     const handleOk = () => {
       setIsModalOpen(false);
     };
     const handleCancel = () => {
       setIsModalOpen(false);
     };

    return(
        <>
  
         <UserLayout>
         <div className="flex justify-between">
               <h1 className="text-center text-blue-600 text-2xl font-bold">Educational Loan</h1>
               <button onClick={showModal} className="cursor-pointer bg-blue-600 text-white font-semibold rounded-md py-1.5 px-6 text-lg">Get Loan</button>
            </div>

            <Modal title="Educational Loan" onCancel={handleCancel} open={isModalOpen} onOk={handleOk}>
              <div className="flex gap-3 pt-5 justify-between">
                  <input className="border border-gray-300 rounded-md p-2 focus:outline-none w-full" type="text" placeholder="Enter Your Name" />
                  <input className="border border-gray-300 rounded-md p-2 focus:outline-none w-full" type="email" placeholder="Enter Your Email" />
               </div>
               <div className="pt-5">
                  <select className="border border-gray-300 rounded-md p-2 focus:outline-none w-full">
                     <option>Select Category</option>
                     <option>University Fees</option>
                     <option>Child Fees Loan</option>
                  </select>
               </div>
               <div className="flex gap-3 pt-5 pb-3 justify-between">
                  <input className="border border-gray-300 rounded-md p-2 focus:outline-none w-full" type="number" placeholder="Enter Maximum Loan" />
                  <input className="border border-gray-300 rounded-md p-2 focus:outline-none w-full" type="number" placeholder="Enter Loan Period In Years" />
               </div>
           </Modal>

         </UserLayout>
        </>
    )
}

export default EducationalLoans;