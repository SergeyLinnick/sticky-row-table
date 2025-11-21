import { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  restrictToVerticalAxis,
  restrictToParentElement,
} from "@dnd-kit/modifiers";
import { DraggableTableRow } from "./DraggableTableRow";

export interface FieldData {
  id: string;
  label: string;
  type: string;
  defaultValue: string;
  isArchived?: boolean;
}

interface DraggableTableProps {
  columns: ColumnDef<FieldData>[];
  data: FieldData[];
  onDataChange?: (data: FieldData[]) => void;
}

export function DraggableTable({ columns, data, onDataChange }: DraggableTableProps) {
  const [tableData, setTableData] = useState(data);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Separate archived and non-archived items
  const nonArchivedData = tableData.filter((item) => !item.isArchived);
  const archivedData = tableData.filter((item) => item.isArchived);

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id,
  });

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const activeIndex = nonArchivedData.findIndex((item) => item.id === active.id);
      const overIndex = nonArchivedData.findIndex((item) => item.id === over.id);

      if (activeIndex !== -1 && overIndex !== -1) {
        const newOrder = arrayMove(nonArchivedData, activeIndex, overIndex);
        const newData = [...newOrder, ...archivedData];
        setTableData(newData);
        onDataChange?.(newData);
      }
    }
  }

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis, restrictToParentElement]}
      >
        <table className="w-full">
          <thead className="bg-table-header border-b border-border">
            <tr>
              <th className="py-3 px-4 w-12"></th>
              {table.getHeaderGroups()[0].headers.map((header) => (
                <th
                  key={header.id}
                  className="py-3 px-4 text-left text-sm font-medium text-muted-foreground"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
              <th className="py-3 px-4 w-12"></th>
            </tr>
          </thead>
          <tbody>
            <SortableContext
              items={nonArchivedData.map((item) => item.id)}
              strategy={verticalListSortingStrategy}
            >
              {table.getRowModel().rows.map((row) => {
                const isArchived = row.original.isArchived;
                return (
                  <DraggableTableRow
                    key={row.id}
                    row={row}
                    isArchived={isArchived}
                  />
                );
              })}
            </SortableContext>
          </tbody>
        </table>
      </DndContext>
    </div>
  );
}
