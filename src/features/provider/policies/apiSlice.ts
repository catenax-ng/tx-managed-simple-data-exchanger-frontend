/********************************************************************************
 * Copyright (c) 2021,2022,2023 T-Systems International GmbH
 * Copyright (c) 2022,2023 Contributors to the Eclipse Foundation
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

import { apiSlice } from '../../app/apiSlice';

export const policiesApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getPolicies: builder.query({
      query: params => {
        return {
          url: '/policy',
          params,
        };
      },
      providesTags: ['Policies'],
    }),
    createPolicy: builder.mutation({
      query: body => {
        return {
          url: '/policy',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Policies'],
    }),
    deletePolicy: builder.mutation({
      query: uuid => {
        return {
          url: `/policy/${uuid}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Policies'],
    }),
    getSinglePolicy: builder.query({
      query: uuid => {
        return {
          url: `/policy/${uuid}`,
        };
      },
    }),
    validateBpn: builder.mutation({
      query: bpn => {
        return {
          url: `/unified-bpn-validation/${bpn}`,
        };
      },
    }),
  }),
});

export const {
  useValidateBpnMutation,
  useGetPoliciesQuery,
  useGetSinglePolicyQuery,
  useCreatePolicyMutation,
  useDeletePolicyMutation,
} = policiesApiSlice;
