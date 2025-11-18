import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useMembers } from '../../contexts/MembersContext';
import { usePlans } from '../../contexts/PlansContext';
import PlanSelect from '../memberships/PlanSelect';

export default function MemberForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { members, addMember, updateMember } = useMembers();
  const { plans } = usePlans();
  const isEditMode = !!id;
  const member = isEditMode ? members.find(m => m.id === id) : null;

  // Show error if editing and member not found
  if (isEditMode && members.length > 0 && !member) {
    return (
      <div className="card text-center py-12">
        <p className="text-gray-500 text-lg mb-4">Member not found.</p>
        <button onClick={() => navigate('/members')} className="btn btn-primary">
          Back to Members
        </button>
      </div>
    );
  }

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    defaultValues: member || {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dob: '',
      gender: 'Male',
      address: '',
      membership: {
        planId: plans[0]?.id || '',
        startDate: new Date().toISOString().split('T')[0],
        status: 'active'
      }
    }
  });

  const selectedPlanId = watch('membership.planId');
  const selectedPlan = plans.find(p => p.id === selectedPlanId);

  useEffect(() => {
    if (member) {
      setValue('firstName', member.firstName);
      setValue('lastName', member.lastName);
      setValue('email', member.email);
      setValue('phone', member.phone);
      setValue('dob', member.dob);
      setValue('gender', member.gender);
      setValue('address', member.address);
      if (member.membership) {
        setValue('membership.planId', member.membership.planId);
        setValue('membership.startDate', member.membership.startDate);
        setValue('membership.status', member.membership.status);
      }
    }
  }, [member, setValue]);

  const calculateEndDate = (startDate, durationDays) => {
    const start = new Date(startDate);
    const end = new Date(start);
    end.setDate(end.getDate() + durationDays);
    return end.toISOString().split('T')[0];
  };

  const onSubmit = (data) => {
    if (isEditMode && !member) {
      return; // Prevent submission if member not found
    }

    const memberData = {
      ...data,
      id: isEditMode ? id : `m_${Date.now()}`,
      joinedAt: isEditMode ? member.joinedAt : new Date().toISOString().split('T')[0],
      attendance: isEditMode ? (member.attendance || []) : [],
      payments: isEditMode ? (member.payments || []) : [],
      membership: {
        ...data.membership,
        endDate: selectedPlan
          ? calculateEndDate(data.membership.startDate, selectedPlan.durationDays)
          : null
      }
    };

    if (isEditMode) {
      updateMember(memberData);
    } else {
      addMember(memberData);
    }
    navigate('/members');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        {isEditMode ? 'Edit Member' : 'Add New Member'}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="card space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
              First Name *
            </label>
            <input
              id="firstName"
              type="text"
              {...register('firstName', { required: 'First name is required' })}
              className="input"
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
              Last Name *
            </label>
            <input
              id="lastName"
              type="text"
              {...register('lastName', { required: 'Last name is required' })}
              className="input"
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              id="email"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              className="input"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone *
            </label>
            <input
              id="phone"
              type="tel"
              {...register('phone', { required: 'Phone is required' })}
              className="input"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-2">
              Date of Birth *
            </label>
            <input
              id="dob"
              type="date"
              {...register('dob', { required: 'Date of birth is required' })}
              className="input"
            />
            {errors.dob && (
              <p className="mt-1 text-sm text-red-600">{errors.dob.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
              Gender *
            </label>
            <select
              id="gender"
              {...register('gender', { required: 'Gender is required' })}
              className="input"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
            Address *
          </label>
          <input
            id="address"
            type="text"
            {...register('address', { required: 'Address is required' })}
            className="input"
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
          )}
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Membership Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="planId" className="block text-sm font-medium text-gray-700 mb-2">
                Membership Plan *
              </label>
              <PlanSelect
                {...register('membership.planId', { required: 'Plan is required' })}
                onChange={(e) => setValue('membership.planId', e.target.value)}
                className="input"
              />
              {errors.membership?.planId && (
                <p className="mt-1 text-sm text-red-600">{errors.membership.planId.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                Start Date *
              </label>
              <input
                id="startDate"
                type="date"
                {...register('membership.startDate', { required: 'Start date is required' })}
                className="input"
              />
              {errors.membership?.startDate && (
                <p className="mt-1 text-sm text-red-600">{errors.membership.startDate.message}</p>
              )}
            </div>
          </div>

          {selectedPlan && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Plan:</span> {selectedPlan.title} - ₹{selectedPlan.price}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Duration:</span> {selectedPlan.durationDays} days
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={() => navigate('/members')}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {isEditMode ? 'Update Member' : 'Add Member'}
          </button>
        </div>
      </form>
    </div>
  );
}

