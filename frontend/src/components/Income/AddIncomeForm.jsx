import React, { useState } from "react"
import Input from "../inputs/Inputs";
import EmojiPickerPopup from "../EmojiPickerPopup";

const AddIncomeForm = ({onAddIncome}) => {
  const [income, setIncome] = useState({
    source:"",
    amount:"",
    date:"",
    icon:""
  });

  const handleChange = (key,value) => setIncome({...income, [key] : value});

  return(
    <div className="relative overflow-visible">

      <EmojiPickerPopup
        icon = {income.icon}
        onSelect = {(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      <Input
        value = {income.source}
        label = "Income Source"
        onChange = {({ target }) => handleChange("source", target.value)}
        placeholder = "Freelance, Salary, etc"
        type = "text"
      />

      <Input
        value = {income.amount}
        label = "Amount"
        onChange = {({ target }) => handleChange("amount", target.value)}
        placeholder = ""
        type = "number"
      />

      <Input
        value = {income.date}
        label = "Date"
        onChange = {({ target }) => handleChange("date", target.value)}
        placeholder = ""
        type = "date"
      />

      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="add-btn add-btn-fill"
          onClick={()=> onAddIncome(income)}
        >
          Add Income
        </button>
      </div>
    </div>
  )
}
export default AddIncomeForm;