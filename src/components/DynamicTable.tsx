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

import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Box, Card, CardContent } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { DataGrid, gridClasses, GridSelectionModel } from '@mui/x-data-grid';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogHeader,
  IconButton,
  Input,
  Typography,
} from 'cx-portal-shared-components';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { AssemblyPartRelationship } from '../models/AssemblyPartRelationship';
import { DynamicTableColumn } from '../models/DynamicTableColumn';
import { SerialPartTypization } from '../models/SerialPartTypization';
import { Batch } from '../models/Batch';
import { useAppSelector } from '../store/store';
import { Status } from '../models/ProcessReport';

export default function DynamicTable({
  columns = [],
  submitUrl = '/aspect',
  validateData,
}: {
  columns: DynamicTableColumn[];
  submitUrl: string;
  validateData: (
    _value: SerialPartTypization[] | Batch[] | AssemblyPartRelationship[],
    _submitUrl: string,
    _type: string,
  ) => void;
}) {
  const [rows, setRows] = React.useState([]);
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);
  const [id, setId] = React.useState(0);
  const { currentUploadData } = useAppSelector(state => state.providerSlice);

  useEffect(() => {
    if (currentUploadData.status === Status.completed) {
      setRows([]);
    }
  }, [currentUploadData]);

  // styles
  const ODD_OPACITY = 0.2;

  const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
    [`& .${gridClasses.row}.even`]: {
      backgroundColor: theme.palette.grey[200],
      '&:hover, &.Mui-hovered': {
        backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
        '@media (hover: none)': {
          backgroundColor: 'transparent',
        },
      },
      '&.Mui-selected': {
        backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY + theme.palette.action.selectedOpacity),
        '&:hover, &.Mui-hovered': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity,
          ),
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY + theme.palette.action.selectedOpacity),
          },
        },
      },
    },
  }));

  // end styles

  const generateUUID = (rowId: number, field: string) => {
    const auxRows = JSON.parse(JSON.stringify(rows));

    for (const r of auxRows) {
      if (r.id === rowId) {
        r[field] = `urn:uuid:${uuidv4()}`;
      }
    }

    setRows(auxRows);
  };

  const getRenderCell = (field: string, headerName: string, headerAlign: 'left' | 'right' | 'center') => {
    return {
      field,
      headerName,
      editable: true,
      sortable: false,
      flex: 1,
      headerAlign,
      renderCell: (params: { id: number; value: string }) => {
        return (
          <Typography variant="inherit" noWrap>
            {params.value === '' && (
              <IconButton onClick={() => generateUUID(params.id, field)} title="Generate UUID">
                <AutoFixHighIcon sx={{ fontSize: 20 }} />
              </IconButton>
            )}
            {params.value !== '' && params.value}
          </Typography>
        );
      },
    };
  };

  // add button to generate uuid
  const findIndex = columns.findIndex(c => c.field === 'uuid');
  if (findIndex !== -1) {
    columns[findIndex] = getRenderCell('uuid', 'UUID', 'center');
  }
  const [addRowCount, setaddRowCount] = useState<number>();
  const [dialogOpen, setdialogOpen] = useState<boolean>(false);
  const showAddDialog = () => {
    setdialogOpen(prev => !prev);
  };
  const addRows = () => {
    const newRows: SerialPartTypization[] | Batch[] | AssemblyPartRelationship[] = [];
    for (let i = 0; i < addRowCount; i++) {
      // eslint-disable-next-line
      const newRow: any = { id: id + (i + 1) };
      for (const c of columns) {
        newRow[c.field] = '';
      }
      newRows.push(newRow);
    }
    setRows(prevRows => prevRows.concat(newRows));
    setId(id + addRowCount);
    showAddDialog();
  };

  const onSelectionChange = (newSelectionModel: GridSelectionModel) => {
    setSelectionModel(newSelectionModel);
  };

  const deleteSelectedRows = () => {
    const auxRows = JSON.parse(JSON.stringify(rows));

    if (selectionModel.length > 0) {
      for (const s of selectionModel) {
        // eslint-disable-next-line
        const index = auxRows.findIndex((a: any) => a.id === s);
        if (index !== -1) {
          auxRows.splice(index, 1);
        }
      }
    }

    setRows(auxRows);
  };

  // eslint-disable-next-line
  const onCellEditCommit = (event: any) => {
    const auxRows = JSON.parse(JSON.stringify(rows));
    const index = rows.findIndex(r => r.id === event.id);
    if (index !== -1) {
      if (auxRows[index].hasOwnProperty(event.field)) {
        const f = event.field as keyof SerialPartTypization | keyof Batch | keyof AssemblyPartRelationship;
        auxRows[index][f] =
          f === 'uuid' && event.value !== '' && !event.value.startsWith('urn:uuid:')
            ? `urn:uuid:${event.value}`
            : event.value;
      }
    }

    setRows(auxRows);
  };

  return (
    <Box style={{ width: '100%', height: 80 + 6 * 52 + 'px' }}>
      <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box textAlign="start">
          <Button variant="outlined" onClick={showAddDialog} sx={{ mb: 2 }} size="small">
            Add rows(s)
          </Button>
          &nbsp;
          <Button variant="outlined" onClick={deleteSelectedRows} sx={{ mb: 2 }} size="small">
            Delete row(s)
          </Button>
        </Box>
        <Box textAlign="end">
          <Button variant="contained" onClick={() => validateData(rows, submitUrl, 'json')} sx={{ mb: 2 }} size="small">
            Next Step - Configure Policies
          </Button>
        </Box>
      </Box>
      <StripedDataGrid
        getRowId={row => row.id}
        autoHeight={false}
        columns={columns}
        rows={rows}
        headerHeight={60}
        disableColumnMenu={true}
        hideFooter={true}
        checkboxSelection={true}
        disableSelectionOnClick={true}
        onSelectionModelChange={onSelectionChange}
        selectionModel={selectionModel}
        onCellEditCommit={onCellEditCommit}
        getRowClassName={params => (params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd')}
        sx={{
          '& .MuiDataGrid-columnHeaderTitle': {
            textOverflow: 'clip',
            whiteSpace: 'break-spaces',
            lineHeight: 1.5,
            textAlign: 'center',
          },
          '& .MuiDataGrid-columnHeader': {
            padding: '0 10px',
          },
          '& .MuiDataGrid-columnHeaderCheckbox': {
            height: 'auto !important',
          },
        }}
      />
      &nbsp;
      <Card>
        <CardContent>
          <Typography variant="h5">Rules</Typography>
          <Typography variant="body2">&bull; Fields with * are required.</Typography>
          <Typography variant="body2">
            &bull; Optional value(s) and Optional key(s) must either be empty or both filled.
          </Typography>
        </CardContent>
      </Card>
      {/* Add rows dialog */}
      <Dialog open={dialogOpen}>
        <DialogHeader title="Add rows" />
        <DialogContent>
          <Input
            label="Insert number of rows"
            placeholder="Enter a number"
            onChange={e => setaddRowCount(Number(e.target.value))}
            type="number"
            error={0 > addRowCount}
            helperText="Please enter number of rows above 0"
            inputProps={{ min: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={showAddDialog}>
            Cancel
          </Button>
          <Button variant="contained" onClick={addRows}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
