import "./Table.css";
import type {TableHeaders} from "../../types/table.ts";
import type {Address, User} from "../../types/user.ts";
import type {SortOrder} from "../../types/sort.ts";

interface TableProps {
    data: any[]
    onSort: (key: keyof User | keyof Address) => void;
    sortConfig: { key: keyof User | keyof Address; order: SortOrder } | null;
}

const tableColumns: TableHeaders[] = [
    { key: 'lastName', label: 'Фамилия' },
    { key: 'firstName', label: 'Имя' },
    { key: 'maidenName', label: 'Отчество' },
    { key: 'age', label: 'Возраст' },
    { key: 'phone', label: 'Номер телефона' },
    { key: 'email', label: 'Email' },
    { key: 'city', label: 'Город' },
    { key: "country", label: 'Страна' },
];

export default function Table({ data = [], onSort, sortConfig }: TableProps) {
    function getCellValue(row: any, key: string) {
        if (key === 'city') return row.address?.city ?? '';
        if (key === 'country') return row.address?.country ?? '';
        return row[key] ?? '';
    }

    return (
        <table>
            <thead>
            <tr>
                {tableColumns.map((col) => (
                    <th
                        key={col.key} onClick={() => onSort(col.key)}
                    >
                        {col.label}
                        {sortConfig?.key === col.key && sortConfig?.order !== null && (
                            <span>{sortConfig.order === 'asc' ? ' 🔽' :  ' 🔼'}</span>
                        )}
                    </th>
                ))}
            </tr>
            </thead>
            <tbody>
            {data.map((row, rowIndex) => (
                <tr key={row.id ?? rowIndex}>
                    {tableColumns.map(col => (
                        <td key={col.key}>{getCellValue(row, col.key)}</td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
}