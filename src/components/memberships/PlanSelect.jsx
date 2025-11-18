import { usePlans } from '../../contexts/PlansContext';

export default function PlanSelect({ ...props }) {
  const { plans } = usePlans();

  return (
    <select {...props}>
      <option value="">Select a plan</option>
      {plans.map(plan => (
        <option key={plan.id} value={plan.id}>
          {plan.title} - ₹{plan.price} ({plan.durationDays} days)
        </option>
      ))}
    </select>
  );
}

