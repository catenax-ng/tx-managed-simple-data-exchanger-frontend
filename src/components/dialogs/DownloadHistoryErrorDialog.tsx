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

import { Box } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogHeader, Table } from 'cx-portal-shared-components';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { IDefaultObject } from '../../models/Common';

interface IDownloadHistoryErrorDialog {
  open: boolean;
  handleDialogClose: () => void;
  errorTableData: IDefaultObject[];
}

const DownloadHistoryErrorDialog: React.FC<IDownloadHistoryErrorDialog> = ({
  open = false,
  handleDialogClose,
  errorTableData,
}) => {
  const { t } = useTranslation();
  const [page, setPage] = useState<number>(0);
  const [pageSize] = useState<number>(10);

  const handleColumnValue = (value: string) => (value.length ? 'yes' : 'no');
  const columns: GridColDef[] = [
    {
      field: 'offerId',
      headerName: 'Offer Id',
      flex: 1.5,
      valueFormatter: ({ value }) => handleColumnValue(value),
      sortable: false,
    },
    {
      field: 'assetId',
      headerName: 'Asset Id',
      flex: 1.5,
      valueFormatter: ({ value }) => handleColumnValue(value),
      sortable: false,
    },
    {
      field: 'policyId',
      headerName: 'Policy Id',
      flex: 1.5,
      valueFormatter: ({ value }) => handleColumnValue(value),
      sortable: false,
    },
    {
      field: 'agreementId',
      headerName: 'Agreement Id',
      flex: 1.5,
      valueFormatter: ({ value }) => handleColumnValue(value),
      sortable: false,
    },
    {
      field: 'expirationDate',
      headerName: 'Expiry Date',
      flex: 1.5,
      valueFormatter: ({ value }) => handleColumnValue(value),
      sortable: false,
    },
    {
      field: 'transferProcessId',
      headerName: 'Transfer Process Id',
      flex: 1.5,
      valueFormatter: ({ value }) => handleColumnValue(value),
      sortable: false,
    },
    {
      field: 'downloadErrorMsg',
      sortable: false,
      headerName: 'Error',
      flex: 5,
      align: 'center',
      headerAlign: 'center',
      valueFormatter: ({ value }) => (value.length ? value : 'No Errors'),
    },
  ];

  return (
    <Dialog
      open={open}
      additionalModalRootStyles={{
        width: '75%',
        maxHeight: '90%',
      }}
    >
      <DialogHeader
        closeWithIcon
        onCloseWithIcon={handleDialogClose}
        title={t('content.offerDownloadHistory.detailDialogTitle')}
      />
      <DialogContent dividers sx={{ py: 3 }}>
        <Box sx={{ mt: 2 }}>
          <Table
            title={''}
            getRowId={row => row.offerId}
            disableColumnMenu
            disableColumnSelector
            disableDensitySelector
            disableSelectionOnClick
            columns={columns}
            rows={errorTableData}
            pageSize={pageSize}
            page={page}
            getRowHeight={() => 'auto'}
            onPageChange={newPage => setPage(newPage)}
            rowsPerPageOptions={[10, 15, 20, 100]}
            sx={{
              '& .MuiDataGrid-columnHeaderTitle, & .MuiDataGrid-cell': {
                textOverflow: 'clip',
                whiteSpace: 'break-spaces !important',
                maxHeight: 'none !important',
                lineHeight: 1.4,
              },
              '& .MuiDataGrid-columnHeader': {
                padding: '0 10px',
              },
              '& .MuiDataGrid-cell': {
                padding: '5px 10px',
              },
              '& .MuiBox-root': { display: 'none' },
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleDialogClose}>
          {t('button.close')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DownloadHistoryErrorDialog;
