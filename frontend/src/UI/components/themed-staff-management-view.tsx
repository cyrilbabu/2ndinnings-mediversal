import React, { useState } from 'react';

const StaffForm = ({ onSubmit, editingStaff = null }) => {
  const [staff, setStaff] = useState(editingStaff || {
    name: '',
    phone: '',
    role: '',
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setStaff({ ...staff, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(staff);
    if (!editingStaff) {
      setStaff({ name: '', phone: '', role: '', username: '', password: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-green-800 mb-6">{editingStaff ? 'Edit Staff' : 'Add New Staff'}</h2>
      <div className="mb-4">
        <label className="block text-green-700 text-sm font-bold mb-2" htmlFor="name">
          Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500"
          id="name"
          type="text"
          name="name"
          value={staff.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-green-700 text-sm font-bold mb-2" htmlFor="phone">
          Phone
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500"
          id="phone"
          type="tel"
          name="phone"
          value={staff.phone}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-green-700 text-sm font-bold mb-2" htmlFor="role">
          Role
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500"
          id="role"
          name="role"
          value={staff.role}
          onChange={handleChange}
          required
        >
          <option value="">Select role</option>
          <option value="Home Care Staff">Home Care Staff</option>
          <option value="Assessor">Assessor</option>
          <option value="Care Manager">Care Manager</option>
          <option value="Admin">Admin</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-green-700 text-sm font-bold mb-2" htmlFor="username">
          Username
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500"
          id="username"
          type="text"
          name="username"
          value={staff.username}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-green-700 text-sm font-bold mb-2" htmlFor="password">
          Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500"
          id="password"
          type="password"
          name="password"
          value={staff.password}
          onChange={handleChange}
          required={!editingStaff}
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          {editingStaff ? 'Update Staff' : 'Add Staff'}
        </button>
      </div>
    </form>
  );
};

const StaffList = ({ staffList, onEdit, onDelete }) => (
  <div className="bg-white shadow-md rounded-lg p-6">
    <h2 className="text-2xl font-bold text-green-800 mb-6">Staff List</h2>
    {staffList.length === 0 ? (
      <p className="text-gray-600">No staff members added yet.</p>
    ) : (
      <ul className="space-y-4">
        {staffList.map((staff, index) => (
          <li key={index} className="bg-green-50 rounded-lg p-4 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-green-800">{staff.name}</h3>
              <p className="text-sm text-gray-600">{staff.role} | {staff.phone}</p>
            </div>
            <div>
              <button
                onClick={() => onEdit(staff)}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(staff.id)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default function ThemedStaffManagementView() {
  const [staffList, setStaffList] = useState([]);
  const [editingStaff, setEditingStaff] = useState(null);

  const handleSubmit = (staff) => {
    if (editingStaff) {
      setStaffList(staffList.map(s => s.id === staff.id ? staff : s));
      setEditingStaff(null);
    } else {
      setStaffList([...staffList, { ...staff, id: Date.now() }]);
    }
  };

  const handleEdit = (staff) => {
    setEditingStaff(staff);
  };

  const handleDelete = (id) => {
    setStaffList(staffList.filter(staff => staff.id !== id));
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-green-800 mb-8">Staff Management</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <StaffForm onSubmit={handleSubmit} editingStaff={editingStaff} />
        <StaffList staffList={staffList} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </div>
  );
}
