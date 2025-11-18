import { Link } from 'react-router-dom';
import { usePlans } from '../../contexts/PlansContext';

export default function PlansList() {
  const { plans, deletePlan } = usePlans();

  const handleDelete = (planId) => {
    if (window.confirm('Are you sure you want to delete this plan?')) {
      deletePlan(planId);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Membership Plans</h1>
        <Link to="/plans/new" className="btn btn-primary">
          + Add New Plan
        </Link>
      </div>

      {plans.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-gray-500 text-lg mb-4">No plans found.</p>
          <Link to="/plans/new" className="btn btn-primary">
            Add Your First Plan
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map(plan => (
            <div key={plan.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{plan.title}</h3>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary-600">₹{plan.price}</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{plan.description}</p>
              <div className="space-y-2 text-sm text-gray-500 mb-4">
                <p><span className="font-medium">Duration:</span> {plan.durationDays} days</p>
              </div>
              <div className="flex space-x-2 pt-4 border-t border-gray-200">
                <Link
                  to={`/plans/${plan.id}/edit`}
                  className="btn btn-secondary flex-1 text-center"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(plan.id)}
                  className="btn btn-danger flex-1"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

