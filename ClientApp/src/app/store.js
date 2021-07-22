import { configureStore } from '@reduxjs/toolkit'
import departmentsReducer from '../features/department/departmentsSlice'
import employeesReducer from '../features/employee/employeesSlice'

const store = configureStore({
    reducer: {
        Departments: departmentsReducer,
        Employees: employeesReducer
    },
})

export default store