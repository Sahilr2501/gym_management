import { createContext, useContext, useReducer, useEffect } from 'react';
import { initialMembers } from '../data/mockData';
import { saveState, loadState } from '../services/localStorage';

const MembersContext = createContext();

const initialState = {
  members: loadState('members', initialMembers)
};

function membersReducer(state, action) {
  switch (action.type) {
    case 'ADD_MEMBER':
      const newMembers = [...state.members, action.payload];
      saveState('members', newMembers);
      return { ...state, members: newMembers };

    case 'UPDATE_MEMBER':
      const updatedMembers = state.members.map(m =>
        m.id === action.payload.id ? action.payload : m
      );
      saveState('members', updatedMembers);
      return { ...state, members: updatedMembers };

    case 'DELETE_MEMBER':
      const filteredMembers = state.members.filter(m => m.id !== action.payload);
      saveState('members', filteredMembers);
      return { ...state, members: filteredMembers };

    case 'ADD_PAYMENT':
      const membersWithPayment = state.members.map(m => {
        if (m.id === action.payload.memberId) {
          return {
            ...m,
            payments: [...m.payments, action.payload.payment]
          };
        }
        return m;
      });
      saveState('members', membersWithPayment);
      return { ...state, members: membersWithPayment };

    case 'TOGGLE_ATTENDANCE':
      const { memberId, date } = action.payload;
      const membersWithAttendance = state.members.map(m => {
        if (m.id === memberId) {
          const attendance = m.attendance || [];
          const hasAttended = attendance.includes(date);
          return {
            ...m,
            attendance: hasAttended
              ? attendance.filter(d => d !== date)
              : [...attendance, date]
          };
        }
        return m;
      });
      saveState('members', membersWithAttendance);
      return { ...state, members: membersWithAttendance };

    case 'UPDATE_MEMBERSHIP':
      const membersWithUpdatedMembership = state.members.map(m => {
        if (m.id === action.payload.memberId) {
          return {
            ...m,
            membership: action.payload.membership
          };
        }
        return m;
      });
      saveState('members', membersWithUpdatedMembership);
      return { ...state, members: membersWithUpdatedMembership };

    case 'LOAD_MEMBERS':
      return { ...state, members: action.payload };

    default:
      return state;
  }
}

export function MembersProvider({ children }) {
  const [state, dispatch] = useReducer(membersReducer, initialState);

  useEffect(() => {
    // Sync with localStorage on mount
    const savedMembers = loadState('members', initialMembers);
    if (JSON.stringify(savedMembers) !== JSON.stringify(state.members)) {
      dispatch({ type: 'LOAD_MEMBERS', payload: savedMembers });
    }
  }, []);

  const addMember = (member) => {
    dispatch({ type: 'ADD_MEMBER', payload: member });
  };

  const updateMember = (member) => {
    dispatch({ type: 'UPDATE_MEMBER', payload: member });
  };

  const deleteMember = (memberId) => {
    dispatch({ type: 'DELETE_MEMBER', payload: memberId });
  };

  const addPayment = (memberId, payment) => {
    dispatch({ type: 'ADD_PAYMENT', payload: { memberId, payment } });
  };

  const toggleAttendance = (memberId, date) => {
    dispatch({ type: 'TOGGLE_ATTENDANCE', payload: { memberId, date } });
  };

  const updateMembership = (memberId, membership) => {
    dispatch({ type: 'UPDATE_MEMBERSHIP', payload: { memberId, membership } });
  };

  const value = {
    members: state.members,
    addMember,
    updateMember,
    deleteMember,
    addPayment,
    toggleAttendance,
    updateMembership
  };

  return (
    <MembersContext.Provider value={value}>
      {children}
    </MembersContext.Provider>
  );
}

export function useMembers() {
  const context = useContext(MembersContext);
  if (!context) {
    throw new Error('useMembers must be used within a MembersProvider');
  }
  return context;
}

