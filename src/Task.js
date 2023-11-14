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
    <div className="task">
      <h3>{taskObj.title}</h3>
      <div className="deadline">
        son teslim:{" "}
        <span className={getClassName(deadlineDate)}>{deadlineText}</span>
      </div>
      <p>{taskObj.description}</p>
      <div>
        {taskObj.people.map((p) => (
          <span className="pill" key={p}>
            {p}
          </span>
        ))}
      </div>
      {onComplete && (
        <button onClick={() => onComplete(taskObj.id)}>Tamamlandı</button>
      )}
    </div>
  );
};

export default Task;
