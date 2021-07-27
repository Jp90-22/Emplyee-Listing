import { 
    createSlice,
    createEntityAdapter,
    createAsyncThunk,
    createSelector
} from '@reduxjs/toolkit'

// Entity adapter
const deparmentsAdapter = createEntityAdapter({
    selectId: (state) => state.DepartmentId
})

const initialState = deparmentsAdapter.getInitialState({
    status: "idle", // idle || pending || rejected
    error: null
})

// Thunks actions dispatchers for Async logic
export const getDepartmentsThunk = createAsyncThunk(
    'departments/getDepartments',
    async () => {
        const responseData = await
            fetch(process.env.REACT_APP_API + "department")
            .then(response => response.json())
        
        return responseData
    }
)

export const postDepartmentThunk = createAsyncThunk(
    'departments/postDepartment',
    async (Department) => {
        const response = await
            fetch(process.env.REACT_APP_API + "department", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    "DepartmentName": Department.DepartmentName
                })
            })
        
        return response
    }
)

export const updateDepartmentThunk = createAsyncThunk(
    'departments/updateDepartment',
    async (Department) => {
        const response = await
            fetch(process.env.REACT_APP_API + "department", {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "DepartmentId": Department.DepartmentId,
                    "DepartmentName": Department.DepartmentName
                })
            })
        
        return response
    }
)

export const deleteDepartmentThunk = createAsyncThunk(
    'departments/deleteDepartment',
    async (DepartmentId) => {
        const response = await
            fetch(`${process.env.REACT_APP_API}department/${DepartmentId}`, {
                method: 'DELETE'
            })
        
        return response
    }
)

// My department Slice
const departmentsSlice = createSlice({
    name: 'deparments',
    initialState,
    reducers: {},
    extraReducers: {
        // Get Departments actions:
        [getDepartmentsThunk.pending]: (state, action) => {
            state.status = 'pending'
        },
        [getDepartmentsThunk.fulfilled]: (state, action) => {
            state.status = 'idle'
            deparmentsAdapter.setAll(state, action.payload)
        },
        [getDepartmentsThunk.rejected]: (state, action) => {
            state.status = 'rejected'
            state.error = action.error
        },
        // Post Department actions: 
        [postDepartmentThunk.pending]: (state, action) => {
            state.status = 'pending'
        },
        [postDepartmentThunk.fulfilled]: (state, action) => {
            state.status = 'idle'
        },
        [postDepartmentThunk.rejected]: (state, action) => {
            state.status = 'rejected'
            state.error = action.error
        },
        // Update Department actions: 
        [updateDepartmentThunk.pending]: (state, action) => {
            state.status = 'pending'
        },
        [updateDepartmentThunk.fulfilled]: (state, action) => {
            state.status = 'idle'
        },
        [updateDepartmentThunk.rejected]: (state, action) => {
            state.status = 'rejected'
            state.error = action.error
        },
        // Delete Department actions: 
        [deleteDepartmentThunk.pending]: (state, action) => {
            state.status = 'pending'
        },
        [deleteDepartmentThunk.fulfilled]: (state, action) => {
            state.status = 'idle'
        },
        [deleteDepartmentThunk.rejected]: (state, action) => {
            state.status = 'rejected'
            state.error = action.error
        }
    }
})

// Exports:
export const { selectAll: getDeparments, selectById: lookDepartmentById } = 
    deparmentsAdapter.getSelectors(state => state.Department)

export const selectStateStatus = createSelector(
    (state) => state.Department.status,
    (status) => status
)

export default departmentsSlice.reducer