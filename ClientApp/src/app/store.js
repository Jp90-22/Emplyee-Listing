import { configureStore } from '@reduxjs/toolkit'
import departmentsReducer from '../features/department/departmentsSlice'
import employeesReducer from '../features/employee/employeesSlice'

// Test reducer
const testReducer = (state = [], action) => {
    switch(action.type) {
        case 'addSomething':
            return [...state, action.payload]
    }
}


const store = configureStore({
    reducer: {
        // Departments: departmentsReducer,
        // Employees: employeesReducer
        testReducer
    }
})

export default store