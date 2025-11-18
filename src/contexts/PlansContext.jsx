import { createContext, useContext, useReducer, useEffect } from 'react';
import { initialPlans } from '../data/mockData';
import { saveState, loadState } from '../services/localStorage';

const PlansContext = createContext();

const initialState = {
  plans: loadState('plans', initialPlans)
};

function plansReducer(state, action) {
  switch (action.type) {
    case 'ADD_PLAN':
      const newPlans = [...state.plans, action.payload];
      saveState('plans', newPlans);
      return { ...state, plans: newPlans };

    case 'UPDATE_PLAN':
      const updatedPlans = state.plans.map(p =>
        p.id === action.payload.id ? action.payload : p
      );
      saveState('plans', updatedPlans);
      return { ...state, plans: updatedPlans };

    case 'DELETE_PLAN':
      const filteredPlans = state.plans.filter(p => p.id !== action.payload);
      saveState('plans', filteredPlans);
      return { ...state, plans: filteredPlans };

    case 'LOAD_PLANS':
      return { ...state, plans: action.payload };

    default:
      return state;
  }
}

export function PlansProvider({ children }) {
  const [state, dispatch] = useReducer(plansReducer, initialState);

  useEffect(() => {
    // Sync with localStorage on mount
    const savedPlans = loadState('plans', initialPlans);
    if (JSON.stringify(savedPlans) !== JSON.stringify(state.plans)) {
      dispatch({ type: 'LOAD_PLANS', payload: savedPlans });
    }
  }, []);

  const addPlan = (plan) => {
    dispatch({ type: 'ADD_PLAN', payload: plan });
  };

  const updatePlan = (plan) => {
    dispatch({ type: 'UPDATE_PLAN', payload: plan });
  };

  const deletePlan = (planId) => {
    dispatch({ type: 'DELETE_PLAN', payload: planId });
  };

  const value = {
    plans: state.plans,
    addPlan,
    updatePlan,
    deletePlan
  };

  return (
    <PlansContext.Provider value={value}>
      {children}
    </PlansContext.Provider>
  );
}

export function usePlans() {
  const context = useContext(PlansContext);
  if (!context) {
    throw new Error('usePlans must be used within a PlansProvider');
  }
  return context;
}

