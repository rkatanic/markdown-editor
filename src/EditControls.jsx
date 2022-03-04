import IconButton from "./components/IconButton";
import { ReactComponent as BoldIcon } from "./assets/icons/bold.svg";
import { ReactComponent as ItalicIcon } from "./assets/icons/italic.svg";
import { ReactComponent as StrikeThroughIcon } from "./assets/icons/strikeThrough.svg";
import { ReactComponent as CodeIcon } from "./assets/icons/code.svg";
import { ReactComponent as BlockquoteIcon } from "./assets/icons/blockquote.svg";
import { ReactComponent as ImageIcon } from "./assets/icons/image.svg";
import { ReactComponent as LinkIcon } from "./assets/icons/link.svg";
import { ReactComponent as HorizontalLine } from "./assets/icons/horizontalLine.svg";
import { ReactComponent as TaskIcon } from "./assets/icons/task.svg";
import { ReactComponent as UnorderedListIcon } from "./assets/icons/unorderedList.svg";
import { ReactComponent as TableIcon } from "./assets/icons/table.svg";
import { ReactComponent as DownloadIcon } from "./assets/icons/download.svg";
import { ReactComponent as DeleteIcon } from "./assets/icons/delete.svg";

import "./EditControls.css";

const EditControls = ({
  insertMarkdownPrefix,
  insertMarkdown,
  downloadMarkdown,
  clearMarkdown,
}) => {
  return (
    <div className="edit-controls">
      <div>
        <IconButton icon={<>H1</>} onClick={() => insertMarkdownPrefix("# ")} />
        <IconButton
          icon={<>H2</>}
          onClick={() => insertMarkdownPrefix("## ")}
        />
        <IconButton
          icon={<>H3</>}
          onClick={() => insertMarkdownPrefix("### ")}
        />
        <IconButton
          icon={<>H4</>}
          onClick={() => insertMarkdownPrefix("#### ")}
        />
        <IconButton
          icon={<>H5</>}
          onClick={() => insertMarkdownPrefix("##### ")}
        />
        <IconButton
          icon={<>H6</>}
          onClick={() => insertMarkdownPrefix("###### ")}
        />
        <IconButton
          icon={<BoldIcon />}
          onClick={() => insertMarkdown("****", "**", "**")}
        />
        <IconButton
          icon={<ItalicIcon />}
          onClick={() => insertMarkdown("__", "_", "_")}
        />
        <IconButton
          icon={<StrikeThroughIcon />}
          onClick={() => insertMarkdown("~~~~", "~~", "~~")}
        />
        <IconButton
          icon={<HorizontalLine />}
          onClick={() => insertMarkdownPrefix("---")}
        />
        <IconButton
          icon={<BlockquoteIcon />}
          onClick={() => insertMarkdownPrefix("> ")}
        />
        <IconButton
          icon={<CodeIcon />}
          onClick={() =>
            insertMarkdown("```js\n code\n```", "```js\n", "\n```")
          }
        />
        <IconButton
          icon={<LinkIcon />}
          onClick={() => insertMarkdown("[link](url)", "[", "](url)")}
        />
        <IconButton
          icon={<ImageIcon />}
          onClick={() => insertMarkdown("![imageText](url)", "![", "](url)")}
        />
        <IconButton
          icon={<TaskIcon />}
          onClick={() => insertMarkdown("- [ ] text", "- [ ] ", "")}
        />
        <IconButton
          icon={<UnorderedListIcon />}
          onClick={() => insertMarkdownPrefix("- ")}
        />
        <IconButton
          icon={<TableIcon />}
          onClick={() =>
            insertMarkdownPrefix(
              `| heading a | heading b |\n| --------- | :-------- |\n| cell 1    | cell 2    |\n| cell 3    | cell 4    | `
            )
          }
        />
      </div>

      <div>
        <IconButton icon={<DeleteIcon />} onClick={clearMarkdown} />
        <IconButton icon={<DownloadIcon />} onClick={downloadMarkdown} />
      </div>
    </div>
  );
};

export default EditControls;
