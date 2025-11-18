import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMembers } from '../../contexts/MembersContext';
import MemberCard from './MemberCard';

export default function MembersList() {
  const { members } = useMembers();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredMembers = members.filter(member => {
    const matchesSearch = 
      member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.phone.includes(searchTerm);

    const matchesFilter = 
      filterStatus === 'all' || 
      member.membership?.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Members</h1>
        <Link to="/members/new" className="btn btn-primary">
          + Add New Member
        </Link>
      </div>

      <div className="card mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
              Search Members
            </label>
            <input
              id="search"
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label htmlFor="filter" className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Status
            </label>
            <select
              id="filter"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="input"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="expired">Expired</option>
              <option value="canceled">Canceled</option>
            </select>
          </div>
        </div>
      </div>

      {filteredMembers.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-gray-500 text-lg">No members found.</p>
          <Link to="/members/new" className="btn btn-primary mt-4 inline-block">
            Add Your First Member
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map(member => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      )}

      <div className="mt-6 text-sm text-gray-500">
        Showing {filteredMembers.length} of {members.length} members
      </div>
    </div>
  );
}

