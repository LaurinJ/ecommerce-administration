import React, { useState } from "react";

interface Props {
  id: string;
  handleDelete: (options: any) => void;
}

function DeleteButton({ id, handleDelete }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      {open && (
        <div className="inline">
          <div className="dark_filter"></div>
          <div className="delete_container">
            <span className="font-bold text-xl">Jsi si jistý?</span>
            <div className="flex space-x-4">
              <button
                className="hover:bg-red-500 btn"
                onClick={() => {
                  handleDelete({ variables: { id: id } });
                  setOpen(false);
                }}
              >
                Odstranit
              </button>
              <button
                className="btn"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Zpět
              </button>
            </div>
          </div>
        </div>
      )}
      <i
        onClick={() => {
          setOpen(true);
        }}
        className="fa fa-trash fa-lg w-8 hover:text-gray-400 cursor-pointer"
        aria-hidden="true"
      ></i>
    </>
  );
}

export default DeleteButton;
