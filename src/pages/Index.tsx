import { ColumnDef } from "@tanstack/react-table";
import { DraggableTable, FieldData } from "@/components/DraggableTable";

const columns: ColumnDef<FieldData>[] = [
  {
    accessorKey: "label",
    header: "Field Label & Type",
    cell: ({ row }) => (
      <div>
        <div className="font-medium text-foreground">{row.original.label}</div>
        <div className="text-sm text-muted-foreground">{row.original.type}</div>
      </div>
    ),
  },
  {
    accessorKey: "defaultValue",
    header: "Default Value",
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.original.defaultValue || "-"}</div>
    ),
  },
];

const initialData: FieldData[] = [
  {
    id: "1",
    label: "Date Field",
    type: "Date Picker",
    defaultValue: "",
  },
  {
    id: "2",
    label: "333",
    type: "Text Input (Single Line)",
    defaultValue: "444",
  },
  {
    id: "3",
    label: "Nest3",
    type: "Text Area",
    defaultValue: "333",
  },
  {
    id: "4",
    label: "test 3",
    type: "Text Input",
    defaultValue: "123",
  },
  {
    id: "5",
    label: "Archived",
    type: "Text",
    defaultValue: "G2",
    isArchived: true,
  },
  {
    id: "6",
    label: "Old Field",
    type: "Number Input",
    defaultValue: "100",
    isArchived: true,
  },
  {
    id: "7",
    label: "Legacy Data",
    type: "Dropdown",
    defaultValue: "Option A",
    isArchived: true,
  },
  {
    id: "8",
    label: "Deprecated Field",
    type: "Checkbox",
    defaultValue: "true",
    isArchived: true,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-foreground mb-6">Fields</h1>
        <DraggableTable columns={columns} data={initialData} />
      </div>
    </div>
  );
};

export default Index;
