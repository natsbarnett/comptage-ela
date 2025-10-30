import { useState } from "react";
const denominations = [
  { label: "1 centime", value: 0.01 },
  { label: "2 centimes", value: 0.02 },
  { label: "5 centimes", value: 0.05 },
  { label: "10 centimes", value: 0.1 },
  { label: "20 centimes", value: 0.2 },
  { label: "50 centimes", value: 0.5 },
  { label: "1 €", value: 1 },
  { label: "2 €", value: 2 },
  { label: "5 €", value: 5 },
  { label: "10 €", value: 10 },
  { label: "20 €", value: 20 },
  { label: "50 €", value: 50 },
  { label: "100 €", value: 100 },
  { label: "200 €", value: 200 },
  { label: "500 €", value: 500 },
  { label: "Chèque (valeur libre)", value: "cheque" },
];

export default function MoneyCounter() {
  const [items, setItems] = useState([]);

  const addItem = () => {
    setItems([
      ...items,
      { type: denominations[0].value, quantity: 1, customValue: 0 },
    ]);
  };

  const updateItem = (index, key, value) => {
    const updated = [...items];
    updated[index][key] =
      key === "type"
        ? value === "cheque"
          ? "cheque"
          : parseFloat(value)
        : parseFloat(value) || 0;
    setItems(updated);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  //const total = items.reduce((sum, item) => sum + item.type * item.quantity, 0);

  const total = items.reduce((sum, item) => {
    const unitValue =
      item.type === "cheque"
        ? parseFloat(item.customValue) || 0
        : parseFloat(item.type);
    return sum + unitValue * (parseInt(item.quantity) || 0);
  }, 0);

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-2xl shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Course ELA</h1>

      {items.map((item, index) => (
        <div
          key={index}
          className="liste-sous"
        >
          <div className="sous">
            <select
              value={item.type}
              onChange={(e) => updateItem(index, "type", e.target.value)}
            >
              {denominations.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>

            <input
              type="number"
              min="0"
              value={item.quantity}
              onChange={(e) => updateItem(index, "quantity", e.target.value)}
            />
            {/* Champ supplémentaire pour la valeur libre du chèque */}
            {item.type === "cheque" && (
              <div>
                <label>
                  Valeur du chèque (€)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.customValue || ""}
                  onChange={(e) =>
                    updateItem(index, "customValue", e.target.value)
                  }
                />
              </div>
            )}

            <button
              onClick={() => removeItem(index)}
              className="remove-item"
            >
              ✕
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={addItem}
        className="add-item"
      >
        + Ajouter
      </button>

      <div className="total">
        Total : {total.toFixed(2)} €
      </div>
    </div>
  );
}
