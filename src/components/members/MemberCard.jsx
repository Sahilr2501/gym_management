import { Link } from 'react-router-dom';
import { format } from 'date-fns';

export default function MemberCard({ member }) {
  const getStatusBadge = (status) => {
    const badges = {
      active: 'badge badge-success',
      expired: 'badge badge-danger',
      canceled: 'badge badge-warning'
    };
    return badges[status] || 'badge badge-info';
  };

  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {member.firstName} {member.lastName}
          </h3>
          <p className="text-sm text-gray-500">{member.email}</p>
        </div>
        <span className={getStatusBadge(member.membership?.status)}>
          {member.membership?.status || 'No Plan'}
        </span>
      </div>
      <div className="space-y-2 text-sm text-gray-600">
        <p><span className="font-medium">Phone:</span> {member.phone}</p>
        <p><span className="font-medium">Joined:</span> {format(new Date(member.joinedAt), 'MMM dd, yyyy')}</p>
        {member.membership && (
          <p>
            <span className="font-medium">Plan:</span> {member.membership.planId}
            {member.membership.endDate && (
              <span className="ml-2">
                (Expires: {format(new Date(member.membership.endDate), 'MMM dd, yyyy')})
              </span>
            )}
          </p>
        )}
        <p><span className="font-medium">Attendance:</span> {member.attendance?.length || 0} visits</p>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200">
        <Link
          to={`/members/${member.id}`}
          className="text-primary-600 hover:text-primary-700 font-medium text-sm"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}

