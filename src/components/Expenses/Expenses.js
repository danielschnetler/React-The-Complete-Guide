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

  return (
    <Card className="expenses">
      <ExpensesFilter
        onFilterYear={filterYearHandler}
        selected={filteredYear}
      />
      {props.items.map((expense) => (
        <ExpenseItem
          title={expense.title}
          amount={expense.amount}
          date={expense.date}
        />
      ))}
    </Card>
  );
};

export default Expenses;
