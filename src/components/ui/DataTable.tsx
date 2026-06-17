import {
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  MoreVertical,
  Search,
  Settings2,
} from "lucide-react";
import {
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

import { cn } from "@/utils/cn";

import { Button } from "./Button";

export type DataTableColumn<TData> = {
  id: string;
  header: ReactNode;
  cell: (row: TData) => ReactNode;
  searchValue?: (row: TData) => string;
  enableColumnSearch?: boolean;
  canHide?: boolean;
  className?: string;
  headerClassName?: string;
};

export type DataTableRowAction<TData> = {
  id: string;
  label: string;
  icon?: ReactNode;
  onClick: (row: TData) => void;
  variant?: "default" | "danger";
};

type RowId = string | number;

type DataTableProps<TData> = {
  data: TData[];
  columns: DataTableColumn<TData>[];
  getRowId: (row: TData, index: number) => RowId;
  title?: string;
  isLoading?: boolean;
  emptyMessage?: string;
  renderInCard?: boolean;
  density?: "normal" | "dense";
  enablePagination?: boolean;
  pageSizeOptions?: number[];
  initialPageSize?: number;
  enableRowSelection?: boolean;
  enableGlobalSearch?: boolean;
  enableColumnFilters?: boolean;
  enableColumnVisibility?: boolean;
  globalSearchPlaceholder?: string;
  toolbarActions?: ReactNode;
  rowActions?: (row: TData) => ReactNode;
  rowActionItems?: (row: TData) => DataTableRowAction<TData>[];
};

type DataTableCheckboxProps = {
  checked: boolean;
  onChange: () => void;
  ariaLabel: string;
  disabled?: boolean;
};

function DataTableCheckbox({
  checked,
  onChange,
  ariaLabel,
  disabled = false,
}: DataTableCheckboxProps) {
  return (
    <label className="group inline-flex h-5 w-5 items-center justify-center">
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        aria-label={ariaLabel}
      />
      <span
        className={cn(
          "flex h-5 w-5 items-center justify-center rounded-md border-2 transition-colors",
          "group-focus-within:ring-2 group-focus-within:ring-brand-500/35 group-focus-within:ring-offset-2 group-focus-within:ring-offset-surface-50 dark:group-focus-within:ring-offset-surface-900",
          checked
            ? "border-brand-600 bg-brand-600 text-white dark:border-brand-500 dark:bg-brand-500"
            : "border-surface-800 bg-surface-50 text-transparent group-hover:border-brand-500 group-hover:bg-surface-100 dark:border-surface-100 dark:bg-surface-800 dark:group-hover:border-brand-500 dark:group-hover:bg-surface-900",
          disabled && "cursor-not-allowed opacity-50",
        )}
      >
        <Check className="h-3 w-3 stroke-[3]" />
      </span>
    </label>
  );
}

type DataTableRowActionsProps<TData> = {
  row: TData;
  rowId: RowId;
  actions: DataTableRowAction<TData>[];
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

function DataTableRowActions<TData>({
  row,
  rowId,
  actions,
  isOpen,
  onOpenChange,
}: DataTableRowActionsProps<TData>) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (!isOpen) return;

    const updatePosition = () => {
      const rect = triggerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const menuWidth = 176;
      setMenuPosition({
        top: rect.bottom + 6,
        left: Math.max(8, rect.right - menuWidth),
      });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [isOpen]);

  if (actions.length === 0) return null;

  if (actions.length === 1) {
    const [action] = actions;

    return (
      <Button
        variant={action.variant === "danger" ? "danger" : "ghost"}
        size="icon"
        onClick={() => action.onClick(row)}
        aria-label={action.label}
        title={action.label}
      >
        {action.icon ?? <span className="text-xs">{action.label}</span>}
      </Button>
    );
  }

  return (
    <div className="inline-flex justify-end">
      <Button
        ref={triggerRef}
        variant="ghost"
        size="icon"
        onClick={() => onOpenChange(!isOpen)}
        aria-label={`Open actions for row ${rowId}`}
        title="Actions"
      >
        <MoreVertical className="h-4 w-4" />
      </Button>

      {isOpen &&
        createPortal(
        <div
          className="fixed z-50 w-44 rounded-md border border-surface-200 bg-white p-1 text-surface-900 shadow-hover dark:border-surface-700 dark:bg-surface-900 dark:text-surface-100"
          style={{ top: menuPosition.top, left: menuPosition.left }}
        >
          {actions.map((action) => (
            <button
              key={action.id}
              type="button"
              onClick={() => {
                action.onClick(row);
                onOpenChange(false);
              }}
              className={cn(
                "flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors",
                action.variant === "danger"
                  ? "text-error-600 hover:bg-error-50 dark:text-error-500 dark:hover:bg-error-500/10"
                  : "text-surface-700 hover:bg-surface-100 dark:text-surface-200 dark:hover:bg-surface-800/70",
              )}
            >
              {action.icon}
              <span className="truncate">{action.label}</span>
            </button>
          ))}
        </div>,
        document.body,
      )}
    </div>
  );
}

export function DataTable<TData>({
  data,
  columns,
  getRowId,
  title,
  isLoading = false,
  emptyMessage = "No records found.",
  renderInCard = true,
  density = "normal",
  enablePagination = false,
  pageSizeOptions = [10, 25, 50],
  initialPageSize = 10,
  enableRowSelection = false,
  enableGlobalSearch = false,
  enableColumnFilters = false,
  enableColumnVisibility = false,
  globalSearchPlaceholder = "Search",
  toolbarActions,
  rowActions,
  rowActionItems,
}: DataTableProps<TData>) {
  const [globalSearch, setGlobalSearch] = useState("");
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>(
    {},
  );
  const [hiddenColumnIds, setHiddenColumnIds] = useState<Set<string>>(
    () => new Set(),
  );
  const [isColumnMenuOpen, setIsColumnMenuOpen] = useState(false);
  const [openActionRowId, setOpenActionRowId] = useState<RowId | null>(null);
  const [selectedRowIds, setSelectedRowIds] = useState<Set<RowId>>(
    () => new Set(),
  );
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const visibleColumns = useMemo(
    () => columns.filter((column) => !hiddenColumnIds.has(column.id)),
    [columns, hiddenColumnIds],
  );

  const searchableColumns = useMemo(
    () => columns.filter((column) => column.searchValue),
    [columns],
  );

  const filteredData = useMemo(() => {
    const normalizedGlobalSearch = globalSearch.trim().toLowerCase();

    return data.filter((row) => {
      const matchesGlobalSearch =
        !normalizedGlobalSearch ||
        searchableColumns.some((column) =>
          column
            .searchValue?.(row)
            .toLowerCase()
            .includes(normalizedGlobalSearch),
        );

      if (!matchesGlobalSearch) return false;

      return columns.every((column) => {
        const filterValue = columnFilters[column.id]?.trim().toLowerCase();
        if (!filterValue) return true;

        return column
          .searchValue?.(row)
          .toLowerCase()
          .includes(filterValue);
      });
    });
  }, [columnFilters, columns, data, globalSearch, searchableColumns]);

  const pageCount = Math.max(1, Math.ceil(filteredData.length / pageSize));

  const paginatedData = useMemo(() => {
    if (!enablePagination) return filteredData;

    const start = (page - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [enablePagination, filteredData, page, pageSize]);

  const visibleRowIds = useMemo(
    () => paginatedData.map((row, index) => getRowId(row, index)),
    [getRowId, paginatedData],
  );

  const isAllVisibleSelected =
    visibleRowIds.length > 0 &&
    visibleRowIds.every((rowId) => selectedRowIds.has(rowId));

  useEffect(() => {
    setPage(1);
  }, [globalSearch, columnFilters, pageSize]);

  useEffect(() => {
    setPage((currentPage) => Math.min(currentPage, pageCount));
  }, [pageCount]);

  const toggleColumn = (columnId: string) => {
    setHiddenColumnIds((current) => {
      const next = new Set(current);
      if (next.has(columnId)) {
        next.delete(columnId);
      } else {
        next.add(columnId);
      }

      return next;
    });
  };

  const toggleRow = (rowId: RowId) => {
    setSelectedRowIds((current) => {
      const next = new Set(current);
      if (next.has(rowId)) {
        next.delete(rowId);
      } else {
        next.add(rowId);
      }

      return next;
    });
  };

  const toggleAllVisibleRows = () => {
    setSelectedRowIds((current) => {
      const next = new Set(current);

      if (isAllVisibleSelected) {
        visibleRowIds.forEach((rowId) => next.delete(rowId));
      } else {
        visibleRowIds.forEach((rowId) => next.add(rowId));
      }

      return next;
    });
  };

  const rowPadding = density === "dense" ? "px-4 py-2.5" : "px-4 py-3.5";
  const hasRowActions = Boolean(rowActions || rowActionItems);
  const toolbarVisible =
    title ||
    enableGlobalSearch ||
    enableColumnVisibility ||
    toolbarActions;

  return (
    <div
      className={cn(
        "overflow-hidden",
        renderInCard && "rounded-md bg-surface-50 shadow-soft dark:bg-surface-800",
      )}
    >
      {toolbarVisible && (
        <div className="flex flex-col gap-3 border-b border-surface-200 p-4 dark:border-surface-900 md:flex-row md:items-center md:justify-between">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            {title && (
              <h2 className="shrink-0 text-sm font-semibold text-surface-900 dark:text-surface-50">
                {title}
              </h2>
            )}

            {enableGlobalSearch && (
              <label className="relative w-full max-w-xs">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-surface-500" />
                <input
                  value={globalSearch}
                  onChange={(event) => setGlobalSearch(event.target.value)}
                  placeholder={globalSearchPlaceholder}
                  className="h-10 w-full rounded-md border border-surface-200 bg-white pl-9 pr-3 text-sm text-surface-900 outline-none transition-colors placeholder:text-surface-500 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-50"
                />
              </label>
            )}
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-2">
            {enableColumnVisibility && (
              <div className="relative">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsColumnMenuOpen((isOpen) => !isOpen)}
                  aria-label="Toggle column visibility"
                  title="Toggle column visibility"
                >
                  <Settings2 className="h-4 w-4" />
                </Button>

                {isColumnMenuOpen && (
                  <div className="absolute right-0 z-20 mt-2 w-56 rounded-md border border-surface-200 bg-white p-2 shadow-hover dark:border-surface-700 dark:bg-surface-900">
                    {columns.map((column) => (
                      <label
                        key={column.id}
                        className={cn(
                          "flex items-center gap-2 rounded-md px-2 py-2 text-sm text-surface-700 hover:bg-surface-100 dark:text-surface-300 dark:hover:bg-surface-800",
                          column.canHide === false && "opacity-60",
                        )}
                      >
                        <DataTableCheckbox
                          checked={!hiddenColumnIds.has(column.id)}
                          disabled={column.canHide === false}
                          onChange={() => toggleColumn(column.id)}
                          ariaLabel={`Toggle ${String(column.header)} column`}
                        />
                        <span className="truncate">{column.header}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            )}

            {toolbarActions}
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full table-fixed text-left">
          <thead className="bg-surface-100 text-xs font-semibold uppercase text-surface-700 dark:bg-surface-900 dark:text-surface-400">
            <tr>
              {enableRowSelection && (
                <th className="w-12 px-4 py-3">
                  <DataTableCheckbox
                    checked={isAllVisibleSelected}
                    onChange={toggleAllVisibleRows}
                    ariaLabel="Select all rows"
                  />
                </th>
              )}

              {visibleColumns.map((column) => (
                <th
                  key={column.id}
                  className={cn("px-4 py-3", column.headerClassName)}
                >
                  <span className="inline-flex items-center gap-1">
                    {column.header}
                    <ChevronsUpDown className="h-3.5 w-3.5 text-surface-400" />
                  </span>
                </th>
              ))}

              {hasRowActions && <th className="w-28 px-4 py-3 text-right">Actions</th>}
            </tr>

            {enableColumnFilters && (
              <tr className="border-t border-surface-200 bg-surface-50 normal-case dark:border-surface-900 dark:bg-surface-800">
                {enableRowSelection && <th className="px-4 py-2" />}

                {visibleColumns.map((column) => (
                  <th key={column.id} className="px-4 py-2">
                    {column.enableColumnSearch && column.searchValue && (
                      <input
                        value={columnFilters[column.id] ?? ""}
                        onChange={(event) =>
                          setColumnFilters((current) => ({
                            ...current,
                            [column.id]: event.target.value,
                          }))
                        }
                        placeholder={`Search ${String(column.header)}`}
                        className="h-8 w-full rounded-md border border-surface-200 bg-white px-2 text-xs font-normal text-surface-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-50"
                      />
                    )}
                  </th>
                ))}

                {hasRowActions && <th className="px-4 py-2" />}
              </tr>
            )}
          </thead>

          <tbody className="divide-y divide-surface-200 text-sm dark:divide-surface-900">
            {isLoading ? (
              <tr>
                <td
                  colSpan={
                    visibleColumns.length +
                    (enableRowSelection ? 1 : 0) +
                    (hasRowActions ? 1 : 0)
                  }
                  className="px-4 py-10 text-center text-surface-500 dark:text-surface-400"
                >
                  Loading records...
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={
                    visibleColumns.length +
                    (enableRowSelection ? 1 : 0) +
                    (hasRowActions ? 1 : 0)
                  }
                  className="px-4 py-10 text-center text-surface-500 dark:text-surface-400"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginatedData.map((row, index) => {
                const rowId = getRowId(row, index);
                const isSelected = selectedRowIds.has(rowId);

                return (
                  <tr
                    key={rowId}
                    className={cn(
                      "bg-surface-50 transition-colors hover:bg-surface-100/70 dark:bg-surface-800 dark:hover:bg-surface-900/35",
                      isSelected &&
                        "bg-brand-50/70 dark:bg-brand-500/8 dark:hover:bg-brand-500/12",
                    )}
                  >
                    {enableRowSelection && (
                      <td className="px-4 py-3">
                        <DataTableCheckbox
                          checked={isSelected}
                          onChange={() => toggleRow(rowId)}
                          ariaLabel={`Select row ${rowId}`}
                        />
                      </td>
                    )}

                    {visibleColumns.map((column) => (
                      <td
                        key={column.id}
                        className={cn(
                          rowPadding,
                          "align-middle text-surface-600 dark:text-surface-300",
                          column.className,
                        )}
                      >
                        {column.cell(row)}
                      </td>
                    ))}

                    {hasRowActions && (
                      <td className={cn(rowPadding, "text-right")}>
                        {rowActions
                          ? rowActions(row)
                          : (
                              <DataTableRowActions
                                row={row}
                                rowId={rowId}
                                actions={rowActionItems?.(row) ?? []}
                                isOpen={openActionRowId === rowId}
                                onOpenChange={(isOpen) =>
                                  setOpenActionRowId(isOpen ? rowId : null)
                                }
                              />
                            )}
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {enablePagination && (
        <div className="overflow-x-auto border-t border-surface-200 dark:border-surface-900">
        <div className="flex min-w-max items-center justify-end gap-3 px-3 py-2 text-xs text-surface-600 dark:text-surface-300">
          <label className="flex shrink-0 items-center gap-1.5 whitespace-nowrap">
            <span>Rows per page:</span>
            <select
              value={pageSize}
              onChange={(event) => setPageSize(Number(event.target.value))}
              className="h-8 rounded-md border border-surface-200 bg-white px-2 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-surface-700 dark:bg-surface-900"
            >
              {pageSizeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <span className="min-w-20 shrink-0 text-right whitespace-nowrap">
            {filteredData.length === 0
              ? "0 of 0"
              : `${(page - 1) * pageSize + 1}-${Math.min(
                  page * pageSize,
                  filteredData.length,
                )} of ${filteredData.length}`}
          </span>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setPage((currentPage) => currentPage - 1)}
              disabled={page === 1}
              className="h-8 w-8"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setPage((currentPage) => currentPage + 1)}
              disabled={page === pageCount}
              className="h-8 w-8"
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        </div>
      )}
    </div>
  );
}
