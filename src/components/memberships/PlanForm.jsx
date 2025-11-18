import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { usePlans } from '../../contexts/PlansContext';

export default function PlanForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { plans, addPlan, updatePlan } = usePlans();
  const isEditMode = !!id;
  const plan = isEditMode ? plans.find(p => p.id === id) : null;

  // Show error if editing and plan not found
  if (isEditMode && plans.length > 0 && !plan) {
    return (
      <div className="card text-center py-12">
        <p className="text-gray-500 text-lg mb-4">Plan not found.</p>
        <button onClick={() => navigate('/plans')} className="btn btn-primary">
          Back to Plans
        </button>
      </div>
    );
  }

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    defaultValues: plan || {
      title: '',
      durationDays: 30,
      price: 0,
      description: ''
    }
  });

  useEffect(() => {
    if (plan) {
      setValue('title', plan.title);
      setValue('durationDays', plan.durationDays);
      setValue('price', plan.price);
      setValue('description', plan.description);
    }
  }, [plan, setValue]);

  const onSubmit = (data) => {
    if (isEditMode && !plan) {
      return; // Prevent submission if plan not found
    }

    const planData = {
      ...data,
      id: isEditMode ? id : `p_${Date.now()}`,
      durationDays: parseInt(data.durationDays),
      price: parseFloat(data.price)
    };

    if (isEditMode) {
      updatePlan(planData);
    } else {
      addPlan(planData);
    }
    navigate('/plans');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        {isEditMode ? 'Edit Plan' : 'Add New Plan'}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="card space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Plan Title *
          </label>
          <input
            id="title"
            type="text"
            {...register('title', { required: 'Title is required' })}
            className="input"
            placeholder="e.g., Monthly, Quarterly, Yearly"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="durationDays" className="block text-sm font-medium text-gray-700 mb-2">
              Duration (Days) *
            </label>
            <input
              id="durationDays"
              type="number"
              min="1"
              {...register('durationDays', {
                required: 'Duration is required',
                min: { value: 1, message: 'Duration must be at least 1 day' }
              })}
              className="input"
            />
            {errors.durationDays && (
              <p className="mt-1 text-sm text-red-600">{errors.durationDays.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
              Price (₹) *
            </label>
            <input
              id="price"
              type="number"
              min="0"
              step="0.01"
              {...register('price', {
                required: 'Price is required',
                min: { value: 0, message: 'Price must be positive' }
              })}
              className="input"
            />
            {errors.price && (
              <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            id="description"
            rows="4"
            {...register('description', { required: 'Description is required' })}
            className="input"
            placeholder="Describe the plan benefits..."
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>

        <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={() => navigate('/plans')}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {isEditMode ? 'Update Plan' : 'Add Plan'}
          </button>
        </div>
      </form>
    </div>
  );
}

