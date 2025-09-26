import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user: [],
    loading: false,
    error: null,
};


const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        fetchUsers: (state, action) => {
            state.loading = true;
            try {
                state.user = action.payload.map(user => ({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    image: user.image
                }));

                state.error = null;
            } catch (err) {
                state.error = err.message;
            } finally {
                state.loading = false;
            }

        },

        PostUser: (state, action) => {
            state.user.push(action.payload)
        },
        updateUser: (state, action) => {
            const index = state.user.findIndex(x => x.id === action.payload.id);
            state.user[index] = {
                id: action.payload.id,
                name: action.payload.name,
                email: action.payload.email,
                phone: action.payload.phone,
                image: action.payload.image
            }
        },
    }
});


export const { fetchUsers, PostUser, updateUser } = UserSlice.actions;
export default UserSlice.reducer;