import { createSlice } from "@reduxjs/toolkit";

export const userBasicDetailsSlice = createSlice(
    {
        name:"user_basic_details",
        initialState:{
            name:null,
            profile_pic:null,
        },
        reducers:{
            set_user_basic_details:(state,action) =>{
                state.name=action.payload.name;
                state.profile_pic = action.payload.profile_pic;
            }
        }
     }
    )
// exporting actions 
export const {set_user_basic_details} = userBasicDetailsSlice.actions
// exporting reducer
export default userBasicDetailsSlice.reducer
