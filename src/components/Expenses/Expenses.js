import React, { useState } from "react";
import ExpenseItem from "./ExpenseItem";
import Card from "../UI/Card";
import "./Expenses.css";
import ExpensesFilter from "../ExpenseFilter/ExpensesFilter";

const Expenses = (props) => {
  const [filteredYear, updateSeletcedYear] = useState("2020");
  const filterYearHandler = (selectedYear) => {
    updateSeletcedYear(selectedYear);
  };

  const filteredItems = props.items.filter((expense) => {
    return expense.date.getFullYear().toString() === filteredYear;
  });

  let expensesContent = <p>No Expenses Found.</p>;

  if (filteredItems.length > 0) {
    expensesContent = filteredItems.map((expense) => (
      <ExpenseItem
        key={expense.id}
        title={expense.title}
        amount={expense.amount}
        date={expense.date}
      />
    ));
  }

  return (
    <Card className="expenses">
      <ExpensesFilter
        onFilterYear={filterYearHandler}
        selected={filteredYear}
      />
      {expensesContent}
    </Card>
  );
};

export default Expenses;
