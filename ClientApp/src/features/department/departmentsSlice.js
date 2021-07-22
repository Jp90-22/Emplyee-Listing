import { 
    createSlice,
    createEntityAdapter,
    createAsyncThunk
} from '@reduxjs/toolkit'

// Entity adapter
const deparmentsAdapter = createEntityAdapter({
    selectId: (state) => state.DepartmentId
})

const initialState = deparmentsAdapter.getInitialState({
    status: "idle",
    error: null
})

// Thunks actions dispatchers for Async logic

// My department Slice
const departmentsSlice = createSlice({
    name: 'deparments',
    initialState,
    reducers: {
        // CRUD by async logic
    }
})

// Exports:
export const { selectAll: getDeparments, selectById: lookDepartmentById } = 
    deparmentsAdapter.getSelectors(state => state.Department)

export default departmentsSlice.reducer