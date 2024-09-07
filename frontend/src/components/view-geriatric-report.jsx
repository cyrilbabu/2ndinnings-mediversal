import { ArrowLeft, User } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function ViewGeriatricReport() {
  const navigate = useNavigate();
  const geriatricData = [
    {
      title: "Physical Health",
      questions: [
        {
          label: "Mobility",

          options: "Fully independent, including stairs",

          field: "mobility",
          cue: "Observe patient's gait and movement",
        },
        {
          label: "Vision",

          options: "Severe impairment, cannot read or watch TV",

          field: "vision",
          cue: "Ask about difficulty reading or watching TV",
        },
        {
          label: "Hearing",

          options: "Severe loss, requires hearing aids or loud speech",

          field: "hearing",
          cue: "Note if patient has difficulty understanding conversation",
        },
      ],
    },
    {
      title: "Cognitive Function",
      questions: [
        {
          label: "Memory",

          options: "No impairment",
          field: "memory",
          cue: "Ask patient to recall 3 common Indian objects after 5 minutes",
        },
        {
          label: "Attention",

          options: "Can perform complex mental tasks",
          field: "attention",
          cue: "Ask patient to count backwards from 100 by 7s",
        },
      ],
    },
    {
      title: "Functional Status",
      subTitle: "Activities of Daily Living (ADL)",
      questions: [
        {
          label: "Mood",

          options: "Generally happy and content",

          field: "mood",
          cue: "Observe affect and ask about feelings of sadness",
        },
        {
          label: "Social Engagement",

          options: "Actively participates in family and community activities",

          field: "socialEngagement",
          cue: "Ask about participation in family events, religious activities, or community gatherings",
        },
      ],
    },
    {
      title: "Functional Status",
      subTitle: "Instrumental Activities of Daily Living (IADL)",
      questions: [
        {
          label: "Mood",

          options: "Generally happy and content",

          field: "mood",
          cue: "Observe affect and ask about feelings of sadness",
        },
        {
          label: "Social Engagement",

          options: "Actively participates in family and community activities",

          field: "socialEngagement",
          cue: "Ask about participation in family events, religious activities, or community gatherings",
        },
      ],
    },
    {
      title: "Social and Emotional Health",
      questions: [
        {
          label: "Mood",

          options: "Generally happy and content",
          field: "mood",
          cue: "Observe affect and ask about feelings of sadness",
        },
        {
          label: "Social Engagement",

          options: "Actively participates in family and community activities",
          field: "socialEngagement",
          cue: "Ask about participation in family events, religious activities, or community gatherings",
        },
      ],
    },
  ];

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

          <p className="font-semibold mx-2 text-green-800">Sahu</p>
          <p className="text-sm text-gray-600">22 years, M</p>
        </div>
      </header>

      <div className="bg-white rounded-lg shadow-md p-6">
        {geriatricData.map((data, index) => (
          <div key={index}>
            {/* <h2 className="text-xl font-semibold text-green-800 mb-4">
              {data.title}
            </h2>
            <div className="mb-6">
              <label className="block text-sm font-medium text-green-800 mb-1">
                Mobility
              </label>
              <p className="text-xs text-gray-600 mb-2">
                Observe patient's gait and movement
              </p>
              <div className="w-full p-2 border border-green-300 rounded-md">
                Fully independent, including stairs
              </div>
            </div> */}

            {
              <div className="mb-10">
                <h2 className="text-xl font-semibold text-green-800 mb-3">
                  {data.title}
                </h2>
                {data.title === "Functional Status" && (
                  <div className="text-base font-semibold text-green-800 ">
                    {data.subTitle}
                  </div>
                )}
                {data.questions &&
                  data.questions.map((question, index) => (
                    <div key={index}>
                      <label className="block text-sm font-medium text-green-800 mb-1">
                        {question.field}
                      </label>
                      <p className="text-xs text-gray-600 mb-2">
                        {question.cue}
                      </p>
                      <div className="w-full p-2 mb-2 border border-green-300 rounded-md">
                        {question.options}
                      </div>
                    </div>
                  ))}
              </div>
            }
          </div>
        ))}
      </div>
    </div>
  );
}
