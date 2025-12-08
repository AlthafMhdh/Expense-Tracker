import moment from "moment";
import React from "react"
import { LuDownload } from "react-icons/lu";
import TransactionInfoCard from "../cards/TransactionInfoCard";

const ExpenseList = ({transaction, onDelete, onDownload}) => {
  return(
    <div className="card">
        <div className="flex items-center justify-between">
            <h5 className="text-lg">All Expenses</h5>

            <button className="card-btn" onClick={onDownload}>
                <LuDownload className="text-base"/> Download
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
            {transaction?.map((item) => (
                <TransactionInfoCard
                    key={item._id}
                    title={item.source}
                    icon={item.icon}
                    date={moment(item.date).format("Do MMM YYYY")}
                    amount={item.amount}
                    type="expense"
                    onDelete={() =>onDelete(item._id)}
                />
            ))}
        </div>
    </div>
  )
}
export default ExpenseList;