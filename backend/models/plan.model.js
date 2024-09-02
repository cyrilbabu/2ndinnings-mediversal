import mongoose from "mongoose"

const planSchema = new mongoose.Schema({
  plan: { type: String, required: true },
  pricePerMonth: { type: Number, required: true },
  pricePerYear: { type: Number, required: true },
  advancedGeriatricAssessment: { type: Boolean },
  basicGeriatricAssessment: { type: Boolean },
  BLSEmergencyAmbulanceEvacuationCoveragePerYear: { type: Number },
  VitalCheckatHomePerMonth: { type: Number },
  WellnessCallCheckbyMPGPerMonth: { type: Number },
  accessto24_7EmergencyCoordination: { type: Boolean },
  ambulanceServiceOnlyforIPDAdmission: { type: Boolean },
  annualBasicHealthCheckupPackage58Parameters: { type: Number },
  assistedVisitToHospital: { type: Boolean },
  deicatedPersonalCareManager: { type: Boolean },
  discountOnDiagnosticsAndLabServicesOnlyForOPDVisitsInPercent: { type: Number },
  discountOnEyeDentalENTSkinProceduresInPercent: { type: Number },
  discountOnHealthCheckInPercent: { type: Number },
  discountOnIPDServicesTotalBillNotApplicableforInsuranceInPercent: { type: Number },
  discountOnPhysiotherapyAtHome: { type: Number },
  discountonConsultationOnlineOfflineafterlimitInPercent: { type: Number },
  freeDentalAndEyeCheckupPerMonth: { type: Number },
  generalPhysicianDoctorConsultationInPersonatHomePerYear: { type: Number },
  generalPhysicianDoctorConsultationVirtualPerMonth: { type: Number },
  homeDeliveryofMedicinewithDiscountandNoDeliveryChargeInPercent: { type: Number },
  homeSampleCollectionInPercent: { type: Number },
  labTestAssistance: { type: Boolean },
  monthlyUpdatesSentToChildrenorNextofKin: { type: Boolean },
  nursingCareServicesAtHomeInPercent: { type: Number },
  superSpecialistConsultationPerYear: { type: Number },
});

const Plan = mongoose.model('Plan', planSchema);

export default Plan;
