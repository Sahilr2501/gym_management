import { Link } from 'react-router-dom';
import { useMembers } from '../contexts/MembersContext';
import { usePlans } from '../contexts/PlansContext';
import StatCard from '../components/dashboard/StatCard';
import RecentActivity from '../components/dashboard/RecentActivity';
import MemberCard from '../components/members/MemberCard';

export default function Dashboard() {
  const { members } = useMembers();
  const { plans } = usePlans();

  const totalMembers = members.length;
  const activeMemberships = members.filter(
    m => m.membership?.status === 'active'
  ).length;
  const expiredMemberships = members.filter(
    m => m.membership?.status === 'expired'
  ).length;
  const totalPlans = plans.length;

  // Calculate total revenue
  const totalRevenue = members.reduce((sum, member) => {
    return sum + (member.payments || [])
      .filter(p => p.status === 'paid')
      .reduce((memberSum, p) => memberSum + (p.amount || 0), 0);
  }, 0);

  // Get recent members (last 5)
  const recentMembers = [...members]
    .sort((a, b) => new Date(b.joinedAt) - new Date(a.joinedAt))
    .slice(0, 5);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Members"
          value={totalMembers}
          icon="👥"
          color="primary"
        />
        <StatCard
          title="Active Memberships"
          value={activeMemberships}
          icon="✅"
          color="green"
        />
        <StatCard
          title="Expired Memberships"
          value={expiredMemberships}
          icon="⚠️"
          color="yellow"
        />
        <StatCard
          title="Total Revenue"
          value={`₹${totalRevenue.toLocaleString('en-IN')}`}
          icon="💰"
          color="blue"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <RecentActivity />
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Recent Members</h2>
            <Link to="/members" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              View All →
            </Link>
          </div>
          {recentMembers.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No members yet.</p>
          ) : (
            <div className="space-y-4">
              {recentMembers.map(member => (
                <div key={member.id} className="border-b border-gray-200 last:border-0 pb-4 last:pb-0">
                  <Link
                    to={`/members/${member.id}`}
                    className="block hover:text-primary-600"
                  >
                    <p className="font-medium">{member.firstName} {member.lastName}</p>
                    <p className="text-sm text-gray-500">{member.email}</p>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/members/new" className="card hover:shadow-lg transition-shadow text-center">
            <div className="text-4xl mb-2">➕</div>
            <h3 className="font-semibold text-gray-900">Add Member</h3>
            <p className="text-sm text-gray-500 mt-1">Register a new gym member</p>
          </Link>
          <Link to="/plans/new" className="card hover:shadow-lg transition-shadow text-center">
            <div className="text-4xl mb-2">💳</div>
            <h3 className="font-semibold text-gray-900">Add Plan</h3>
            <p className="text-sm text-gray-500 mt-1">Create a new membership plan</p>
          </Link>
          <Link to="/members" className="card hover:shadow-lg transition-shadow text-center">
            <div className="text-4xl mb-2">📊</div>
            <h3 className="font-semibold text-gray-900">View Reports</h3>
            <p className="text-sm text-gray-500 mt-1">See all members and statistics</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

