/********************************************************************************
 * Copyright (c) 2021,2022 FEV Consulting GmbH
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

import { Refresh } from '@mui/icons-material';
import { Box, Grid } from '@mui/material';
import { Button, Typography } from 'cx-portal-shared-components';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import StickyHeadTable from '../components/StickyHeadTable';
import { useGetHistoryQuery } from '../features/provider/history/apiSlice';
import UploadHistoryNew from './UploadHistoryNew';

export default function UploadHistory() {
  const { t } = useTranslation();

  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(0);

  const { isSuccess, data, refetch } = useGetHistoryQuery({ page: page, pageSize: rowsPerPage });

  return (
    <>
      {isSuccess ? (
        <Box sx={{ flex: 1, p: 4 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={6}>
              <Typography variant="h3">{t('pages.uploadHistory')}</Typography>
            </Grid>
            <Grid item xs={6} textAlign="right">
              <Button size="small" variant="contained" onClick={refetch}>
                <Refresh />
                &nbsp; {t('button.refresh')}
              </Button>
            </Grid>
          </Grid>
          <Box sx={{ mt: 4 }}>
            <StickyHeadTable
              rows={data.items}
              page={page}
              rowsPerPage={rowsPerPage}
              totalElements={data.totalItems}
              setPage={setPage}
              setRowsPerPage={setRowsPerPage}
            />
            <UploadHistoryNew />
          </Box>
        </Box>
      ) : null}
    </>
  );
}
