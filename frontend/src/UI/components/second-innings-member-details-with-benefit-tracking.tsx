import React, { useState } from 'react';
import { User, Phone, Mail, Home, Heart, Calendar, Edit, AlertCircle, Activity, Gift, Check } from 'lucide-react';

const InfoItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-center mb-4">
    <Icon className="text-green-600 w-5 h-5 mr-2 flex-shrink-0" />
    <span className="text-sm text-green-800 font-medium mr-2">{label}:</span>
    <span className="text-sm text-gray-600">{value}</span>
  </div>
);

const ActivityItem = ({ date, activity }) => (
  <div className="flex items-center py-2 border-b border-green-100 last:border-b-0">
    <Calendar className="text-green-600 w-4 h-4 mr-2 flex-shrink-0" />
    <span className="text-sm text-gray-600 mr-2">{date}</span>
    <span className="text-sm text-green-800">{activity}</span>
  </div>
);

const BenefitItem = ({ benefit, availableCount, onAvail }) => (
  <div className="flex items-center justify-between py-2 border-b border-green-100 last:border-b-0">
    <div className="flex items-center">
      <Gift className="text-green-600 w-4 h-4 mr-2 flex-shrink-0" />
      <span className="text-sm text-green-800">{benefit}</span>
    </div>
    <div className="flex items-center">
      <span className="text-sm text-gray-600 mr-2">Available: {availableCount}</span>
      <button 
        onClick={onAvail}
        className="bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600 transition duration-300"
      >
        Avail
      </button>
    </div>
  </div>
);

const TabButton = ({ active, children, onClick }) => (
  <button
    className={`px-4 py-2 font-medium rounded-t-lg ${
      active ? 'bg-white text-green-800' : 'bg-green-100 text-green-600'
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);

export default function ViewMemberDetails() {
  const [activeTab, setActiveTab] = useState('personal');
  const [benefits, setBenefits] = useState([
    { name: "24/7 Emergency Support", count: 2 },
    { name: "Monthly Health Check-ups", count: 12 },
    { name: "Personalized Care Plan", count: 1 },
    { name: "Home Care Services", count: 20 },
    { name: "Specialist Consultations", count: 4 }
  ]);
  const [activities, setActivities] = useState([
    { date: "22/08/2023", activity: "Health Check-up" },
    { date: "15/08/2023", activity: "Physiotherapy Session" },
    { date: "05/08/2023", activity: "Doctor Consultation" }
  ]);

  const handleAvailBenefit = (index) => {
    const newBenefits = [...benefits];
    if (newBenefits[index].count > 0) {
      newBenefits[index].count -= 1;
      setBenefits(newBenefits);

      const today = new Date().toLocaleDateString();
      setActivities([
        { date: today, activity: `Availed: ${newBenefits[index].name}` },
        ...activities
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-800">Member Details</h1>
        <button className="flex items-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300">
          <Edit className="w-4 h-4 mr-2" />
          Edit Details
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 bg-green-700 text-white flex items-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mr-4">
            <User className="w-12 h-12 text-green-700" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">John Doe</h2>
            <p className="text-green-200">Member ID: 2I001 | Premium Plan</p>
          </div>
        </div>

        <div className="bg-green-100 p-4 flex space-x-4">
          <TabButton active={activeTab === 'personal'} onClick={() => setActiveTab('personal')}>
            Personal Info
          </TabButton>
          <TabButton active={activeTab === 'membership'} onClick={() => setActiveTab('membership')}>
            Membership & Benefits
          </TabButton>
          <TabButton active={activeTab === 'activities'} onClick={() => setActiveTab('activities')}>
            Activities
          </TabButton>
        </div>

        <div className="p-6">
          {activeTab === 'personal' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-green-800 mb-4">Personal Information</h3>
                <InfoItem icon={User} label="Date of Birth" value="15/05/1955" />
                <InfoItem icon={Phone} label="Phone" value="9876543210" />
                <InfoItem icon={Mail} label="Email" value="john.doe@email.com" />
                <InfoItem icon={Home} label="Address" value="123 Elder St, Senior City" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-green-800 mb-4">Emergency Contact</h3>
                <InfoItem icon={User} label="Name" value="Jane Doe" />
                <InfoItem icon={Phone} label="Phone" value="9876543211" />
                <InfoItem icon={Mail} label="Email" value="jane.doe@email.com" />
              </div>
            </div>
          )}

          {activeTab === 'membership' && (
            <div>
              <h3 className="text-xl font-semibold text-green-800 mb-4">Membership Details</h3>
              <InfoItem icon={Heart} label="Plan" value="Premium" />
              <InfoItem icon={Calendar} label="Join Date" value="01/01/2023" />
              <InfoItem icon={Calendar} label="Renewal Date" value="31/12/2023" />
              
              <h3 className="text-xl font-semibold text-green-800 mt-6 mb-4">Benefits</h3>
              <div className="bg-green-50 rounded-md p-4">
                {benefits.map((benefit, index) => (
                  <BenefitItem 
                    key={index}
                    benefit={benefit.name}
                    availableCount={benefit.count}
                    onAvail={() => handleAvailBenefit(index)}
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'activities' && (
            <div>
              <h3 className="text-xl font-semibold text-green-800 mb-4">Recent Activities</h3>
              <div className="bg-green-50 rounded-md p-4">
                {activities.map((activity, index) => (
                  <ActivityItem key={index} date={activity.date} activity={activity.activity} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
