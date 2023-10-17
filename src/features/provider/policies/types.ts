/********************************************************************************
 * Copyright (c) 2021,2022,2023 T-Systems International GmbH
 * Copyright (c) 2022,2023 Contributors to the Eclipse Foundation
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

import { ISelectList } from '../../../models/Common';
import { PolicyModel } from '../../../models/RecurringUpload.models';

export interface IAccessPolicyState {
  uploadUrl: string;
  uploadData: unknown;
  uploadType: string;
  openDialog: boolean;
  accessType: string;
  bpnList: Array<string>;
  inputBpn: string;
  companyBpn: string;
  duration: string;
  purpose: string;
  role: string;
  custom: string;
  durationValue: string;
  purposeValue: ISelectList;
  roleValue: string;
  customValue: string;
  durationUnit: ISelectList;
  showValidationError: boolean;
  policyData: PolicyModel;
  policyDialog: boolean;
  policyDialogType: string;
}
