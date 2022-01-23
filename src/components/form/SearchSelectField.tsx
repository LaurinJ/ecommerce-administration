import React from "react";

interface Categories {
  hidden: boolean;
  name: string;
  __typename: "Category";
  _id: string;
}

interface Props {
  name?: string;
  prompt?: string;
  value?: string;
  data?: [Categories];
  emptySelected?: string;
  handleChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function SearchSelectField(props: Props) {
  return (
    <div className="rounded-r-sm max-h-12 border-l-0 border border-gray-400">
      {/* vykreslení aktuálního elementu */}
      <select
        className={`w-40 p-3 h-full bg-gray-100 outline-none`}
        // multiple={props.multiple}
        name={props.name}
        value={props.value}
        onChange={props.handleChange}
      >
        {/* empty value disabled  */}
        <option defaultValue="" value={props.emptySelected}>
          {props.prompt}
        </option>

        {props.data &&
          props.data.map((obj, i) => {
            return (
              <option className="p-2 bg-gray-100" value={obj._id} key={i}>
                {obj.name}
              </option>
            );
          })}
      </select>
    </div>
  );
}

export default SearchSelectField;
