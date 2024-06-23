const Checkbox = ({
  id,
  onToggle,
  completed,
}: {
  id: string;
  onToggle: () => Promise<void>;
  completed: boolean;
}) => {
  return (
    <div className="checkbox-wrapper-18">
      {" "}
      <div className="round">
        {" "}
        <input type="checkbox" defaultChecked={completed} id={id} />{" "}
        <label onClick={onToggle} htmlFor={id}>
          {" "}
        </label>{" "}
      </div>{" "}
    </div>
  );
};

export default Checkbox;
