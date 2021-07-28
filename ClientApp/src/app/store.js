import { configureStore } from '@reduxjs/toolkit'
import departmentsReducer from '../features/department/departmentsSlice'
import employeesReducer from '../features/employee/employeesSlice'

const store = configureStore({
    reducer: {
        Department: departmentsReducer,
        Employee: employeesReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types
                ignoredActions: [
                    'departments/postDepartment/fulfilled',
                    'departments/updateDepartment/fulfilled',
                    'departments/deleteDepartment/fulfilled',
                    'employees/postEmployee/fulfilled',
                    'employees/updateEmployee/fulfilled',
                    'employees/deleteEmployee/fulfilled',
                    'employees/savePhoto/fulfilled'
                ],
                // Ignore these field paths in all actions
                ignoredActionPaths: ['meta.arg'],
            }
        })
})

export default store