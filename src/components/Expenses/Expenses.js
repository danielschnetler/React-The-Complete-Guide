import React, { useState } from "react";
import Card from "../UI/Card";
import "./Expenses.css";
import ExpensesFilter from "../ExpenseFilter/ExpensesFilter";
import ExpensesList from "./ExpensesList";
import ExpensesChart from "./ExpensesChart";

const Expenses = (props) => {
  const [filteredYear, updateSeletcedYear] = useState("2020");
  const filterYearHandler = (selectedYear) => {
    updateSeletcedYear(selectedYear);
  };

  const filteredItems = props.items.filter((expense) => {
    return expense.date.getFullYear().toString() === filteredYear;
  });

  return (
    <li>
      <Card className="expenses">
        <ExpensesFilter
          onFilterYear={filterYearHandler}
          selected={filteredYear}
        />
        <ExpensesChart expenses={filteredItems}/>
        <ExpensesList items={filteredItems} />
      </Card>
    </li>
  );
};

export default Expenses;
