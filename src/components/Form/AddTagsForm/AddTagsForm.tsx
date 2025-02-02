import { ChangeEvent, MouseEvent, useState } from "react";
import { Tag } from "../../Tag/Tag";
import "./style.css";

interface AddTagsProps {
  tags: string[];
  onAddTags: (tag: string) => void;
}

export const AddTagsForm = ({ tags, onAddTags }: AddTagsProps) => {
  const [tag, setTag] = useState<string>("");

  const OnAddTag = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onAddTags(tag);
    setTag("");
  };

  return (
    <div className="form-field-container">
      <p>Tags:</p>
      <input
        type="text"
        value={tag}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setTag(event.target.value)
        }
      />
      <button type="button" onClick={OnAddTag}>
        Add tag
      </button>

      <div className="add-tag-container">
        {tags.map((tag) => (
          <Tag key={tag} text={tag} />
        ))}
      </div>
    </div>
  );
};
