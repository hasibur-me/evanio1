import { useState } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Textarea } from './ui/Textarea';
import { 
  CheckCircle2, 
  Clock, 
  Circle, 
  ChevronRight,
  Edit3,
  Save,
  X
} from 'lucide-react';
import { cn } from '../utils/cn';
import api from '../utils/api';
import { Input } from './ui/Input';

export default function OrderWorkflowSteps({ order, isAdmin = false, onUpdate }) {
  const [editingStep, setEditingStep] = useState(null);
  const [stepName, setStepName] = useState('');
  const [stepStatus, setStepStatus] = useState('');
  const [stepNotes, setStepNotes] = useState('');
  const [updating, setUpdating] = useState(false);

  // Initialize workflow steps if not present
  const workflowSteps = order.workflowSteps && order.workflowSteps.length > 0 
    ? order.workflowSteps 
    : [];

  const handleInitializeSteps = async () => {
    if (!isAdmin) return;
    
    try {
      setUpdating(true);
      // Initialize by updating the first step (this will trigger initialization in backend)
      await api.patch(`/orders/admin/${order._id}/workflow`, {
        stepId: 'payment',
        status: 'pending',
        notes: 'Workflow steps initialized'
      });

      if (onUpdate) {
        await onUpdate();
      }
    } catch (error) {
      console.error('Error initializing workflow steps:', error);
      alert('Error initializing workflow steps');
    } finally {
      setUpdating(false);
    }
  };

  if (workflowSteps.length === 0) {
    return (
      <Card glass>
        <div className="text-center py-8">
          <p className="text-white/80 mb-4">No workflow steps available for this order.</p>
          {isAdmin && (
            <Button
              onClick={handleInitializeSteps}
              disabled={updating}
              className="backdrop-blur-sm bg-blue-600/80 border border-blue-500/50 text-white hover:bg-blue-600/90 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center whitespace-nowrap"
            >
              <Edit3 className="w-4 h-4 mr-2" />
              {updating ? 'Initializing...' : 'Initialize Workflow Steps'}
            </Button>
          )}
        </div>
      </Card>
    );
  }

  const handleEditStep = (step) => {
    setEditingStep(step.stepId);
    setStepName(step.stepName || '');
    setStepStatus(step.status);
    setStepNotes(step.notes || '');
  };

  const handleCancelEdit = () => {
    setEditingStep(null);
    setStepName('');
    setStepStatus('');
    setStepNotes('');
  };

  const handleUpdateStep = async (stepId) => {
    if (!isAdmin) return;

    if (!stepName || !stepName.trim()) {
      alert('Step name is required');
      return;
    }

    try {
      setUpdating(true);
      await api.patch(`/orders/admin/${order._id}/workflow`, {
        stepId,
        stepName: stepName.trim(),
        status: stepStatus,
        notes: stepNotes
      });

      if (onUpdate) {
        await onUpdate();
      }
      
      handleCancelEdit();
    } catch (error) {
      console.error('Error updating workflow step:', error);
      alert(error.response?.data?.message || 'Error updating workflow step');
    } finally {
      setUpdating(false);
    }
  };

  const getStepStatusColor = (status, isCurrent) => {
    if (status === 'completed') {
      return 'bg-green-500/30 text-green-200 border-green-400/50';
    } else if (status === 'in-progress' || isCurrent) {
      return 'bg-blue-500/30 text-blue-200 border-blue-400/50';
    } else if (status === 'skipped') {
      return 'bg-gray-500/30 text-gray-200 border-gray-400/50';
    } else {
      return 'bg-yellow-500/30 text-yellow-200 border-yellow-400/50';
    }
  };

  const getStepIcon = (status, isCurrent) => {
    if (status === 'completed') {
      return <CheckCircle2 className="w-5 h-5 text-green-400" />;
    } else if (status === 'in-progress' || isCurrent) {
      return <Clock className="w-5 h-5 text-blue-400 animate-pulse" />;
    } else {
      return <Circle className="w-5 h-5 text-yellow-400" />;
    }
  };

  return (
    <Card glass>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Order Progress</h3>
            <p className="text-white/70 text-sm">Track your order through each step</p>
          </div>
          {isAdmin && (
            <div className="text-xs text-blue-400 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-400/50">
              Admin Mode: You can update steps
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {workflowSteps.map((step, index) => {
          const isCurrent = order.currentStep === step.stepId;
          const isEditing = editingStep === step.stepId;
          const isLast = index === workflowSteps.length - 1;

          return (
            <div key={step.stepId} className="relative">
              <div className="flex items-start space-x-4">
                {/* Step Icon & Connector */}
                <div className="flex flex-col items-center">
                  <div className={cn(
                    'p-3 rounded-full backdrop-blur-sm border-2 transition-all',
                    step.status === 'completed'
                      ? 'bg-green-500/30 border-green-400/50'
                      : step.status === 'in-progress' || isCurrent
                      ? 'bg-blue-500/30 border-blue-400/50 shadow-lg shadow-blue-500/50'
                      : 'bg-yellow-500/30 border-yellow-400/50'
                  )}>
                    {getStepIcon(step.status, isCurrent)}
                  </div>
                  {!isLast && (
                    <div className={cn(
                      'w-0.5 h-16 mt-2 transition-all',
                      step.status === 'completed'
                        ? 'bg-green-400/50'
                        : 'bg-white/20'
                    )} />
                  )}
                </div>

                {/* Step Content */}
                <div className="flex-1 pb-8">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1 flex-wrap">
                        <h4 className="text-lg font-semibold text-white">
                          {step.stepName}
                        </h4>
                        <span className={cn(
                          'text-xs px-2 py-1 rounded-full backdrop-blur-sm border whitespace-nowrap',
                          getStepStatusColor(step.status, isCurrent)
                        )}>
                          {step.status === 'completed' ? 'Completed' : 
                           step.status === 'in-progress' ? 'In Progress' :
                           step.status === 'skipped' ? 'Skipped' : 'Pending'}
                        </span>
                        {isCurrent && (
                          <span className="text-xs px-2 py-1 rounded-full bg-blue-500/30 text-blue-200 border border-blue-400/50 whitespace-nowrap">
                            Current Step
                          </span>
                        )}
                      </div>
                      {step.completedAt && (
                        <p className="text-xs text-white/60 mb-2">
                          Completed: {new Date(step.completedAt).toLocaleString()}
                        </p>
                      )}
                      {step.notes && (
                        <p className="text-sm text-white/80 mt-2 bg-white/5 rounded-lg p-3 border border-white/10">
                          {step.notes}
                        </p>
                      )}
                    </div>

                    {/* Edit Button (Admin Only) - Always visible for admin */}
                    {isAdmin && !isEditing && (
                      <div className="flex-shrink-0">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditStep(step)}
                          className="backdrop-blur-sm bg-blue-600/80 border-blue-500/50 text-white hover:bg-blue-600/90 inline-flex items-center justify-center whitespace-nowrap"
                        >
                          <Edit3 className="w-4 h-4 mr-1" />
                          Update Step
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Edit Form (Admin Only) */}
                  {isAdmin && isEditing && (
                    <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/20 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-white/90 mb-2">
                          Step Title <span className="text-red-400">*</span>
                        </label>
                        <Input
                          glass
                          value={stepName}
                          onChange={(e) => setStepName(e.target.value)}
                          placeholder="Enter step title (e.g., Design Phase, Review, Final Delivery)"
                          required
                        />
                        <p className="text-xs text-white/60 mt-1">You can customize the step title manually</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/90 mb-2">
                          Status
                        </label>
                        <select
                          value={stepStatus}
                          onChange={(e) => setStepStatus(e.target.value)}
                          className="w-full px-4 py-2.5 backdrop-blur-sm bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 text-white bg-gray-900/80"
                        >
                          <option value="pending" className="bg-gray-800">Pending</option>
                          <option value="in-progress" className="bg-gray-800">In Progress</option>
                          <option value="completed" className="bg-gray-800">Completed</option>
                          <option value="skipped" className="bg-gray-800">Skipped</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/90 mb-2">
                          Notes
                        </label>
                        <Textarea
                          glass
                          value={stepNotes}
                          onChange={(e) => setStepNotes(e.target.value)}
                          rows={3}
                          placeholder="Add notes about this step..."
                        />
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          onClick={() => handleUpdateStep(step.stepId)}
                          disabled={updating || !stepName.trim()}
                          className="backdrop-blur-sm bg-blue-600/80 border border-blue-500/50 text-white hover:bg-blue-600/90 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center whitespace-nowrap"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          {updating ? 'Saving...' : 'Save Changes'}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={handleCancelEdit}
                          disabled={updating}
                          className="backdrop-blur-sm bg-white/10 border-white/30 text-white hover:bg-white/20 inline-flex items-center justify-center whitespace-nowrap"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Summary */}
      <div className="mt-6 pt-6 border-t border-white/20">
        <div className="flex items-center justify-between text-sm">
          <span className="text-white/70">
            Progress: {workflowSteps.filter(s => s.status === 'completed').length} / {workflowSteps.length} steps completed
          </span>
          <div className="w-48 h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-blue-500 transition-all duration-500"
              style={{
                width: `${workflowSteps.length > 0 ? (workflowSteps.filter(s => s.status === 'completed').length / workflowSteps.length) * 100 : 0}%`
              }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}

