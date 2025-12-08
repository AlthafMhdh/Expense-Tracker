const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { isValidObjectId, Types } = require("mongoose");

//Dashboard Data
exports.getDashboardData = async(req, res) => {
    try{
        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(String(userId));

        const totalIncome = await Income.aggregate([
            {$match: {userId : userObjectId}},
            {$group: {_id: null, total: {$sum: "$amount"}}},
        ]);

        console.log("totalIncome", {totalIncome, userId: isValidObjectId(userId)});

        const totalExpense = await Expense.aggregate([
            {$match: {userId : userObjectId}},
            {$group: {_id: null, total: {$sum: "$amount"}}},
        ]);

        const last60daysIncomeTransaction = await Income.find({
            userId,
            date: {$gte: new Date(Date.now() - 60*24*60*60*1000)},         
        }).sort({date: -1});

        const incomeLast60days = last60daysIncomeTransaction.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        );

        const last30daysExpenseTransaction = await Expense.find({
            userId,
            date: {$gte: new Date(Date.now() - 30*24*60*60*1000)},         
        }).sort({date: -1});

        const expenseLast30days = last30daysExpenseTransaction.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        );

        //Last five transaction of Income + Expense
        const lastTransactions = [
            ...(await Income.find({userId}).sort({date: -1}).limit(5)).map(
                (txt) => ({
                    ...txt.toObject(),
                    type:"income",
                })
            ),
            ...(await Expense.find({userId}).sort({date: -1}).limit(5)).map(
                (txt) => ({
                    ...txt.toObject(),
                    type:"expense",
                })
            ),
        ].sort((a,b)=> b.date -a.date);

        res.json({
            totalBalance : (totalIncome[0]?.total ||0) - (totalExpense[0]?.total ||0),
            totalIncome : totalIncome[0]?.total ||0,
            totalExpense : totalExpense[0]?.total ||0,
            last30DaysExpenses : {total: expenseLast30days, transaction: last30daysExpenseTransaction},
            last60DaysIncomes : {total: incomeLast60days, transaction: last60daysIncomeTransaction},
            recentTransactions : lastTransactions,
        });

    }
    catch (err) {
        res.status(500).json({message: "Server Error", err});
    }
};