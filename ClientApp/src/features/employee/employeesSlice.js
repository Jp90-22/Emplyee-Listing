import { 
    createSlice,
    createEntityAdapter,
    createAsyncThunk,
    createSelector
} from '@reduxjs/toolkit'

// Entity adapter
const employeesAdapter = createEntityAdapter({
    selectId: (state) => state.EmployeeId
})

const initialState = employeesAdapter.getInitialState({
    status: "idle", // idle || pending || rejected
    photoStatus: "idle", // idle || sending || rejected
    error: null
})

// Thunks actions dispatchers for Async logic
export const getEmployeesThunk = createAsyncThunk(
    'employees/getEmployees',
    async () => {
        const responseData = await
            fetch(process.env.REACT_APP_API + "employee")
            .then(response => response.json())
        
        return responseData
    }
)

export const postEmployeeThunk = createAsyncThunk(
    'employees/postEmployee',
    async (Employee) => {
        const response = await
            fetch(process.env.REACT_APP_API + "employee", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    "EmployeeName": Employee.EmployeeName,
                    "Department": Employee.Department,
                    "DateOfJoining": Employee.DateOfJoining,
                    "PhotoFileName": Employee.PhotoFileName
                })
            })
        
        return response
    }
)

export const updateEmployeeThunk = createAsyncThunk(
    'employees/updateEmployee',
    async (Employee) => {
        const response = await
            fetch(process.env.REACT_APP_API + "employee", {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    "EmployeeId": Employee.EmployeeId,
                    "EmployeeName": Employee.EmployeeName,
                    "Department": Employee.Department,
                    "DateOfJoining": Employee.DateOfJoining,
                    "PhotoFileName": Employee.PhotoFileName
                })
            })
        
        return response
    }
)

export const deleteEmployeeThunk = createAsyncThunk(
    'employees/deleteEmployee',
    async (EmployeeId) => {
        const response = await
            fetch(`${process.env.REACT_APP_API}employee/${EmployeeId}`, {
                method: 'DELETE'
            })
        
        return response
    }
)

export const getAllDeparmentsNamesThunk = createAsyncThunk(
    'departments/getAllDepartmentsNames',
    async () => {
        const responseData = await
            fetch(process.env.REACT_APP_API + "employee/GetDepartmentNames")
            .then(response => response.json())
        
        return responseData
    }
)

export const savePhotoThunk = createAsyncThunk(
    'employees/savePhoto',
    async (photoFormData) => {
        const responseData = await
            fetch(process.env.REACT_APP_API + "employee/SavePhoto", {
                method: 'POST',
                body: photoFormData
            })
            .then(response => response.json())
        
        return responseData
    }
)

// My employee Slice
const employeesSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {},
    extraReducers: {
        // Get Employee actions and reducers:
        [getEmployeesThunk.pending]: (state, action) => {
            state.status = 'pending'
        },
        [getEmployeesThunk.fulfilled]: (state, action) => {
            state.status = 'idle'
            employeesAdapter.setAll(state, action.payload)
        },
        [getEmployeesThunk.rejected]: (state, action) => {
            state.status = 'rejected'
            state.error = action.error
        },
        // Post Employee actions and reducers: 
        [postEmployeeThunk.pending]: (state, action) => {
            state.status = 'pending'
        },
        [postEmployeeThunk.fulfilled]: (state, action) => {
            state.status = 'idle'
        },
        [postEmployeeThunk.rejected]: (state, action) => {
            state.status = 'rejected'
            state.error = action.error
        },
        // Update Employee actions and reducers: 
        [updateEmployeeThunk.pending]: (state, action) => {
            state.status = 'pending'
        },
        [updateEmployeeThunk.fulfilled]: (state, action) => {
            state.status = 'idle'
        },
        [updateEmployeeThunk.rejected]: (state, action) => {
            state.status = 'rejected'
            state.error = action.error
        },
        // Delete Employee actions and reducers: 
        [deleteEmployeeThunk.pending]: (state, action) => {
            state.status = 'pending'
        },
        [deleteEmployeeThunk.fulfilled]: (state, action) => {
            state.status = 'idle'
        },
        [deleteEmployeeThunk.rejected]: (state, action) => {
            state.status = 'rejected'
            state.error = action.error
        },
        // Get all Departments names actions and reducers:
        [getAllDeparmentsNamesThunk.pending]: (state, action) => {
            state.status = 'pending'
        },
        [getAllDeparmentsNamesThunk.fulfilled]: (state, action) => {
            state.status = 'idle'
        },
        [getAllDeparmentsNamesThunk.rejected]: (state, action) => {
            state.status = 'rejected'
            state.error = action.error
        },
        // Save photo actions and reducers:
        [savePhotoThunk.pending]: (state, action) => {
            state.photoStatus = 'sending'
        },
        [savePhotoThunk.fulfilled]: (state, action) => {
            state.photoStatus = 'idle'
        },
        [savePhotoThunk.rejected]: (state, action) => {
            state.photoStatus = 'rejected'
            state.error = action.error
        }
    }
})

// Exports:
export const { selectAll: getEmployees, selectById: lookEmployeesById } = 
    employeesAdapter.getSelectors(state => state.Employee)

export const selectStateStatus = createSelector(
    (state) => state.Employee.status,
    (status) => status
)

export const selectPhotoStatus = createSelector(
    (state) => state.Employee.photoStatus,
    (photoStatus) => photoStatus
)

export default employeesSlice.reducer
