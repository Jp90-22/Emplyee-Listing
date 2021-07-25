import { configureStore } from '@reduxjs/toolkit'
import departmentsReducer from '../features/department/departmentsSlice'
import employeesReducer from '../features/employee/employeesSlice'

const store = configureStore({
    reducer: {
        Department: departmentsReducer,
        Employee: employeesReducer
    },
})

export default store