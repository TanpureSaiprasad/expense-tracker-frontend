import API from "./api";

export const addExpense = async (expenseData) => {
  const { data } = await API.post("/expenses", expenseData);
  return data;
};

export const getExpenses = async () => {
  const { data } = await API.get("/expenses/getAllexpenses");
  return data;
};

export const updateExpense = async (id, data) => {
  const { data: updatedExpense } = await API.put(`/expenses/${id}`, data);
  return updatedExpense;
}

export const deleteExpense = async (id) => {
  await API.delete(`/expenses/${id}`);
};