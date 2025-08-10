import "./FilterBox.css";
import type { User } from "../../types/user.ts";
import { useState } from "react";

interface FilterBoxProps {
  onFilterChange: (param: keyof User, value: string) => void;
}

export default function FilterBox({ onFilterChange }: FilterBoxProps) {
  const [activeKey, setActiveKey] = useState<keyof User | null>(null);
  const [inputs, setInputs] = useState<Record<string, string>>({
    lastName: "",
    firstName: "",
    maidenName: "",
    gender: "",
    age: "",
    phone: "",
  });

  function handleInputChange(key: keyof User, value: string) {
    if (activeKey !== key) {
      const resetInputs: Record<string, string> = {
        lastName: "",
        firstName: "",
        maidenName: "",
        gender: "",
        age: "",
        phone: "",
      };
      resetInputs[key] = value;
      setInputs(resetInputs);
      setActiveKey(key);
      onFilterChange(key, value);
    } else {
      setInputs((prev) => ({ ...prev, [key]: value }));
      onFilterChange(key, value);
    }
  }

  return (
    <div className="filter-box">
      <div className="filter-header">Фильтры</div>
      <input
        type="text"
        placeholder="Фамилия"
        value={inputs.lastName}
        onChange={(e) => handleInputChange("lastName", e.target.value)}
      />
      <input
        type="text"
        placeholder="Имя"
        value={inputs.firstName}
        onChange={(e) => handleInputChange("firstName", e.target.value)}
      />
      <input
        type="text"
        placeholder="Отчество"
        value={inputs.maidenName}
        onChange={(e) => handleInputChange("maidenName", e.target.value)}
      />
      <select
        value={inputs.gender}
        onChange={(e) => handleInputChange("gender", e.target.value)}
      >
        <option value="">Все</option>
        <option value="male">Мужской</option>
        <option value="female">Женский</option>
      </select>
      <input
        type="number"
        placeholder="Возраст"
        value={inputs.age}
        onChange={(e) => handleInputChange("age", e.target.value)}
      />
      <input
        type="text"
        placeholder="Телефон"
        value={inputs.phone}
        onChange={(e) => handleInputChange("phone", e.target.value)}
      />
    </div>
  );
}
