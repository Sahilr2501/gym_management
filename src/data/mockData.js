// Initial mock data for the GYM Management System

export const initialPlans = [
  {
    id: "p_monthly",
    title: "Monthly",
    durationDays: 30,
    price: 1200,
    description: "Standard monthly access to all facilities"
  },
  {
    id: "p_quarterly",
    title: "Quarterly",
    durationDays: 90,
    price: 3200,
    description: "3 months access with 10% discount"
  },
  {
    id: "p_yearly",
    title: "Yearly",
    durationDays: 365,
    price: 12000,
    description: "Full year access with 15% discount"
  },
  {
    id: "p_weekly",
    title: "Weekly",
    durationDays: 7,
    price: 400,
    description: "Short-term weekly pass"
  }
];

export const initialMembers = [
  {
    id: "m_001",
    firstName: "Amit",
    lastName: "Sharma",
    email: "amit@example.com",
    phone: "9876543210",
    dob: "1992-06-10",
    gender: "Male",
    address: "Mumbai, India",
    joinedAt: "2025-01-10",
    membership: {
      planId: "p_monthly",
      startDate: "2025-11-01",
      endDate: "2025-11-30",
      status: "active"
    },
    attendance: [
      "2025-11-01",
      "2025-11-03",
      "2025-11-05"
    ],
    payments: [
      { id: "pay_001", date: "2025-11-01", amount: 1200, status: "paid" }
    ]
  },
  {
    id: "m_002",
    firstName: "Priya",
    lastName: "Patel",
    email: "priya@example.com",
    phone: "9876543211",
    dob: "1995-03-15",
    gender: "Female",
    address: "Delhi, India",
    joinedAt: "2025-01-15",
    membership: {
      planId: "p_quarterly",
      startDate: "2025-10-01",
      endDate: "2025-12-30",
      status: "active"
    },
    attendance: [
      "2025-11-01",
      "2025-11-02",
      "2025-11-04",
      "2025-11-06"
    ],
    payments: [
      { id: "pay_002", date: "2025-10-01", amount: 3200, status: "paid" }
    ]
  },
  {
    id: "m_003",
    firstName: "Raj",
    lastName: "Kumar",
    email: "raj@example.com",
    phone: "9876543212",
    dob: "1988-11-20",
    gender: "Male",
    address: "Bangalore, India",
    joinedAt: "2024-12-01",
    membership: {
      planId: "p_yearly",
      startDate: "2025-01-01",
      endDate: "2025-12-31",
      status: "active"
    },
    attendance: [
      "2025-11-01",
      "2025-11-02",
      "2025-11-03",
      "2025-11-04",
      "2025-11-05"
    ],
    payments: [
      { id: "pay_003", date: "2025-01-01", amount: 12000, status: "paid" }
    ]
  },
  {
    id: "m_004",
    firstName: "Sneha",
    lastName: "Singh",
    email: "sneha@example.com",
    phone: "9876543213",
    dob: "1993-08-05",
    gender: "Female",
    address: "Pune, India",
    joinedAt: "2025-10-20",
    membership: {
      planId: "p_monthly",
      startDate: "2025-10-20",
      endDate: "2025-11-19",
      status: "expired"
    },
    attendance: [
      "2025-10-20",
      "2025-10-22",
      "2025-10-25"
    ],
    payments: [
      { id: "pay_004", date: "2025-10-20", amount: 1200, status: "paid" }
    ]
  }
];

