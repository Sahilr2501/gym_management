import { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { useMembers } from '../../contexts/MembersContext';
import PaymentForm from './PaymentForm';

export default function PaymentsList({ memberId }) {
  const { members, addPayment } = useMembers();
  const member = members.find(m => m.id === memberId);
  const [showForm, setShowForm] = useState(false);

  if (!member) return null;

  const payments = member.payments || [];
  const sortedPayments = [...payments].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );

  const getStatusBadge = (status) => {
    const badges = {
      paid: 'badge badge-success',
      pending: 'badge badge-warning',
      overdue: 'badge badge-danger'
    };
    return badges[status] || 'badge badge-info';
  };

  const handleAddPayment = (paymentData) => {
    const payment = {
      id: `pay_${Date.now()}`,
      ...paymentData,
      amount: parseFloat(paymentData.amount),
      date: paymentData.date || new Date().toISOString().split('T')[0]
    };
    addPayment(memberId, payment);
    setShowForm(false);
  };

  const totalPaid = payments
    .filter(p => p.status === 'paid')
    .reduce((sum, p) => sum + (p.amount || 0), 0);

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Payment History</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn btn-primary"
        >
          {showForm ? 'Cancel' : '+ Add Payment'}
        </button>
      </div>

      {showForm && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <PaymentForm onSubmit={handleAddPayment} onCancel={() => setShowForm(false)} />
        </div>
      )}

      {sortedPayments.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No payment records yet.</p>
      ) : (
        <div className="space-y-3">
          {sortedPayments.map((payment) => (
            <div
              key={payment.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-lg">💳</span>
                  <div>
                    <p className="font-medium text-gray-900">
                      ₹{payment.amount?.toLocaleString('en-IN')}
                    </p>
                    <p className="text-sm text-gray-500">
                      {format(parseISO(payment.date), 'MMM dd, yyyy')}
                    </p>
                  </div>
                </div>
              </div>
              <span className={getStatusBadge(payment.status)}>
                {payment.status}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">Total Paid</p>
          <p className="text-lg font-bold text-green-600">
            ₹{totalPaid.toLocaleString('en-IN')}
          </p>
        </div>
      </div>
    </div>
  );
}

