import React from 'react';
import { Search, User } from 'lucide-react';

const SearchBar = () => (
  <div className="flex items-center bg-white rounded-lg shadow-md p-2">
    <Search className="text-green-600 w-5 h-5 mr-2" />
    <input 
      type="text" 
      placeholder="Search by name, ID, or phone number" 
      className="flex-grow outline-none text-green-800"
    />
    <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300">
      Search
    </button>
  </div>
);

const MemberCard = ({ name, id, phone, plan }) => (
  <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
    <div className="flex items-center">
      <User className="text-green-600 w-10 h-10 mr-4" />
      <div>
        <h3 className="font-semibold text-green-800">{name}</h3>
        <p className="text-sm text-gray-600">ID: {id} | Phone: {phone}</p>
      </div>
    </div>
    <div>
      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
        {plan}
      </span>
    </div>
  </div>
);

export default function SearchMembers() {
  return (
    <div className="min-h-screen bg-green-50 p-6">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Search Members</h1>
      <SearchBar />
      <div className="mt-8 space-y-4">
        <MemberCard name="John Doe" id="2I001" phone="9876543210" plan="Premium" />
        <MemberCard name="Jane Smith" id="2I002" phone="9876543211" plan="Basic" />
        <MemberCard name="Robert Brown" id="2I003" phone="9876543212" plan="Advanced" />
      </div>
    </div>
  );
}
