import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center bg-white px-10 border-b border-gray-300 py-3">
        <div>
          <h1 className="flex items-center gap-3 font-semibold">
            <img
              width={"130px"}
              src={
                "https://www.saylaniwelfare.com/static/media/logo_saylaniwelfare.22bf709605809177256c.png"
              }
              alt="Logo"
            />{" "}
            Saylani Microfinance App
          </h1>
        </div>
        <div>
          <Link to={"/login"}>
            <button className="bg-blue-600 text-white font-semibold rounded-md py-1 px-8">
              Login
            </button>
          </Link>
        </div>
      </div>

      {/* hero */}
    </>
  );
}

export default Home;
