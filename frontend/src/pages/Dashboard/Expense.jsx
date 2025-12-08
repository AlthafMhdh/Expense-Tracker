import React, { useEffect, useState } from "react"
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import ExpenseOverview from "../../components/Expense/ExpenseOverview";
import AddExpenseForm from "../../components/Expense/AddExpenseForm";
import Modal from "../../components/Modal/Modal";
import ExpenseList from "../../components/Expense/ExpenseList";
import DeleteAlert from "../../components/DeleteAlert";

const Expense = () => {
  useUserAuth();

  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [expenseData, setExpenseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const fetchExpenseDatails = async () => {
    if (loading) return;

    setLoading(true);

    try{
      const response = await axiosInstance.get(
        `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
      );
      if (response.data) {
        setExpenseData(response.data);
      }
    }
    catch (error) {
      console.log("Something went wrong. Please try again.", error);
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(()=> {
    fetchExpenseDatails();
    return()=> {}
  }, []);

  const handleAddExpense = async (expense) => {
    const {category, amount, date, icon} = expense;

    if (!category.trim()) {
      toast.error("Category is required.");
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <=0) {
      toast.error("Amount should be a valid number greader than 0.");
      return;
    }

    if (!date) {
      toast.error("Date is required.");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon
      });

      setOpenAddExpenseModal(false);
      toast.success("Expense added successfully");
      fetchExpenseDatails();
    }
    catch (error) {
      console.error("Error adding expense", error.response?.data?.message || error.message);
    }
  };

  const deleteIncome = async (id) => {
    try{
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
      setOpenDeleteAlert({show:false, data: null});
      toast.success("Expense details deleted successfully");
      fetchExpenseDatails();
    }
    catch (error) {
      console.error("Error deleting expense", error.response?.data?.message || error.message);
    }
  };

  const handleDownloadExpenseDetails = async () => {
    try{
      const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE, {
        responseType: "blob"
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download",  "expense_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    }
    catch (error) {
      console.error("Error downloading expense", error.response?.data?.message || error.message);
      toast.error("Failed to download expense details. Please try again.")
    }
  };

  return(
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <ExpenseOverview
              transaction={expenseData}
              onAddExpense={()=> setOpenAddExpenseModal(true)}
            />
          </div>

          <ExpenseList
            transaction={expenseData}
            onDelete = {(id)=> {
              setOpenDeleteAlert({show: true, data: id});
            }}
            onDownload = {handleDownloadExpenseDetails}
          />
          
        </div>

        <Modal
          isOpen={openAddExpenseModal}
          onClose={()=> setOpenAddExpenseModal(false)}
          title="Add Expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense}/>
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={()=> setOpenDeleteAlert({show: false, data: null})}
          title="Delete Expense"
        >
          <DeleteAlert 
            content="Are you sure you want to delete this expense details?"
            onDelete={() =>deleteIncome(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  )
}
export default Expense;