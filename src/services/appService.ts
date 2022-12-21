/* eslint-disable @typescript-eslint/no-explicit-any */
/********************************************************************************
 * Copyright (c) 2021,2022 T-Systems International GmbH
 * Copyright (c) 2021,2022 Contributors to the CatenaX (ng) GitHub Organisation
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

import HttpService from './HttpService';
class AppService extends HttpService {
  public constructor() {
    super({});
  }

  private static classInstance?: AppService;

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new AppService();
    }
    return this.classInstance;
  }

  public async getUserPermissions() {
    const res = await this.instance({
      method: 'GET',
      url: '/user/role/permissions',
    });
    return res;
  }

  public async downloadCSV(submodel: string, type: string) {
    const res = await this.instance({
      method: 'GET',
      url: `/submodels/csvfile/${submodel}?type=${type}`,
    });
    return res;
  }

  public async downloadHistory(submodel: string, processId: string) {
    const res = await this.instance({
      method: 'GET',
      url: `/${submodel}/download/${processId}/csv`,
    });
    return res;
  }
}

export default AppService;
