import { useMembers } from '../contexts/MembersContext';
import { usePlans } from '../contexts/PlansContext';
import { format } from 'date-fns';

export default function ReportsPage() {
  const { members } = useMembers();
  const { plans } = usePlans();

  const totalMembers = members.length;
  const activeMemberships = members.filter(m => m.membership?.status === 'active').length;
  const expiredMemberships = members.filter(m => m.membership?.status === 'expired').length;
  const canceledMemberships = members.filter(m => m.membership?.status === 'canceled').length;

  const totalRevenue = members.reduce((sum, member) => {
    return sum + (member.payments || [])
      .filter(p => p.status === 'paid')
      .reduce((memberSum, p) => memberSum + (p.amount || 0), 0);
  }, 0);

  const totalAttendance = members.reduce((sum, member) => {
    return sum + (member.attendance || []).length;
  }, 0);

  // Plan distribution
  const planDistribution = plans.map(plan => ({
    plan: plan.title,
    count: members.filter(m => m.membership?.planId === plan.id).length
  }));

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Reports</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total Members</h3>
          <p className="text-3xl font-bold text-gray-900">{totalMembers}</p>
        </div>
        <div className="card">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Active Memberships</h3>
          <p className="text-3xl font-bold text-green-600">{activeMemberships}</p>
        </div>
        <div className="card">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total Revenue</h3>
          <p className="text-3xl font-bold text-primary-600">₹{totalRevenue.toLocaleString('en-IN')}</p>
        </div>
        <div className="card">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total Visits</h3>
          <p className="text-3xl font-bold text-blue-600">{totalAttendance}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Membership Status</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Active</span>
              <span className="font-semibold text-green-600">{activeMemberships}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Expired</span>
              <span className="font-semibold text-yellow-600">{expiredMemberships}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Canceled</span>
              <span className="font-semibold text-red-600">{canceledMemberships}</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Plan Distribution</h2>
          <div className="space-y-3">
            {planDistribution.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-gray-600">{item.plan}</span>
                <span className="font-semibold">{item.count} members</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

