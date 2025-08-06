import React from 'react';

interface Props {
  label: string;
  color?: string; 
}

const colorClassMap: Record<string, { text: string; bg: string; border: string }> = {
  "1": { text: "text-teal-500", bg: "bg-teal-100", border: "border-teal-500" },
  "2": { text: "text-blue-500", bg: "bg-blue-100", border: "border-blue-500" },
  "3": { text: "text-green-500", bg: "bg-green-100", border: "border-green-500" },
  "4": { text: "text-yellow-500", bg: "bg-yellow-100", border: "border-yellow-500" },
  "5": { text: "text-purple-500", bg: "bg-purple-100", border: "border-purple-500" },
  "6": { text: "text-pink-500", bg: "bg-pink-100", border: "border-pink-500" },
  "7": { text: "text-indigo-500", bg: "bg-indigo-100", border: "border-indigo-500" },
  "8": { text: "text-orange-500", bg: "bg-orange-100", border: "border-orange-500" },
  "9": { text: "text-red-500", bg: "bg-red-100", border: "border-red-500" },
  "10": { text: "text-amber-500", bg: "bg-amber-100", border: "border-amber-500" },
};

const Tags = ({ label, color }: Props) => {
  const classes = color && colorClassMap[color]
    ? colorClassMap[color]
    : {
        text: "text-gray-500",
        bg: "bg-gray-100",
        border: "border-gray-500",
      };

  return (
    <div
      className={`
        ${classes.text}
        ${classes.bg}
        text-sm font-semibold min-w-[40px] px-3 py-1 rounded-2xl flex items-center justify-center
      `}
    >
      {label}
    </div>
  );
};

export default Tags;
