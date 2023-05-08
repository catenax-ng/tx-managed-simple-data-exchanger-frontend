/********************************************************************************
 * Copyright (c) 2021,2022 T-Systems International GmbH
 * Copyright (c) 2022 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IHistoryErrorLogs, IHistoryState } from './types';

const initialState: IHistoryState = {
  errorsList: [],
  isLoading: false,
  currentProcessId: '',
};

export const uploadHistorySlice = createSlice({
  name: 'uploadHistorySlice',
  initialState,
  reducers: {
    setErrorsList: (state, action: PayloadAction<IHistoryErrorLogs[]>) => {
      state.errorsList = action.payload;
    },
    setIsLoding: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setCurrentProcessId: (state, action: PayloadAction<string>) => {
      state.currentProcessId = action.payload;
    },
  },
});

export const { setErrorsList, setIsLoding, setCurrentProcessId } = uploadHistorySlice.actions;

export default uploadHistorySlice.reducer;
