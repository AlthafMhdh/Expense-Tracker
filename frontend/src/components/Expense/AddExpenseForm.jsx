import React, { useState } from "react"
import Input from "../inputs/Inputs";
import EmojiPickerPopup from "../EmojiPickerPopup";

const AddExpenseForm = ({onAddExpense}) => {
  const [expense, setExpense] = useState({
    category:"",
    amount:"",
    date:"",
    icon:""
  });

  const handleChange = (key,value) => setExpense({...expense, [key] : value});

  return(
    <div className="">

      <EmojiPickerPopup
        icon = {expense.icon}
        onSelect = {(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      <Input
        value = {expense.category}
        label = "Expense Category"
        onChange = {({ target }) => handleChange("category", target.value)}
        placeholder = "Rent,Groceries,etc"
        type = "text"
      />

      <Input
        value = {expense.amount}
        label = "Amount"
        onChange = {({ target }) => handleChange("amount", target.value)}
        placeholder = ""
        type = "number"
      />

      <Input
        value = {expense.date}
        label = "Date"
        onChange = {({ target }) => handleChange("date", target.value)}
        placeholder = ""
        type = "date"
      />

      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="add-btn add-btn-fill"
          onClick={()=> onAddExpense(expense)}
        >
          Add Expense
        </button>
      </div>
    </div>
  )
}
export default AddExpenseForm;