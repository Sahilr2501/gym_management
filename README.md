# GYM Management System — Frontend

A single-page React application for managing gym members, memberships, attendance, and payments without database.

## Features

- ✅ Add and manage gym members with personal details
- ✅ Create and manage membership plans (monthly, quarterly, yearly, etc.)
- ✅ Update or renew existing memberships
- ✅ Track member attendance
- ✅ Manage payment records and status
- ✅ Dashboard with statistics and recent activity
- ✅ Responsive design with modern UI

## Tech Stack

- **React** 18.2.0 — Function components + hooks
- **react-router-dom** 6.20.0 — Routing
- **Context API** — State management
- **Vite** 5.0.8 — Build tooling
- **Tailwind CSS** 3.3.6 — Styling
- **react-hook-form** 7.48.2 — Form handling
- **date-fns** 2.30.0 — Date formatting

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repo-url>
cd gym-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
gym-frontend/
├─ public/
├─ src/
│  ├─ assets/
│  ├─ components/
│  │  ├─ layout/          # Header, Sidebar, Footer, Layout
│  │  ├─ members/         # MemberCard, MembersList, MemberForm, MemberDetails
│  │  ├─ memberships/     # PlansList, PlanForm, PlanSelect
│  │  ├─ attendance/      # AttendanceLog
│  │  ├─ payments/        # PaymentsList, PaymentForm
│  │  └─ dashboard/       # StatCard, RecentActivity
│  ├─ contexts/           # MembersContext, PlansContext
│  ├─ data/               # mockData.js
│  ├─ pages/              # Dashboard, MembersPage, PlansPage, etc.
│  ├─ services/           # localStorage helpers
│  ├─ styles/             # index.css (Tailwind)
│  ├─ App.jsx
│  └─ main.jsx
├─ package.json
├─ vite.config.js
├─ tailwind.config.js
└─ README.md
```

## Available Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run preview` — Preview production build
- `npm test` — Run tests (when configured)

## Data Structure

### Member Object
```json
{
  "id": "m_001",
  "firstName": "Amit",
  "lastName": "Sharma",
  "email": "amit@example.com",
  "phone": "9876543210",
  "dob": "1992-06-10",
  "gender": "Male",
  "address": "Mumbai, India",
  "joinedAt": "2025-01-10",
  "membership": {
    "planId": "p_monthly",
    "startDate": "2025-11-01",
    "endDate": "2025-11-30",
    "status": "active"
  },
  "attendance": ["2025-11-01", "2025-11-03"],
  "payments": [
    { "id": "pay_001", "date": "2025-11-01", "amount": 1200, "status": "paid" }
  ]
}
```

### Membership Plan Object
```json
{
  "id": "p_monthly",
  "title": "Monthly",
  "durationDays": 30,
  "price": 1200,
  "description": "Standard monthly access"
}
```

## Routing

- `/` — Dashboard (summary statistics and recent activity)
- `/members` — Members list with search and filter
- `/members/new` — Add new member form
- `/members/:id` — Member details page
- `/members/:id/edit` — Edit member form
- `/plans` — Membership plans list
- `/plans/new` — Add new plan form
- `/plans/:id/edit` — Edit plan form
- `/reports` — Reports and statistics

## State Management

The app uses React Context API with useReducer for state management:

- **MembersContext** — Manages all member data and operations
- **PlansContext** — Manages all membership plan data and operations

Data is persisted to `localStorage` automatically, so it survives page refreshes.

## Styling

The project uses **Tailwind CSS** for styling with custom utility classes defined in `src/styles/index.css`. The design is responsive and follows modern UI/UX practices.

## Features in Detail

### Members Management
- Add new members with complete personal information
- Edit existing member details
- View member profile with membership, attendance, and payment history
- Search and filter members by name, email, phone, or status
- Delete members

### Membership Plans
- Create custom membership plans with duration and pricing
- Edit or delete existing plans
- Plans are automatically linked to members

### Attendance Tracking
- Check-in members for any date
- View attendance history
- Remove attendance records

### Payment Management
- Add payment records with date, amount, and status
- Track payment history per member
- View total revenue and payment statistics

### Dashboard
- Overview statistics (total members, active memberships, revenue)
- Recent activity feed
- Quick action buttons
- Recent members list

## Future Enhancements

- Replace mock data with a real backend API
- Add CSV import/export for members
- Calendar view for attendance
- Email/SMS reminders for renewals
- Role-based access control (admin, trainer, receptionist)
- Advanced reporting and analytics
- Member photo uploads
- Workout tracking
- Trainer assignments

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For issues, questions, or contributions, please open an issue on the GitHub repository.

