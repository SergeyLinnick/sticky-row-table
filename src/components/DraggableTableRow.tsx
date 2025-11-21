import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Edit2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Row, flexRender } from "@tanstack/react-table";

interface DraggableTableRowProps<TData> {
  row: Row<TData>;
  isArchived?: boolean;
}

export function DraggableTableRow<TData>({ row, isArchived }: DraggableTableRowProps<TData>) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: row.id,
    disabled: isArchived,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className="border-b border-border hover:bg-table-row-hover transition-colors"
    >
      <td className="py-3 px-4 w-12">
        <div
          {...attributes}
          {...listeners}
          className={`cursor-grab active:cursor-grabbing ${isArchived ? "opacity-30 cursor-not-allowed" : ""}`}
        >
          <GripVertical className="h-5 w-5 text-drag-handle" />
        </div>
      </td>
      {row.getVisibleCells().map((cell) => (
        <td key={cell.id} className="py-3 px-4">
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
      <td className="py-3 px-4 w-12">
        {isArchived ? (
          <Badge variant="secondary" className="bg-archived-badge-bg text-archived-badge border-0">
            📦 Archived
          </Badge>
        ) : (
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Edit2 className="h-4 w-4 text-muted-foreground" />
          </Button>
        )}
      </td>
    </tr>
  );
}
