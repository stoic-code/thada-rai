"use client";
import "./rich-text-editor.css";
import { Toggle } from "@/components/ui/toggle";
import { EditorContent, useEditor } from "@tiptap/react";
import Starterkit from "@tiptap/starter-kit";
import {
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
  Table2,
  Underline,
} from "lucide-react";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import UnderlineExt from "@tiptap/extension-underline";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type Props = {
  value: string;
  setValue: any;
  trigger: any;
  name: string;
  modules?: string[];
  height?: number;
};

export default function RichTextEditor({
  value,
  setValue,
  trigger,
  name,
  modules,
  height,
}: Props) {
  const editor = useEditor({
    extensions: [
      Starterkit.configure({
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal pl-4",
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: "list-disc pl-4",
          },
        },
      }),
      Table.configure({
        resizable: true,
      }),
      UnderlineExt,
      TableRow,
      TableHeader,
      TableCell,
    ],
    editorProps: {
      attributes: {
        class: cn(
          "min-h-[150px] w-full rounded-b-sm border-l border-r border-b border-input bg-background px-3 py-2 text-sm outline-none",
          height ? `min-h-[${height}px]` : "",
        ),
      },
    },
    content: value,
    onUpdate({ editor }) {
      setValue(name, editor.getHTML());
      trigger(name);
    },
  });

  return (
    <>
      <div className="sticky top-0 z-10 space-x-1 space-y-1 rounded-t-sm border bg-accent px-1">
        {modules?.includes("heading") && (
          <>
            <Toggle
              pressed={editor?.isActive("heading", { level: 1 })}
              onPressedChange={() =>
                editor?.chain().focus().toggleHeading({ level: 1 }).run()
              }
              size="sm"
            >
              <Heading1 className="h-4 w-4" />
            </Toggle>

            <Toggle
              pressed={editor?.isActive("heading", { level: 2 })}
              onPressedChange={() =>
                editor?.chain().focus().toggleHeading({ level: 2 }).run()
              }
              size="sm"
            >
              <Heading2 className="h-4 w-4" />
            </Toggle>

            <Toggle
              pressed={editor?.isActive("heading", { level: 3 })}
              onPressedChange={() =>
                editor?.chain().focus().toggleHeading({ level: 3 }).run()
              }
              size="sm"
            >
              <Heading3 className="h-4 w-4" />
            </Toggle>
          </>
        )}

        <Toggle
          pressed={editor?.isActive("bold")}
          onPressedChange={() => editor?.chain().focus().toggleBold().run()}
          size="sm"
        >
          <Bold className="h-4 w-4" />
        </Toggle>
        <Toggle
          pressed={editor?.isActive("italic")}
          onPressedChange={() => editor?.chain().focus().toggleItalic().run()}
          size="sm"
        >
          <Italic className="h-4 w-4" />
        </Toggle>
        <Toggle
          pressed={editor?.isActive("underline")}
          onPressedChange={() =>
            editor?.chain().focus().toggleUnderline().run()
          }
          size="sm"
        >
          <Underline className="h-4 w-4" />
        </Toggle>
        <Toggle
          pressed={editor?.isActive("strike")}
          onPressedChange={() => editor?.chain().focus().toggleStrike().run()}
          size="sm"
        >
          <Strikethrough className="h-4 w-4" />
        </Toggle>
        <Toggle
          pressed={editor?.isActive("bulletList")}
          onPressedChange={() =>
            editor?.chain().focus().toggleBulletList().run()
          }
          size="sm"
        >
          <List className="h-4 w-4" />
        </Toggle>
        <Toggle
          pressed={editor?.isActive("orderedList")}
          onPressedChange={() =>
            editor?.chain().focus().toggleOrderedList().run()
          }
          size="sm"
        >
          <ListOrdered className="h-4 w-4" />
        </Toggle>

        {modules?.includes("table") && (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Table2 className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem
                onClick={() =>
                  editor
                    ?.chain()
                    .focus()
                    .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                    .run()
                }
              >
                Insert Table
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => editor?.chain().focus().toggleHeaderRow().run()}
              >
                Toggle Header
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => editor?.chain().focus().addColumnAfter().run()}
              >
                Add Column After
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => editor?.chain().focus().deleteColumn().run()}
              >
                Delete Column
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => editor?.chain().focus().addRowAfter().run()}
              >
                Add Row After
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => editor?.chain().focus().deleteRow().run()}
              >
                Delete Row
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => editor?.chain().focus().deleteTable().run()}
                className="text-destructive focus:text-destructive"
              >
                Delete Table
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      <EditorContent className="editor" editor={editor} />
    </>
  );
}
