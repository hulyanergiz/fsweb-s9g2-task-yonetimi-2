import React from "react";
import { formatDistanceToNow, differenceInDays } from "date-fns";
import { tr } from "date-fns/locale";

const Task = ({ taskObj, onComplete }) => {
  const deadlineDate = new Date(taskObj.deadline);

  const deadlineText = formatDistanceToNow(deadlineDate, {
    addSuffix: true,
    locale: tr,
  });

  const today = new Date();

  function getClassName(date) {
    const diff = differenceInDays(date, today);

    return diff > 3 ? "bg-[#d4d7ff]" : "bg-[#ffd9d4]";
  }

  return (
    <div className="task p-6 bg-[#fff] rounded leading-6 mt-1 shadow-md">
      <h3 className="text-lg text-[#c8781a]">{taskObj.title}</h3>
      <div className="deadline text-xs pt-1">
        son teslim:{" "}
        <span className={getClassName(deadlineDate)}>{deadlineText}</span>
      </div>
      <p className="pt-2 px-0 pb-3 text-sm text-[#444} shadow-md rounded-sm border-0 cursor-pointer">
        {taskObj.description}
      </p>
      <div>
        {taskObj.people.map((p) => (
          <span
            className="pill inline-block py-1 px-3 text-sm border-solid border-2 border-[#ccc] mr-1 mb-1.5 rounded-3xl "
            key={p}
          >
            {p}
          </span>
        ))}
      </div>
      {onComplete && (
        <button
          className="block py-2 px-3 ml-auto bg-[#fecc91] shadow-md rounded border-0 cursor-pointer"
          onClick={() => onComplete(taskObj.id)}
        >
          Tamamlandı
        </button>
      )}
    </div>
  );
};

export default Task;
