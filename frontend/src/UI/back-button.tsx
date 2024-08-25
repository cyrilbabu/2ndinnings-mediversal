import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();
  return (
    <div
      className="absolute top-0 right-0 text-sm font-bold m-6 mt-5 rounded-full font-samibold px-2 pr-3 py-1  bg-green-600 text-slate-50 cursor-pointer hover:scale-110 hover:bg-blue-900"
      onClick={() => navigate(-1)}
    >
      <div className="flex justify-center items-center">
        {/* <IoChevronBackOutline /> */}
        Back
      </div>
    </div>
  );
}
