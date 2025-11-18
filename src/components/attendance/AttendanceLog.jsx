import { useState } from 'react';
import { format, isToday, parseISO } from 'date-fns';
import { useMembers } from '../../contexts/MembersContext';

export default function AttendanceLog({ memberId }) {
  const { members, toggleAttendance } = useMembers();
  const member = members.find(m => m.id === memberId);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  if (!member) return null;

  const attendance = member.attendance || [];
  const sortedAttendance = [...attendance].sort().reverse();

  const handleCheckIn = () => {
    toggleAttendance(memberId, selectedDate);
  };

  const isCheckedIn = attendance.includes(selectedDate);
  const today = new Date().toISOString().split('T')[0];
  const isTodaySelected = selectedDate === today;

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Attendance Log</h2>
        <div className="flex items-center space-x-3">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            max={today}
            className="input w-auto"
          />
          <button
            onClick={handleCheckIn}
            disabled={isCheckedIn}
            className={`btn ${isCheckedIn ? 'btn-secondary' : 'btn-success'}`}
          >
            {isCheckedIn ? 'Already Checked In' : 'Check In'}
          </button>
        </div>
      </div>

      {sortedAttendance.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No attendance records yet.</p>
      ) : (
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {sortedAttendance.map((date, index) => {
            const dateObj = parseISO(date);
            return (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg">📅</span>
                  <div>
                    <p className="font-medium text-gray-900">
                      {format(dateObj, 'MMM dd, yyyy')}
                    </p>
                    <p className="text-sm text-gray-500">
                      {format(dateObj, 'EEEE')}
                      {isToday(dateObj) && ' (Today)'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => toggleAttendance(memberId, date)}
                  className="text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          Total visits: <span className="font-medium text-gray-900">{attendance.length}</span>
        </p>
      </div>
    </div>
  );
}

