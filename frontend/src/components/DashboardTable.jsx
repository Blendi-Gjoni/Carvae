import { useState, useEffect, Suspense } from 'react';
import {
  createColumnHelper,
  flexRender,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getGroupedRowModel,
  getExpandedRowModel,
  getPaginationRowModel
} from '@tanstack/react-table';
import { HiOutlineSwitchVertical } from "react-icons/hi";
import { RiseLoader } from 'react-spinners';

const DashboardTable = ({ tableData, allColumns, enableSort }) => {
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const columnHelper = createColumnHelper();

  const columns = [
    ...allColumns.map((col) =>
      columnHelper.accessor(col.accessorKey, {
        header: () => (
          <span className='d-flex align-items-center'>
            <b>{col.header}</b>
          </span>
        ),
        cell: col.cell,
        enableSorting: enableSort && col.enableSorting,
      })
    ),
  ];

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

  const DelayedSuspense = ({ children }) => {
    const [showComponent, setShowComponent] = useState(false);

    useEffect(() => {
      const timeout = setTimeout(() => setShowComponent(true), 500);
      return () => clearTimeout(timeout);
    }, []);

    return showComponent ? children : <div className='d-flex justify-content-center my-5'><RiseLoader color="#8f8f8f" size={10} /></div>
  };

  return (
    <>
      <DelayedSuspense>
        <Suspense>
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
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
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
        </Suspense>
      </DelayedSuspense>
    </>
  );
}

export default DashboardTable;