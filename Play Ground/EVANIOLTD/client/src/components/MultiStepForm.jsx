import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2, Circle } from 'lucide-react';
import { Button } from './ui/Button';
import { GlassCard } from './GlassCard';

export const MultiStepForm = ({ 
  steps = [], 
  onSubmit, 
  onStepChange,
  autoSave = true,
  storageKey = 'multistep_form',
  className = '' 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [completedSteps, setCompletedSteps] = useState([]);
  const [errors, setErrors] = useState({});

  // Load saved data
  useEffect(() => {
    if (autoSave) {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setFormData(parsed.data || {});
          setCurrentStep(parsed.currentStep || 0);
          setCompletedSteps(parsed.completedSteps || []);
        } catch (error) {
          console.error('Error loading saved form data:', error);
        }
      }
    }
  }, [autoSave, storageKey]);

  // Auto-save form data
  useEffect(() => {
    if (autoSave && Object.keys(formData).length > 0) {
      const saveData = {
        data: formData,
        currentStep,
        completedSteps,
        timestamp: Date.now(),
      };
      localStorage.setItem(storageKey, JSON.stringify(saveData));
    }
  }, [formData, currentStep, completedSteps, autoSave, storageKey]);

  const validateStep = (stepIndex) => {
    const step = steps[stepIndex];
    if (!step || !step.fields) return true;

    const stepErrors = {};
    step.fields.forEach((field) => {
      if (field.required && !formData[field.name]) {
        stepErrors[field.name] = `${field.label} is required`;
      }
      if (field.validate && formData[field.name]) {
        const validation = field.validate(formData[field.name], formData);
        if (validation !== true) {
          stepErrors[field.name] = validation;
        }
      }
    });

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
      }
      
      if (currentStep < steps.length - 1) {
        const nextStep = currentStep + 1;
        setCurrentStep(nextStep);
        if (onStepChange) {
          onStepChange(nextStep, formData);
        }
      } else {
        // Last step - submit form
        handleSubmit();
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      if (onStepChange) {
        onStepChange(currentStep - 1, formData);
      }
    }
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      if (onSubmit) {
        onSubmit(formData);
      }
      // Clear saved data after successful submission
      if (autoSave) {
        localStorage.removeItem(storageKey);
      }
    }
  };

  const handleFieldChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  if (!currentStepData) {
    return null;
  }

  return (
    <div className={className}>
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-white/70">
            Step {currentStep + 1} of {steps.length}
          </span>
          <span className="text-sm text-white/70">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Step Indicators */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                  index < currentStep || completedSteps.includes(index)
                    ? 'bg-green-500 border-green-400'
                    : index === currentStep
                    ? 'bg-blue-500 border-blue-400'
                    : 'bg-white/10 border-white/30'
                }`}
              >
                {index < currentStep || completedSteps.includes(index) ? (
                  <CheckCircle2 className="w-5 h-5 text-white" />
                ) : (
                  <Circle className="w-5 h-5 text-white" />
                )}
              </div>
              <span className="text-xs text-white/70 mt-2 text-center max-w-[80px] truncate">
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 ${
                  index < currentStep ? 'bg-green-500' : 'bg-white/10'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Form Content */}
      <GlassCard className="p-6 md:p-8">
        <h2 className="text-2xl font-bold text-white mb-2">{currentStepData.title}</h2>
        {currentStepData.description && (
          <p className="text-white/70 mb-6">{currentStepData.description}</p>
        )}

        <div className="space-y-4">
          {currentStepData.fields?.map((field) => {
            const FieldComponent = field.component || 'input';
            const hasError = errors[field.name];

            return (
              <div key={field.name}>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  {field.label}
                  {field.required && <span className="text-red-400 ml-1">*</span>}
                </label>
                {FieldComponent === 'textarea' ? (
                  <textarea
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    rows={field.rows || 4}
                    className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 transition-all ${
                      hasError
                        ? 'border-red-400 focus:ring-red-400'
                        : 'border-white/20 focus:ring-blue-400'
                    }`}
                  />
                ) : FieldComponent === 'select' ? (
                  <select
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                    className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white focus:outline-none focus:ring-2 transition-all ${
                      hasError
                        ? 'border-red-400 focus:ring-red-400'
                        : 'border-white/20 focus:ring-blue-400'
                    }`}
                  >
                    <option value="">Select {field.label}</option>
                    {field.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type || 'text'}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 transition-all ${
                      hasError
                        ? 'border-red-400 focus:ring-red-400'
                        : 'border-white/20 focus:ring-blue-400'
                    }`}
                  />
                )}
                {hasError && (
                  <p className="text-red-400 text-sm mt-1">{errors[field.name]}</p>
                )}
              </div>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/20">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              currentStep === 0
                ? 'opacity-50 cursor-not-allowed'
                : 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all"
          >
            {currentStep === steps.length - 1 ? 'Submit' : 'Next'}
            {currentStep < steps.length - 1 && <ChevronRight className="w-4 h-4" />}
          </button>
        </div>

        {autoSave && (
          <p className="text-xs text-white/50 text-center mt-4">
            Your progress is automatically saved
          </p>
        )}
      </GlassCard>
    </div>
  );
};


