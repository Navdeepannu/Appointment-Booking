import { useNavigate } from "react-router-dom"
import { AppContext } from "../context/Context"
import { useContext } from "react"

const TopDoctors = () => {
  const navigate = useNavigate()
  const doctors = useContext(AppContext) // destructure the doctors

  //TODO: Handle case when Data is not available
  if (!doctors || doctors.length === 0) {
    return <p>Loading...</p> // Handle the case where doctors are not available yet
  }

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10 ">
      <h1 className="text-3xl font-light">Top Doctors to Book</h1>
      <p className="sm:w-1/3 text-center text-sm font-light">
        Easily explore the most trusted doctors in your area.
      </p>

      {/* Doctors card */}
      <div
        className="w-full grid gap-4 pt-5 gap-y-6 px-3 sm:px-0"
        style={{ gridTemplateColumns: "var(--grid-cols-auto)" }}
      >
        {doctors.slice(1, 10).map((item, index) => (
          <div
            onClick={() => navigate(`/appointment/${item._id}`)}
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] duration-500 transition-all"
            key={index}
          >
            <img className="bg-blue-50" src={item.image} alt="doctors_image" />
            <div className="p-4">
              <div className="flex items-center gap-2 text-sm text-center text-green-500">
                <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                <p>Available</p>
              </div>
              <p className="text-gray-900 text-lg font-medium">{item.name}</p>
              <p className="text-gray-600 text-sm">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="bg-blue-100 cursor-pointer text-gray-600 px-12 py-2 rounded-full mt-10 text-lg">
        More
      </button>
    </div>
  )
}

export default TopDoctors
