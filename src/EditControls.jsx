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

import "./EditControls.css";

const EditControls = ({
  editText,
  insertString,
  insertLink,
  insertCode,
  insertImage,
  insertTask,
}) => {
  return (
    <div className="edit-controls">
      <IconButton icon={<>H1</>} onClick={() => insertString("# ")} />
      <IconButton icon={<>H2</>} onClick={() => insertString("## ")} />
      <IconButton icon={<>H3</>} onClick={() => insertString("### ")} />
      <IconButton icon={<>H4</>} onClick={() => insertString("#### ")} />
      <IconButton icon={<>H5</>} onClick={() => insertString("##### ")} />
      <IconButton icon={<>H6</>} onClick={() => insertString("###### ")} />
      <IconButton icon={<BoldIcon />} onClick={() => editText("**")} />
      <IconButton icon={<ItalicIcon />} onClick={() => editText("_")} />
      <IconButton icon={<StrikeThroughIcon />} onClick={() => editText("~~")} />
      <IconButton
        icon={<HorizontalLine />}
        onClick={() => insertString("---")}
      />
      <IconButton
        icon={<BlockquoteIcon />}
        onClick={() => insertString("> ")}
      />
      <IconButton icon={<CodeIcon />} onClick={insertCode} />
      <IconButton icon={<LinkIcon />} onClick={insertLink} />
      <IconButton icon={<ImageIcon />} onClick={insertImage} />
      <IconButton icon={<TaskIcon />} onClick={insertTask} />
      <IconButton
        icon={<UnorderedListIcon />}
        onClick={() => insertString("- ")}
      />

      <IconButton
        icon={<TableIcon />}
        onClick={() =>
          insertString(
            `| heading a | heading b |\n| --------- | :-------- |\n| cell 1    | cell 2    |\n| cell 3    | cell 4    | `
          )
        }
      />
    </div>
  );
};

export default EditControls;
