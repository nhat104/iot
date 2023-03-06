import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from 'api/userApi';

const initialState = {
  user: {
    currentPage: 1,
    totalPages: 1,
    list: [],
  },
  userNames: [],
  errorMessage: '',
  statusList: 'idle',
  statusNames: 'idle',
  statusAdd: 'idle',
  statusEdit: 'idle',
  statusDelete: 'idle',
  statusFilter: 'idle',
};

export const listUser = createAsyncThunk('user/list', async (body) => {
  const response = await userApi.list(body);
  const list = response.data.tutorials.map((user) => ({
    id: user.id,
    userId: user.user_code,
    name: user.full_name,
    email: user.email,
    role: user.role === 1 ? 'Admin' : 'Editor',
  }));
  return { currentPage: response.data.currentPage + 1, totalPages: response.data.totalPages, list };
});

export const listUserNames = createAsyncThunk('user/listName', async (body) => {
  const response = await userApi.list(body);
  const list = response.data.tutorials.map((user) => ({
    value: user.id,
    label: user.full_name,
  }));
  return list;
});

export const filterUser = createAsyncThunk('user/filter', async (body) => {
  const response = await userApi.filter(body);
  const list = response.data.tutorials.map((user) => ({
    id: user.id,
    userId: user.user_code,
    name: user.full_name,
    email: user.email,
    role: user.role === 1 ? 'Admin' : 'Editor',
  }));
  return { currentPage: response.data.currentPage + 1, totalPages: response.data.totalPages, list };
});

export const addUser = createAsyncThunk(
  'user/add',
  async (body, { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await userApi.add(body);
      return fulfillWithValue(response.data);
    } catch (error) {
      throw rejectWithValue(error.response.data.error);
    }
  }
);

export const editUser = createAsyncThunk(
  'user/edit',
  async (body, { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await userApi.edit(body);
      return fulfillWithValue(response.data);
    } catch (error) {
      throw rejectWithValue(error.response.data.error);
    }
  }
);

export const deleteUser = createAsyncThunk('user/delete', async (id) => {
  const response = await userApi.delete(id);
  return response.data;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearStatus: (state) => {
      state.statusAdd = 'idle';
      state.statusEdit = 'idle';
      state.statusDelete = 'idle';
      state.statusFilter = 'idle';
    },
    clearError: (state) => {
      state.errorMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listUser.pending, (state) => {
        state.statusList = 'loading';
      })
      .addCase(listUser.fulfilled, (state, action) => {
        state.statusList = 'success';
        state.user = action.payload;
      })
      .addCase(listUser.rejected, (state) => {
        state.statusList = 'error';
      })

      .addCase(listUserNames.pending, (state) => {
        state.statusNames = 'loading';
      })
      .addCase(listUserNames.fulfilled, (state, action) => {
        state.statusNames = 'success';
        state.userNames = action.payload;
      })
      .addCase(listUserNames.rejected, (state) => {
        state.statusNames = 'error';
      })

      .addCase(addUser.pending, (state) => {
        state.statusAdd = 'loading';
      })
      .addCase(addUser.fulfilled, (state) => {
        state.statusAdd = 'success';
      })
      .addCase(addUser.rejected, (state, action) => {
        state.statusAdd = 'error';
        state.errorMessage = action.payload;
      })

      .addCase(editUser.pending, (state) => {
        state.statusEdit = 'loading';
      })
      .addCase(editUser.fulfilled, (state) => {
        state.statusEdit = 'success';
      })
      .addCase(editUser.rejected, (state, action) => {
        state.statusEdit = 'error';
        // state.errorMessage = action.payload;
      })

      .addCase(deleteUser.pending, (state) => {
        state.statusDelete = 'loading';
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.statusDelete = 'success';
      })
      .addCase(deleteUser.rejected, (state) => {
        state.statusDelete = 'error';
      })

      .addCase(filterUser.pending, (state) => {
        state.statusFilter = 'loading';
      })
      .addCase(filterUser.fulfilled, (state, action) => {
        state.statusFilter = 'success';
        state.user = action.payload;
      })
      .addCase(filterUser.rejected, (state) => {
        state.statusFilter = 'error';
      });
  },
});

export const { clearStatus, clearError } = userSlice.actions;

export const selectUser = (state) => state.user;
export const selectUserOption = (state) =>
  [{ value: '', label: '--Select/Option--' }].concat(
    state.user.user.list.map((user) => ({ value: user.id, label: user.name }))
  );

export default userSlice.reducer;
