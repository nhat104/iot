import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Checkbox, IconButton, Paper, Table as MuiTable, Button, ButtonGroup } from '@mui/material';
import { TableBody, TableCell, TableContainer, TableHead, TableRow, Popover } from '@mui/material';
import { useState } from 'react';

export default function Table({ table, checkbox, actions }) {
  const [selected, setSelected] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [rowId, setRowId] = useState('');

  const handleMore = (event, id) => {
    setRowId(id);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setRowId('');
    setAnchorEl(null);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = table.body.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex >= 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;
  return (
    <TableContainer component={Paper}>
      <MuiTable sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow sx={{ '& .MuiTableCell-root': { fontWeight: 600 } }}>
            {checkbox && (
              <TableCell padding='checkbox'>
                <Checkbox
                  color='primary'
                  indeterminate={selected.length > 0 && selected.length < table.body.length}
                  checked={table.body.length > 0 && selected.length === table.body.length}
                  onChange={handleSelectAllClick}
                />
              </TableCell>
            )}
            {table.head.map((cel, index) => (
              <TableCell key={index}>{cel}</TableCell>
            ))}
            {actions && !actions[0].refuse && <TableCell></TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {table.body.length === 0 && (
            <TableRow>
              <TableCell colSpan={table.head.length + 1} align='center'>
                No data
              </TableCell>
            </TableRow>
          )}
          {table.body.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {checkbox && (
                <TableCell onClick={() => handleClick(row.id)} key={row.id} padding='checkbox'>
                  <Checkbox color='primary' checked={isSelected(row.id)} />
                </TableCell>
              )}
              {Object.values(row).map((cell, cellIndex) => (
                <TableCell id={cellIndex} key={cellIndex}>
                  {cell}
                </TableCell>
              ))}
              {actions && !actions[0].refuse && (
                <TableCell padding='checkbox'>
                  <IconButton onClick={(event) => handleMore(event, row.id)}>
                    <MoreHorizIcon />
                  </IconButton>
                  <Popover
                    sx={{ height: '200px', '& .MuiPopover-paper': { boxShadow: 'none' } }}
                    open={rowId === row.id}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  >
                    <ButtonGroup orientation='vertical'>
                      {actions.map((action, index) => (
                        <Button
                          onClick={() => {
                            handleClose();
                            action.click(row);
                          }}
                          key={index}
                        >
                          {action.name}
                        </Button>
                      ))}
                    </ButtonGroup>
                  </Popover>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
}
