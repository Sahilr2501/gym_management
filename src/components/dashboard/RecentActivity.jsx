import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { useMembers } from '../../contexts/MembersContext';

export default function RecentActivity() {
  const { members } = useMembers();

  // Get recent attendance (last 10)
  const recentAttendance = members
    .flatMap(member =>
      (member.attendance || []).map(date => ({
        type: 'attendance',
        date,
        memberId: member.id,
        memberName: `${member.firstName} ${member.lastName}`
      }))
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 10);

  // Get recent payments (last 10)
  const recentPayments = members
    .flatMap(member =>
      (member.payments || []).map(payment => ({
        type: 'payment',
        date: payment.date,
        amount: payment.amount,
        memberId: member.id,
        memberName: `${member.firstName} ${member.lastName}`
      }))
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 10);

  // Combine and sort
  const allActivities = [...recentAttendance, ...recentPayments]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 10);

  return (
    <div className="card">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
      {allActivities.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No recent activity.</p>
      ) : (
        <div className="space-y-3">
          {allActivities.map((activity, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
            >
              <span className="text-xl">
                {activity.type === 'attendance' ? '📅' : '💳'}
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {activity.type === 'attendance' ? (
                    <Link
                      to={`/members/${activity.memberId}`}
                      className="hover:text-primary-600"
                    >
                      {activity.memberName} checked in
                    </Link>
                  ) : (
                    <Link
                      to={`/members/${activity.memberId}`}
                      className="hover:text-primary-600"
                    >
                      {activity.memberName} paid ₹{activity.amount?.toLocaleString('en-IN')}
                    </Link>
                  )}
                </p>
                <p className="text-xs text-gray-500">
                  {format(parseISO(activity.date), 'MMM dd, yyyy HH:mm')}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

