import React from "react";

interface Props {
  delivers: any;
}

export const DeliverTable: React.FC<Props> = ({ delivers }) => {
  return (
    <table className="w-full table-fixed border-collapse border-gray-400 border-2">
      <thead>
        <tr className="border-b-2 border-gray-400">
          <th className="w-2/5 py-2">Způsob dopravy</th>
          <th className="w-1/5 py-2">Cena</th>
          <th className="w-1/5 py-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {delivers.map((deliver: any, i: KeyType) => (
          <tr className="border-b border-gray-400" key={i}>
            <td className=" py-2 text-center">{deliver.name}</td>
            <td className=" py-2 text-center">{deliver.price}</td>
            <td className=" py-2 ">
              {deliver.hidden ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mx-auto text-green-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mx-auto text-red-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </td>
            <td className="text-center px-10 py-2">
              <i
                className="fa fa-pencil fa-lg w-8 hover:text-gray-400"
                aria-hidden="true"
              ></i>
              <i
                className="fa fa-trash fa-lg w-8 hover:text-gray-400"
                aria-hidden="true"
              ></i>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
