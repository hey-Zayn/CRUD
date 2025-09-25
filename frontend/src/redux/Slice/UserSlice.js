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
        fetchUsers : (state,action) =>  {
            state.loading = true;
            try{
                 state.user = action.payload.map(user => ({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    image: user.image
                }));
               
                state.error = null;
            }catch(err){
                state.error = err.message;
            }finally{
                state.loading = false;
            }

        }
    }   
});


export const { fetchUsers } = UserSlice.actions;
export default UserSlice.reducer;