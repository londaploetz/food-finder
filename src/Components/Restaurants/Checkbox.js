

export const Checkbox = ({ isChecked, label, checkHandler, index }) => {
    return (
      <div>
       <label>{label}</label>
        <input
          type="checkbox"
          id={`checkbox-${index}`}
          checked={isChecked}
          onChange={checkHandler}
        />
      </div>
    )
  }
  