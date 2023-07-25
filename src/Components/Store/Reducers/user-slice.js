import { createSlice, createAsyncThunk, EnhancerArray } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  messageSignup: "",
  messageLogin: "",
  error: null,
  token: null,
  role: "",
  username: "",
};

var role = "";
var uN = "";
var tkn = "";

export const userLogin = createAsyncThunk(
  "users/login",
  async ({ username, password }) => {
    console.log("In login", username, password);
    let user = {
      username: username,
      password: password,
    };

    const response = await axios.post(
      "http://localhost:2121/user/login",
      user,
      {
        Headers: {
          "Content-Type": "application/json",
          //   "Authorization":"Bearer "+ {token}
        },
      }
    );
    const foundUser = await response.data;
    console.log("FoundUser", foundUser);
    if (foundUser.length == 0) {
      console.log("in here");
      throw new Error("invalid user Details");
    }
    role = foundUser[1];
    uN = username;
    tkn = foundUser[0];
    return foundUser[2];
  }
);

// export const userRegister = createAsyncThunk(
//   "users/register",
//   async ({ name, email, password }) => {
//     let user = {
//       username: name,
//       email: email,
//       password: password,
//     };
//     const response = await axios.post(
//       "http://localhost:3000/api/stock/UserDetails",
//       user,
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     const data = await response.data;
//     return data;
//   }
// );

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // onLogout: (state, action) => {
    //   state.token = null;
    //   state.messageLogin = "";
    //   state.userEmail = "";
    // },
    onReset: (state, action) => {
      state.messageLogin = "";
      state.messageSignup = "";
      state.username = "";
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state, action) => {
      console.log(action.payload, "in pending");
      state.loading = true;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      console.log(action.payload, "in fulfilled");
      state.loading = false;
      state.messageLogin = "Successfully logged in";
      state.token = tkn;
      state.role = role;
      state.username = uN;
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.messageLogin = "Incorrect email/password. Try again!";
      state.loading = false;
      state.error = action.error.message;
    });

    // builder.addCase(userRegister.pending, (state, action) => {
    //   state.loading = true;
    // });
    // builder.addCase(userRegister.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.messageSignup = "Successfully Registered";
    //   state.userEmail = action.payload.email;
    //   // state.token = v4();
    // });
    // builder.addCase(userRegister.rejected, (state, action) => {
    //   state.loading = false;
    //   state.messageSignup = "Something went wrong. Try again!";
    //   state.error = action.error.message;
    // });
  },
});

export const { onLogout, onReset } = userSlice.actions;

export default userSlice.reducer;
