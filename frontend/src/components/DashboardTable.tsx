import { useState } from 'react';
import {
  createColumnHelper,
  flexRender,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getGroupedRowModel,
  getExpandedRowModel,
  getPaginationRowModel,
  SortingState
} from '@tanstack/react-table';
import { Button } from 'react-bootstrap';
import { HiOutlineSwitchVertical } from "react-icons/hi";

export interface Column<T> {
  accessorKey: keyof T;
  header: string;
  cell?: (info: any) => JSX.Element;
  enableSorting?: boolean;
}

interface DashboardTableProps<T> {
  tableData: T[];
  allColumns: Column<T>[];
  enableSort: boolean;
  totalPages: number;
  currentPage: number;
  fetchData: (page: number) => void;
}

const DashboardTable = <T extends object> ({ tableData, allColumns, enableSort, totalPages, currentPage, fetchData }: DashboardTableProps<T>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const columnHelper = createColumnHelper<T>();

  const columns = allColumns.map((col) =>
    columnHelper.accessor((row: any) => row[col.accessorKey], {
      id: col.accessorKey as string,
      header: () => (
        <span className='d-flex align-items-center'>
          <b>{col.header}</b>
        </span>
      ),
      cell: col.cell,
      enableSorting: enableSort && col.enableSorting,
    })
  );
  

  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),

    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
        <table className="table table-hover mt-2">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    <div
                      {...{
                        className: header.column.getCanSort()
                        ? "d-flex align-items-center cursor-pointer select-none text-dark hover:text-primary"
                        : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                      >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getCanSort() && (
                        <HiOutlineSwitchVertical style={{ cursor: 'pointer' }} />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, index) => (
              <tr>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-between mt-3">
        <Button
          variant="outline-dark"
          disabled={currentPage === 0}
          onClick={() => fetchData(currentPage - 1)}
        >
          Previous
        </Button>
        
        <span>Page {currentPage + 1} of {totalPages}</span>

        <Button
          variant="outline-dark"
          disabled={currentPage + 1 >= totalPages}
          onClick={() => fetchData(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </>
  );
}

export default DashboardTable;