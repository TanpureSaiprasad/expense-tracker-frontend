const dummyExpenses = [
  {
    id: 1,
    amount: 1200,
    note: "Groceries",
    date: "2023-01-05"
  },
  {
    id: 2,
    amount: 800,
    note: "Petrol",
    date: "2023-01-10"
  },
  {
    id: 3,
    amount: 1500,
    note: "Electricity Bill",
    date: "2023-02-02"
  },
  {
    id: 4,
    amount: 600,
    note: "Internet Bill",
    date: "2023-02-15"
  },
  {
    id: 5,
    amount: 2000,
    note: "Rent",
    date: "2023-03-01"
  },

  // ---- 2023 DATA ----
  ...Array.from({ length: 20 }, (_, i) => ({
    id: i + 6,
    amount: Math.floor(Math.random() * 3000) + 500,
    note: "Expense " + (i + 6),
    date: `2023-${String((i % 12)).padStart(2, "0")}-${String(
      (i % 28) + 1
    ).padStart(2, "0")}`
  })),

  // ---- 2024 DATA ----
  ...Array.from({ length: 25 }, (_, i) => ({
    id: i + 26,
    amount: Math.floor(Math.random() * 4000) + 700,
    note: "Expense " + (i + 26),
    date: `2024-${String((i % 12) + 1).padStart(2, "0")}-${String(
      (i % 28) + 1
    ).padStart(2, "0")}`
  }))
];

export default dummyExpenses;
