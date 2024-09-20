import { ArrowLeft, User } from "lucide-react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAssignmentById } from "../query/useAssignmentById";

export default function ViewGeriatricReport() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isLoading, assignment } = useAssignmentById(id);
  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-green-50">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-green-500"></div>
        <span className="ml-2 text-green-800">Loading...</span>
      </div>
    );
  }

  const dob = new Date("2002-08-08T00:00:00.000Z");

  // Get today's date
  const today = new Date();

  // Calculate the difference in years
  let age = today.getFullYear() - dob.getFullYear();

  // Check if the birthday has occurred this year
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button
            onClick={() => {
              navigate(-1);
            }}
          >
            <ArrowLeft className="w-6 h-6 text-green-800 mr-2" />
          </button>
          <h1 className="text-2xl font-bold text-green-800">
            View Geriatric Assessment
          </h1>
        </div>
        <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-md">
          <User className="w-5 h-5 text-green-600 mr-2" />

          <p className="font-semibold mx-2 text-green-800">
            {assignment.patient.fullName}
          </p>
          <p className="text-sm text-gray-600">{age} years, Male</p>
        </div>
      </header>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-green-800 mb-3">
            Physical Health
          </h2>

          <div>
            <label className="block text-sm font-medium text-green-800 mb-1">
              Mobility
            </label>
            <p className="text-xs text-gray-600 mb-2">
              Observe patient's gait and movement
            </p>

            <div className="w-full p-2 mb-2 border border-green-300 rounded-md">
              {assignment.assessment?.mobility}
            </div>

          </div>

          <div>
            <label className="block text-sm font-medium text-green-800 mb-1">
              Vision
            </label>
            <p className="text-xs text-gray-600 mb-2">
              Ask about difficulty reading or watching TV
            </p>

            <div className="w-full p-2 mb-2 border border-green-300 rounded-md">
              {assignment.assessment?.vision}
            </div>

          </div>
          <div>
            <label className="block text-sm font-medium text-green-800 mb-1">
              Hearing
            </label>
            <p className="text-xs text-gray-600 mb-2">
              Note if patient has difficulty understanding conversation
            </p>

            <div className="w-full p-2 mb-2 border border-green-300 rounded-md">
              {assignment.assessment.hearing}
            </div>

          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-xl font-semibold text-green-800 mb-3">
            Cognitive Function
          </h2>

          <div>
            <label className="block text-sm font-medium text-green-800 mb-1">
              Memory
            </label>
            <p className="text-xs text-gray-600 mb-2">
              Ask patient to recall 3 common Indian objects after 5 minutes
            </p>

            <div className="w-full p-2 mb-2 border border-green-300 rounded-md">
              {assignment.assessment.memory}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-green-800 mb-1">
              Attention
            </label>
            <p className="text-xs text-gray-600 mb-2">
              Ask patient to count backwards from 100 by 7s
            </p>

            <div className="w-full p-2 mb-2 border border-green-300 rounded-md">
              {assignment.assessment.attention}
            </div>

          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-xl font-semibold text-green-800 mb-3">
            Physical Health
          </h2>
          <div>
            <div className="text-base font-semibold text-green-800 ">
              Activities of Daily Living (ADL)
            </div>
            <div>

              <label className="block text-sm font-medium text-green-800 mb-1">
                Bathing
              </label>
              <p className="text-xs text-gray-600 mb-2">
                Assess ability to bathe independently
              </p>
              <div className="w-full p-2 mb-2 border border-green-300 rounded-md">
                {assignment.assessment.adl_bathing}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-green-800 mb-1">
                Dressing
              </label>
              <p className="text-xs text-gray-600 mb-2">
                Assess ability to select and put on clothes
              </p>
              <div className="w-full p-2 mb-2 border border-green-300 rounded-md">
                {assignment.assessment.adl_dressing}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-green-800 mb-1">
                Toileting
              </label>
              <p className="text-xs text-gray-600 mb-2">
                Assess ability to use the toilet
              </p>
              <div className="w-full p-2 mb-2 border border-green-300 rounded-md">
                {assignment.assessment.adl_toileting}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-green-800 mb-1">
                Transferring
              </label>
              <p className="text-xs text-gray-600 mb-2">
                Assess ability to move from bed to chair
              </p>
              <div className="w-full p-2 mb-2 border border-green-300 rounded-md">
                {assignment.assessment.adl_transferring}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-green-800 mb-1">
                Continence
              </label>
              <p className="text-xs text-gray-600 mb-2">
                Assess bladder and bowel control
              </p>
              <div className="w-full p-2 mb-2 border border-green-300 rounded-md">
                {assignment.assessment.adl_continence}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-green-800 mb-1">
                Feeding
              </label>
              <p className="text-xs text-gray-600 mb-2">
                Assess ability to feed oneself
              </p>
              <div className="w-full p-2 mb-2 border border-green-300 rounded-md">
                {assignment.assessment.adl_feeding}
              </div>
            </div>
          </div>
          <div>
            <div className="text-base font-semibold mb-4 text-green-800 ">
              Instrumental Activities of Daily Living (IADL)
            </div>
            <div>
              <label className="block text-sm font-medium text-green-800 mb-1">
                Using telephone/mobile
              </label>
              <p className="text-xs text-gray-600 mb-2">
                Assess ability to use phone/mobile
              </p>
              <div className="w-full p-2 mb-2 border border-green-300 rounded-md">
                {assignment.assessment.iadl_phone}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-green-800 mb-1">
                Shopping
              </label>
              <p className="text-xs text-gray-600 mb-2">
                Assess ability to shop for necessities
              </p>
              <div className="w-full p-2 mb-2 border border-green-300 rounded-md">
                {assignment.assessment.iadl_shopping}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-green-800 mb-1">
                Food preparation
              </label>
              <p className="text-xs text-gray-600 mb-2">
                Assess ability to prepare meals
              </p>
              <div className="w-full p-2 mb-2 border border-green-300 rounded-md">
                {assignment.assessment.iadl_food}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-green-800 mb-1">
                Housekeeping
              </label>
              <p className="text-xs text-gray-600 mb-2">
                Assess ability to maintain home
              </p>
              <div className="w-full p-2 mb-2 border border-green-300 rounded-md">
                {assignment.assessment.iadl_housekeeping}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-green-800 mb-1">
                Laundry
              </label>
              <p className="text-xs text-gray-600 mb-2">
                Assess ability to do laundry
              </p>
              <div className="w-full p-2 mb-2 border border-green-300 rounded-md">
                {assignment.assessment.iadl_laundry}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-green-800 mb-1">
                Transportation
              </label>
              <p className="text-xs text-gray-600 mb-2">
                Assess ability to use transportation
              </p>
              <div className="w-full p-2 mb-2 border border-green-300 rounded-md">
                {assignment.assessment.iadl_transport}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-green-800 mb-1">
                Medication management
              </label>
              <p className="text-xs text-gray-600 mb-2">
                Assess ability to manage medications
              </p>
              <div className="w-full p-2 mb-2 border border-green-300 rounded-md">
                {assignment.assessment.iadl_medication}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-green-800 mb-1">
                Finances
              </label>
              <p className="text-xs text-gray-600 mb-2">
                Assess ability to manage finances
              </p>
              <div className="w-full p-2 mb-2 border border-green-300 rounded-md">
                {assignment.assessment.iadl_finances}
              </div>
            </div>
          </div>
        </div>
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-green-800 mb-3">
            Social and Emotional Health
          </h2>

          <div>
            <label className="block text-sm font-medium text-green-800 mb-1">
              Mood
            </label>
            <p className="text-xs text-gray-600 mb-2">
              Observe affect and ask about feelings of sadness
            </p>

            <div className="w-full p-2 mb-2 border border-green-300 rounded-md">
              {assignment.assessment.mood}
            </div>

          </div>

          <div>
            <label className="block text-sm font-medium text-green-800 mb-1">
              Social Engagement
            </label>
            <p className="text-xs text-gray-600 mb-2">
              Ask about participation in family events, religious activities, or
              community gatherings
            </p>

            <div className="w-full p-2 mb-2 border border-green-300 rounded-md">
              {assignment.assessment.socialEngagement}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
