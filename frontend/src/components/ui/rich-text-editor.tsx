"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CharacterCount from "@tiptap/extension-character-count";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import Link from "@tiptap/extension-link";
import {
  Table,
  TableRow,
  TableCell,
  TableHeader,
} from "@tiptap/extension-table";
import Placeholder from "@tiptap/extension-placeholder";

import { cn } from "@/lib/utils";
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  StrikethroughIcon,
  SuperscriptIcon,
  SubscriptIcon,
  ListIcon,
  ListOrderedIcon,
  QuoteIcon,
  Code2Icon,
  LinkIcon,
  Table2Icon,
  Undo2Icon,
  Redo2Icon,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  maxCharacters?: number;
  readOnly?: boolean;
  placeholder?: string;
  className?: string;
}

interface ToolbarButtonProps {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}

function ToolbarButton({
  onClick,
  isActive,
  disabled,
  title,
  children,
}: ToolbarButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={cn(
        "h-7 w-7 rounded-md inline-flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors disabled:opacity-30 disabled:pointer-events-none",
        isActive && "bg-secondary text-foreground",
      )}
    >
      {children}
    </button>
  );
}

function RichTextEditor({
  value,
  onChange,
  maxCharacters,
  readOnly = false,
  placeholder = "Write something...",
  className,
}: RichTextEditorProps) {
  const isInternalChange = useRef(false);
  const [charCount, setCharCount] = useState(0);

  const handleUpdate = useCallback(
    ({ editor }: { editor: ReturnType<typeof useEditor> }) => {
      if (!editor || isInternalChange.current) return;
      isInternalChange.current = true;
      onChange(editor.getHTML());
      setCharCount(editor.storage?.characterCount?.characters?.() ?? 0);
      requestAnimationFrame(() => {
        isInternalChange.current = false;
      });
    },
    [onChange],
  );

  const extensions = useMemo(
    () => [
      StarterKit.configure({
        heading: false,
        codeBlock: {
          HTMLAttributes: { class: "rich-text-code-block" },
        },
      }),
      CharacterCount.configure({
        limit: maxCharacters ?? null,
      }),
      Superscript,
      Subscript,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: "rich-text-link" },
      }),
      Table.configure({
        resizable: false,
      }),
      TableRow,
      TableCell,
      TableHeader,
      Placeholder.configure({
        placeholder,
      }),
    ],
    [maxCharacters, placeholder],
  );

  const editor = useEditor({
    extensions,
    content: value,
    editable: !readOnly,
    onUpdate: handleUpdate,
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor) {
      editor.setEditable(!readOnly);
    }
  }, [editor, readOnly]);

  useEffect(() => {
    if (editor && !editor.isDestroyed) {
      const currentHtml = editor.getHTML();
      if (currentHtml !== value && !isInternalChange.current) {
        editor.commands.setContent(value, { emitUpdate: false });
      }
    }
  }, [editor, value]);

  const isAtLimit = maxCharacters != null && charCount >= maxCharacters;

  const insertLink = useCallback(() => {
    const previousUrl = editor?.getAttributes("link").href;
    const url = window.prompt("Enter URL", previousUrl);
    if (url === null) return;
    if (url === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor
      ?.chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url })
      .run();
  }, [editor]);

  const insertTable = useCallback(() => {
    editor
      ?.chain()
      .focus()
      .insertTable({ rows: 2, cols: 2, withHeaderRow: false })
      .run();
  }, [editor]);

  if (!editor) return null;

  return (
    <div
      className={cn(
        "rounded-lg border overflow-hidden",
        readOnly
          ? "bg-muted/30 border-border/50"
          : "border-border bg-transparent",
        className,
      )}
    >
      {!readOnly && (
        <div className="flex flex-wrap items-center gap-0.5 p-1 border-b border-border bg-muted/30">
          <div className="flex items-center gap-0.5 pr-2 border-r border-border/50">
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBold().run()}
              isActive={editor.isActive("bold")}
              title="Bold"
            >
              <BoldIcon className="size-3.5" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
              isActive={editor.isActive("italic")}
              title="Italic"
            >
              <ItalicIcon className="size-3.5" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              isActive={editor.isActive("underline")}
              title="Underline"
            >
              <UnderlineIcon className="size-3.5" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleStrike().run()}
              isActive={editor.isActive("strike")}
              title="Strikethrough"
            >
              <StrikethroughIcon className="size-3.5" />
            </ToolbarButton>
          </div>

          <div className="flex items-center gap-0.5 px-2 border-r border-border/50">
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleSuperscript().run()}
              isActive={editor.isActive("superscript")}
              title="Superscript"
            >
              <SuperscriptIcon className="size-3.5" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleSubscript().run()}
              isActive={editor.isActive("subscript")}
              title="Subscript"
            >
              <SubscriptIcon className="size-3.5" />
            </ToolbarButton>
          </div>

          <div className="flex items-center gap-0.5 px-2 border-r border-border/50">
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              isActive={editor.isActive("bulletList")}
              title="Bullet list"
            >
              <ListIcon className="size-3.5" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              isActive={editor.isActive("orderedList")}
              title="Ordered list"
            >
              <ListOrderedIcon className="size-3.5" />
            </ToolbarButton>
          </div>

          <div className="flex items-center gap-0.5 px-2 border-r border-border/50">
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              isActive={editor.isActive("blockquote")}
              title="Blockquote"
            >
              <QuoteIcon className="size-3.5" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              isActive={editor.isActive("codeBlock")}
              title="Code block"
            >
              <Code2Icon className="size-3.5" />
            </ToolbarButton>
          </div>

          <div className="flex items-center gap-0.5 px-2 border-r border-border/50">
            <ToolbarButton
              onClick={insertLink}
              isActive={editor.isActive("link")}
              title="Insert link"
            >
              <LinkIcon className="size-3.5" />
            </ToolbarButton>
            <ToolbarButton onClick={insertTable} title="Insert table">
              <Table2Icon className="size-3.5" />
            </ToolbarButton>
          </div>

          <div className="flex items-center gap-0.5 px-2">
            <ToolbarButton
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo()}
              title="Undo"
            >
              <Undo2Icon className="size-3.5" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo()}
              title="Redo"
            >
              <Redo2Icon className="size-3.5" />
            </ToolbarButton>
          </div>
        </div>
      )}

      <div
        className={cn("rich-text-content overflow-x-auto", !readOnly && "p-3")}
      >
        <EditorContent editor={editor} className={`${readOnly ? "p-5" : ""}`} />
      </div>

      {!readOnly && maxCharacters != null && (
        <div
          className={cn(
            "text-label-sm text-right px-2 pb-1",
            isAtLimit ? "text-error" : "text-muted-foreground",
          )}
        >
          {charCount} / {maxCharacters}
        </div>
      )}
    </div>
  );
}

export { RichTextEditor };
export type { RichTextEditorProps };
