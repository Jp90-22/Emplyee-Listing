import { 
    createSlice,
    createEntityAdapter,
    createAsyncThunk
} from '@reduxjs/toolkit'

// Entity adapter
const employeesAdapter = createEntityAdapter({
    selectId: (state) => state.EmployeeId
})

const initialState = employeesAdapter.getInitialState({
    status: "idle",
    error: null
})

// Thunks actions dispatchers for Async logic

// My employee Slice
const employeesSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        // CRUD by async logic
    }
})

// Exports:
export const { selectAll: getEmployees, selectById: lookEmployeesById } = 
    employeesAdapter.getSelectors(state => state.Employee)

export default employeesSlice.reducer