import React from "react";
import BackButton from "../UI/back-button";

export default function ViewAllPlans() {
  const planData = [
    {
      feature: "Advanced Geriatric Assessment",
      basic: false,
      advanced: false,
      premium: true,
    },
    {
      feature: "Basic Geriatric Assessment",
      basic: true,
      advanced: true,
      premium: "Not Applicable",
    },
    {
      feature: "Annual Basic Health Checkup Package - 58 Parameters",
      basic: false,
      advanced: false,
      premium: 1,
    },
    {
      feature: "General Physician Doctor Consultation - In Person at Home",
      basic: false,
      advanced: "1 Per Year",
      premium: "2 Per Year",
    },
    {
      feature: "General Physician Doctor Consultation - Virtual",
      basic: "1 Per Month",
      advanced: "1 Per Month",
      premium: "1 Per Month",
    },
    {
      feature: "Super Specialist Consultation",
      basic: false,
      advanced: "1 Per Year",
      premium: "2 Per Year",
    },
    {
      feature: "Wellness Call Check by MPG",
      basic: "1 Per Month",
      advanced: "2 Per Month",
      premium: "4 Per Month",
    },
    {
      feature: "Vital Check at Home",
      basic: "1 Per Quarter",
      advanced: "1 Per Month",
      premium: "2 Per Month",
    },
    {
      feature: "Dedicated Personal Care Manager",
      basic: true,
      advanced: true,
      premium: true,
    },
    {
      feature: "Assisted Visit To Hospital",
      basic: true,
      advanced: true,
      premium: true,
    },
    {
      feature: "Lab Test Assistance",
      basic: true,
      advanced: true,
      premium: true,
    },
    {
      feature: "Monthly Updates Sent To Children or Next of Kin",
      basic: true,
      advanced: true,
      premium: true,
    },
    {
      feature: "BLS Emergency Ambulance Evacuation Coverage (Within Patna)",
      basic: "1/Yr",
      advanced: "2/Yr",
      premium: "4/Yr",
    },
    {
      feature: "Ambulance Service - Only for IPD Admission (Within Patna)",
      basic: "Yes",
      advanced: "Yes",
      premium: "Yes",
    },
    {
      feature: "Access to 24/7 Emergency Coordination",
      basic: true,
      advanced: true,
      premium: true,
    },
    {
      feature: "Discount on Consultation (Online/Offline) after limit",
      basic: "10%",
      advanced: "15%",
      premium: "20%",
    },
    {
      feature: "Home Delivery of Medicine with Discount and No Delivery Charge",
      basic: "25%",
      advanced: "25%",
      premium: "25%",
    },
    {
      feature:
        "Discount on IPD Services - Total Bill *Not Applicable for Insurance",
      basic: "5%",
      advanced: "7.5%",
      premium: "10%",
    },
    {
      feature: "Discount on Diagnostics & Lab Services - Only for OPD Visits",
      basic: "10%",
      advanced: "15%",
      premium: "20%",
    },
    {
      feature: "Discount on Physiotherapy at Home",
      basic: "5%",
      advanced: "10%",
      premium: "20%",
    },
    {
      feature: "Nursing Care Services at Home",
      basic: "5%",
      advanced: "10%",
      premium: "20%",
    },
    {
      feature: "Home Sample Collection",
      basic: "5%",
      advanced: "10%",
      premium: "15%",
    },
    {
      feature: "Discount on Health Check",
      basic: "10%",
      advanced: "15%",
      premium: "25%",
    },
    {
      feature: "Free Dental & Eye Checkup",
      basic: "1 Per Month",
      advanced: "1 Per Month",
      premium: "1 Per Month",
    },
    {
      feature: "Discount on Eye/Dental/ENT/Skin Procedures",
      basic: "15%",
      advanced: "20%",
      premium: "25%",
    },
  ];

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <BackButton />
      <h1 className="text-3xl font-bold text-green-800 mb-6">
        Available Plans
      </h1>
      <div className="bg-white rounded-lg shadow-md p-6 overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="px-5 py-3 w-1/4  md:w-2/5 border-b-2 border-gray-200 bg-gray-100 text-left text-xs md:text-lg text-gray-600 uppercase tracking-wider">
                Feature
              </th>
              <th className="px-5 py-3 w-1/4  md:w-1/5 border-b-2 border-gray-200 bg-gray-100 text-center text-xs md:text-sm text-gray-600 uppercase tracking-wider">
                Basic
              </th>
              <th className="px-5 py-3 w-1/4  md:w-1/5 border-b-2 border-gray-200 bg-gray-100 text-center text-xs md:text-sm text-gray-600 uppercase tracking-wider">
                Advanced
              </th>
              <th className="px-5 py-3 w-1/4  md:w-1/5 border-b-2 border-gray-200 bg-gray-100 text-center text-xs md:text-sm text-gray-600 uppercase tracking-wider">
                Premium
              </th>
            </tr>
          </thead>
          <thead>
            <tr>
              <th className="px-5 py-3 w-1/4  md:w-2/5 border-b-2 border-gray-200 bg-gray-50 text-left text-xs md:text-lg text-gray-600 uppercase tracking-wider">
                Price
              </th>
              <th className="px-5 py-3  w-1/4 md:w-1/5 border-b-2 border-gray-200 bg-gray-50 text-center text-xs md:text-sm text-gray-600  tracking-wider">
                299/Month or 3499/Year Per Person
              </th>
              <th className="px-5 py-3 w-1/4  md:w-1/5 border-b-2 border-gray-200 bg-gray-50 text-center text-xs md:text-sm text-gray-600  tracking-wider">
                599/Month or 7099/Year Per Person
              </th>
              <th className="px-5 py-3 w-1/4  md:w-1/5 border-b-2 border-gray-200 bg-gray-50 text-center text-xs md:text-sm text-gray-600 tracking-wider">
                799/Month or 9499/Year Per Person
              </th>
            </tr>
          </thead>
          <tbody>
            {planData.map((plan, index) => (
              <tr key={index}>
                <td className="px-5 py-3 w-1/4  md:w-2/5 border-b-2 border-gray-200 text-left text-sm text-gray-600">
                  {plan.feature}
                </td>
                <td className="px-5 py-3 w-1/4  md:w-1/5 border-b-2 border-gray-200 text-center text-sm text-gray-600">
                  {plan.basic === true
                    ? "✔️"
                    : plan.basic === false
                    ? "❌"
                    : plan.basic}
                </td>
                <td className="px-5 py-3 w-1/4  md:w-1/5 border-b-2 border-gray-200 text-center text-sm text-gray-600">
                  {plan.advanced === true
                    ? "✔️"
                    : plan.advanced === false
                    ? "❌"
                    : plan.advanced}
                </td>
                <td className="px-5 py-3 w-1/4 md:w-1/5 border-b-2 border-gray-200 text-center text-sm text-gray-600">
                  {plan.premium === true
                    ? "✔️"
                    : plan.premium === false
                    ? "❌"
                    : plan.premium}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
