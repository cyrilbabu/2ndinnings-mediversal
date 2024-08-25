import React, { useState, useRef } from 'react';
import { ArrowLeft, Heart, Activity, Thermometer, Droplet, Clipboard, Send, Scale, Sandwich, Camera, X } from 'lucide-react';

const VitalInput = ({ icon: Icon, label, unit, value, onChange, placeholder }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-green-800 mb-1">{label}</label>
    <div className="flex items-center bg-white rounded-md border border-green-300">
      <Icon className="text-green-600 w-5 h-5 ml-3" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="flex-grow p-2 outline-none"
      />
      <span className="text-gray-600 mr-3">{unit}</span>
    </div>
  </div>
);

const PhotoUpload = ({ photos, setPhotos }) => {
  const fileInputRef = useRef(null);

  const handlePhotoUpload = (event) => {
    const files = Array.from(event.target.files);
    const newPhotos = files.map(file => URL.createObjectURL(file));
    setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]);
  };

  const removePhoto = (index) => {
    setPhotos(prevPhotos => prevPhotos.filter((_, i) => i !== index));
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-green-800 mb-1">Visit Photos</label>
      <div className="flex flex-wrap gap-2 mb-2">
        {photos.map((photo, index) => (
          <div key={index} className="relative">
            <img src={photo} alt={`Visit photo ${index + 1}`} className="w-20 h-20 object-cover rounded-md" />
            <button 
              onClick={() => removePhoto(index)}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
      <button 
        onClick={() => fileInputRef.current.click()}
        className="flex items-center justify-center w-full py-2 bg-green-100 text-green-800 rounded-md hover:bg-green-200 transition duration-300"
      >
        <Camera className="w-5 h-5 mr-2" />
        Add Photo
      </button>
      <input 
        type="file"
        ref={fileInputRef}
        onChange={handlePhotoUpload}
        accept="image/*"
        multiple
        className="hidden"
      />
    </div>
  );
};

export default function VitalsRecordingScreen() {
  const [vitals, setVitals] = useState({
    bloodPressure: '',
    heartRate: '',
    temperature: '',
    oxygenSaturation: '',
    respiratoryRate: '',
    weight: '',
    bloodSugar: '',
  });
  const [notes, setNotes] = useState('');
  const [photos, setPhotos] = useState([]);

  const handleVitalChange = (vital, value) => {
    setVitals(prev => ({ ...prev, [vital]: value }));
  };

  const handleSubmit = () => {
    // Here you would typically send the data to your backend
    console.log('Submitting vitals:', vitals);
    console.log('Notes:', notes);
    console.log('Photos:', photos);
    // After submission, you might want to navigate back to the dashboard or show a confirmation
  };

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <header className="flex items-center mb-6">
        <ArrowLeft className="w-6 h-6 text-green-800 mr-2" />
        <h1 className="text-2xl font-bold text-green-800">Record Vitals</h1>
      </header>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-green-800 mb-4">John Doe - 10:00 AM Visit</h2>

        <VitalInput 
          icon={Activity}
          label="Blood Pressure"
          unit="mmHg"
          value={vitals.bloodPressure}
          onChange={(e) => handleVitalChange('bloodPressure', e.target.value)}
          placeholder="120/80"
        />
        <VitalInput 
          icon={Heart}
          label="Heart Rate"
          unit="bpm"
          value={vitals.heartRate}
          onChange={(e) => handleVitalChange('heartRate', e.target.value)}
          placeholder="70"
        />
        <VitalInput 
          icon={Thermometer}
          label="Temperature"
          unit="°F"
          value={vitals.temperature}
          onChange={(e) => handleVitalChange('temperature', e.target.value)}
          placeholder="98.6"
        />
        <VitalInput 
          icon={Droplet}
          label="Oxygen Saturation"
          unit="%"
          value={vitals.oxygenSaturation}
          onChange={(e) => handleVitalChange('oxygenSaturation', e.target.value)}
          placeholder="98"
        />
        <VitalInput 
          icon={Activity}
          label="Respiratory Rate"
          unit="breaths/min"
          value={vitals.respiratoryRate}
          onChange={(e) => handleVitalChange('respiratoryRate', e.target.value)}
          placeholder="16"
        />
        <VitalInput 
          icon={Scale}
          label="Weight"
          unit="kg"
          value={vitals.weight}
          onChange={(e) => handleVitalChange('weight', e.target.value)}
          placeholder="70"
        />
        <VitalInput 
          icon={Sandwich}
          label="Blood Sugar"
          unit="mg/dL"
          value={vitals.bloodSugar}
          onChange={(e) => handleVitalChange('bloodSugar', e.target.value)}
          placeholder="100"
        />

        <PhotoUpload photos={photos} setPhotos={setPhotos} />

        <div className="mb-4">
          <label className="block text-sm font-medium text-green-800 mb-1">Additional Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-2 border border-green-300 rounded-md"
            rows="4"
            placeholder="Enter any additional observations or notes here..."
          ></textarea>
        </div>

        <button 
          onClick={handleSubmit}
          className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition duration-300 flex items-center justify-center"
        >
          <Send className="w-5 h-5 mr-2" />
          Complete Visit
        </button>
      </div>
    </div>
  );
}
