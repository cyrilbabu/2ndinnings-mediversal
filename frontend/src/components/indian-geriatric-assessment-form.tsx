import React, { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Save,
  Send,
  HelpCircle,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const QuestionInput = ({ label, type, options = [], value, onChange, cue }) => (
  <div className="mb-6">
    <label className="block text-sm font-medium text-green-800 mb-1">
      {label}
    </label>
    {cue && <p className="text-xs text-gray-600 mb-2">{cue}</p>}
    {type === "select" && (
      <select
        value={value}
        onChange={onChange}
        className="w-full p-2 border border-green-300 rounded-md"
      >
        <option value="">Select an option</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    )}
  </div>
);

const ADLAssessment = ({ formData, setFormData }) => {
  const adlItems = [
    {
      label: "Bathing",
      field: "adl_bathing",
      cue: "Assess ability to bathe independently",
    },
    {
      label: "Dressing",
      field: "adl_dressing",
      cue: "Assess ability to select and put on clothes",
    },
    {
      label: "Toileting",
      field: "adl_toileting",
      cue: "Assess ability to use the toilet",
    },
    {
      label: "Transferring",
      field: "adl_transferring",
      cue: "Assess ability to move from bed to chair",
    },
    {
      label: "Continence",
      field: "adl_continence",
      cue: "Assess bladder and bowel control",
    },
    {
      label: "Feeding",
      field: "adl_feeding",
      cue: "Assess ability to feed oneself",
    },
  ];

  const adlOptions = [
    "Fully independent",
    "Needs some assistance",
    "Needs significant assistance",
    "Fully dependent",
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold text-green-800 mb-3">
        Activities of Daily Living (ADL)
      </h3>
      {adlItems.map((item, index) => (
        <QuestionInput
          key={index}
          label={item.label}
          type="select"
          options={adlOptions}
          value={formData[item.field] || ""}
          onChange={(e) =>
            setFormData({ ...formData, [item.field]: e.target.value })
          }
          cue={item.cue}
        />
      ))}
    </div>
  );
};

const IADLAssessment = ({ formData, setFormData }) => {
  const iadlItems = [
    {
      label: "Using telephone/mobile",
      field: "iadl_phone",
      cue: "Assess ability to use phone/mobile",
    },
    {
      label: "Shopping",
      field: "iadl_shopping",
      cue: "Assess ability to shop for necessities",
    },
    {
      label: "Food preparation",
      field: "iadl_food",
      cue: "Assess ability to prepare meals",
    },
    {
      label: "Housekeeping",
      field: "iadl_housekeeping",
      cue: "Assess ability to maintain home",
    },
    {
      label: "Laundry",
      field: "iadl_laundry",
      cue: "Assess ability to do laundry",
    },
    {
      label: "Transportation",
      field: "iadl_transport",
      cue: "Assess ability to use transportation",
    },
    {
      label: "Medication management",
      field: "iadl_medication",
      cue: "Assess ability to manage medications",
    },
    {
      label: "Finances",
      field: "iadl_finances",
      cue: "Assess ability to manage finances",
    },
  ];

  const iadlOptions = [
    "Fully independent",
    "Needs some assistance",
    "Needs significant assistance",
    "Unable to perform",
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold text-green-800 mb-3">
        Instrumental Activities of Daily Living (IADL)
      </h3>
      {iadlItems.map((item, index) => (
        <QuestionInput
          key={index}
          label={item.label}
          type="select"
          options={iadlOptions}
          value={formData[item.field] || ""}
          onChange={(e) =>
            setFormData({ ...formData, [item.field]: e.target.value })
          }
          cue={item.cue}
        />
      ))}
    </div>
  );
};

export default function IndianGeriatricAssessmentForm({
  assessmentType,
  patientName,
  patientAge,
  patientGender,
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const assessmentSections = [
    {
      title: "Physical Health",
      questions: [
        {
          label: "Mobility",
          type: "select",
          options: [
            "Fully independent, including stairs",
            "Independent on level ground, difficulty with stairs",
            "Uses walking stick or walker",
            "Requires assistance of another person",
            "Uses wheelchair",
            "Bed-bound",
          ],
          field: "mobility",
          cue: "Observe patient's gait and movement",
        },
        {
          label: "Vision",
          type: "select",
          options: [
            "Normal vision",
            "Mild impairment, can read with glasses",
            "Moderate impairment, difficulty reading even with glasses",
            "Severe impairment, cannot read or watch TV",
          ],
          field: "vision",
          cue: "Ask about difficulty reading or watching TV",
        },
        {
          label: "Hearing",
          type: "select",
          options: [
            "Normal hearing",
            "Mild loss, difficulty in noisy environments",
            "Moderate loss, frequently asks for repetition",
            "Severe loss, requires hearing aids or loud speech",
          ],
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
          type: "select",
          options: [
            "No impairment",
            "Mild impairment, occasionally forgets recent events",
            "Moderate impairment, frequently forgets recent events",
            "Severe impairment, difficulty remembering both recent and past events",
          ],
          field: "memory",
          cue: "Ask patient to recall 3 common Indian objects after 5 minutes",
        },
        {
          label: "Attention",
          type: "select",
          options: [
            "Can perform complex mental tasks",
            "Can do simple calculations without aids",
            "Needs assistance for calculations",
            "Unable to perform even simple calculations",
          ],
          field: "attention",
          cue: "Ask patient to count backwards from 100 by 7s",
        },
      ],
    },
    {
      title: "Functional Status",
      questions: [
        {
          label: "Activities of Daily Living (ADL)",
          type: "custom",
          component: ADLAssessment,
        },
        {
          label: "Instrumental Activities of Daily Living (IADL)",
          type: "custom",
          component: IADLAssessment,
        },
      ],
    },
    {
      title: "Social and Emotional Health",
      questions: [
        {
          label: "Mood",
          type: "select",
          options: [
            "Generally happy and content",
            "Occasionally feels sad or lonely",
            "Frequently feels sad or depressed",
            "Constantly depressed or emotionally flat",
          ],
          field: "mood",
          cue: "Observe affect and ask about feelings of sadness",
        },
        {
          label: "Social Engagement",
          type: "select",
          options: [
            "Actively participates in family and community activities",
            "Participates in some activities, but less than before",
            "Rarely participates in social activities",
            "Completely withdrawn from social interactions",
          ],
          field: "socialEngagement",
          cue: "Ask about participation in family events, religious activities, or community gatherings",
        },
      ],
    },
  ];

  if (assessmentType === "Advanced") {
    assessmentSections.push({
      title: "Advanced Evaluation",
      questions: [
        {
          label: "Fall Risk",
          type: "select",
          options: [
            "Low risk - steady gait, no history of falls",
            "Moderate risk - some unsteadiness, or previous falls",
            "High risk - frequent falls or severe mobility issues",
          ],
          field: "fallRisk",
          cue: "Consider balance, strength, and previous falls",
        },
        {
          label: "Nutrition",
          type: "select",
          options: [
            "Well-nourished, follows a balanced diet",
            "Mild nutritional concerns, occasional poor appetite",
            "Moderate nutritional concerns, significant weight loss/gain",
            "Severe nutritional concerns, malnutrition risk",
          ],
          field: "nutrition",
          cue: "Assess diet, weight changes, and eating habits",
        },
        {
          label: "Caregiver Support",
          type: "select",
          options: [
            "Strong family support system in place",
            "Some family support, but not consistent",
            "Limited family support, relies on community",
            "No reliable caregiver support",
          ],
          field: "caregiverSupport",
          cue: "Assess availability and involvement of family members or other caregivers",
        },
      ],
    });
  }

  const handleNextStep = () => {
    if (currentStep < assessmentSections.length - 1)
      setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleSave = () => {
    console.log("Saving assessment data:", formData);
    // Here you would typically send the data to your backend
  };

  const handleSubmit = () => {
    console.log("Submitting assessment data:", formData);
    // Here you would typically send the data to your backend and mark the assessment as complete
  };

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
            {assessmentType} Geriatric Assessment
          </h1>
        </div>
        <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-md">
          <User className="w-5 h-5 text-green-600 mr-2" />
          <div>
            <p className="font-semibold text-green-800">{patientName}</p>
            <p className="text-sm text-gray-600">
              {patientAge} years, {patientGender}
            </p>
          </div>
        </div>
      </header>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-green-800 mb-4">
          {assessmentSections[currentStep].title}
        </h2>
        {assessmentSections[currentStep].questions.map((q, index) =>
          q.type === "custom" ? (
            <q.component
              key={index}
              formData={formData}
              setFormData={setFormData}
            />
          ) : (
            <QuestionInput
              key={index}
              label={q.label}
              type={q.type}
              options={q.options}
              value={formData[q.field] || ""}
              onChange={(e) =>
                setFormData({ ...formData, [q.field]: e.target.value })
              }
              cue={q.cue}
            />
          )
        )}

        <div className="flex justify-between mt-6">
          <button
            onClick={handlePreviousStep}
            disabled={currentStep === 0}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md disabled:opacity-50"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-md mr-2"
            >
              <Save className="w-5 h-5" />
            </button>
            {currentStep === assessmentSections.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-600 text-white rounded-md"
              >
                <Send className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleNextStep}
                className="px-4 py-2 bg-green-600 text-white rounded-md"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
