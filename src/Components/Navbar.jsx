import { Button } from "antd";
function Navbar() {
    return (
    <div className="flex flex-wrap items-center p-3 shadow-md bg-white ">
      <h1 className="text-3xl hidden  sm:flex ms-5  font-semibold text-[#0B73B7] tracking-wide">
        SMIT Microfinance 
      </h1>
      <div className="flex flex-wrap ms-auto items-center gap-3 me-3">

        <Button
          type="primary"
          style={{ color: "white" }}
          className="text-white"
          >
          LOGIN
        </Button>
        <Button
          type="primary"
          style={{ color: "white" }}
          className="text-white"
          >
          Loan Detail
        </Button>
      </div>
    </div>
  );
};
export default Navbar;
