import { useParams, Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useMembers } from '../../contexts/MembersContext';
import { usePlans } from '../../contexts/PlansContext';
import AttendanceLog from '../attendance/AttendanceLog';
import PaymentsList from '../payments/PaymentsList';

export default function MemberDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { members, deleteMember } = useMembers();
  const { plans } = usePlans();
  const member = members.find(m => m.id === id);

  if (!member) {
    return (
      <div className="card text-center py-12">
        <p className="text-gray-500 text-lg mb-4">Member not found.</p>
        <Link to="/members" className="btn btn-primary">
          Back to Members
        </Link>
      </div>
    );
  }

  const plan = plans.find(p => p.id === member.membership?.planId);
  const getStatusBadge = (status) => {
    const badges = {
      active: 'badge badge-success',
      expired: 'badge badge-danger',
      canceled: 'badge badge-warning'
    };
    return badges[status] || 'badge badge-info';
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      deleteMember(id);
      navigate('/members');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <Link to="/members" className="text-primary-600 hover:text-primary-700 text-sm mb-2 inline-block">
            ← Back to Members
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">
            {member.firstName} {member.lastName}
          </h1>
        </div>
        <div className="flex space-x-3">
          <Link to={`/members/${id}/edit`} className="btn btn-secondary">
            Edit
          </Link>
          <button onClick={handleDelete} className="btn btn-danger">
            Delete
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{member.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{member.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p className="font-medium">{format(new Date(member.dob), 'MMM dd, yyyy')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Gender</p>
                <p className="font-medium">{member.gender}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium">{member.address}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Joined Date</p>
                <p className="font-medium">{format(new Date(member.joinedAt), 'MMM dd, yyyy')}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Membership Information</h2>
            {member.membership ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Status</span>
                  <span className={getStatusBadge(member.membership.status)}>
                    {member.membership.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Plan</span>
                  <span className="font-medium">{plan?.title || member.membership.planId}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Start Date</span>
                  <span className="font-medium">
                    {format(new Date(member.membership.startDate), 'MMM dd, yyyy')}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">End Date</span>
                  <span className="font-medium">
                    {member.membership.endDate
                      ? format(new Date(member.membership.endDate), 'MMM dd, yyyy')
                      : 'N/A'}
                  </span>
                </div>
                {plan && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Price</span>
                    <span className="font-medium">₹{plan.price}</span>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-500">No active membership</p>
            )}
          </div>

          <AttendanceLog memberId={id} />

          <PaymentsList memberId={id} />
        </div>

        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Total Visits</p>
                <p className="text-2xl font-bold text-primary-600">
                  {member.attendance?.length || 0}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Payments</p>
                <p className="text-2xl font-bold text-green-600">
                  {member.payments?.length || 0}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Paid</p>
                <p className="text-2xl font-bold text-green-600">
                  ₹{member.payments?.reduce((sum, p) => sum + (p.amount || 0), 0) || 0}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

