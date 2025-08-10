import "./Table.css";
import type {TableHeaders} from "../../types/table.ts";
import type {Address, User} from "../../types/user.ts";
import type {SortOrder} from "../../types/sort.ts";
import {useEffect, useRef, useState} from "react";
import * as React from "react";

interface TableProps {
    data: any[]
    onSort: (key: keyof User | keyof Address) => void;
    sortConfig: { key: keyof User | keyof Address; order: SortOrder } | null;
    onRowClick: (user: User) => void;
}


const tableColumns: TableHeaders[] = [
    { key: 'lastName', label: 'Фамилия' },
    { key: 'firstName', label: 'Имя' },
    { key: 'maidenName', label: 'Отчество' },
    { key: 'gender', label: 'Пол' },
    { key: 'age', label: 'Возраст' },
    { key: 'phone', label: 'Номер телефона' },
    { key: 'email', label: 'Email' },
    { key: 'city', label: 'Город' },
    { key: "country", label: 'Страна' },
];

const sortableColumns: (keyof User)[] = [
    'lastName',
    'firstName',
    'maidenName',
    'age',
    'gender',
    'phone'
];

export default function Table({ data = [], onSort, sortConfig, onRowClick }: TableProps) {
    const [colWidths, setColWidths] = useState<Record<string, number>>(() => {
        const initial: Record<string, number> = {};
        tableColumns.forEach((col) => {
            initial[col.key] = 150;
        });
        return initial;
    });


    const resizingCol = useRef<string | null>(null);
    const startX = useRef(0);
    const startWidth = useRef(0);

    useEffect(() => {
        function handleMouseMove(e: MouseEvent) {
            if (!resizingCol.current) return;
            const deltaX = e.clientX - startX.current;
            const newWidth = Math.max(50, startWidth.current + deltaX);

            setColWidths((prev) => ({
                ...prev,
                [resizingCol.current!]: newWidth,
            }));
        }

        function handleMouseUp() {
            resizingCol.current = null;
            document.body.style.userSelect = "";
        }

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, []);

    function handleMouseDown(e: React.MouseEvent, key: string) {
        resizingCol.current = key;
        startX.current = e.clientX;
        startWidth.current = colWidths[key];
        document.body.style.userSelect = "none";
    }

    function getCellValue(row: any, key: string) {
        if (key === 'city') return row.address?.city ?? '';
        if (key === 'country') return row.address?.country ?? '';
        return row[key] ?? '';
    }

    return (
        <table>
            <thead>
            <tr>
                {tableColumns.map((col) => {
                    const isSortable = sortableColumns.includes(col.key as keyof User);
                    return (
                    <th
                        key={col.key} onClick={() => isSortable && onSort(col.key)}
                        style={{
                            width: colWidths[col.key],
                            cursor: isSortable ? "pointer" : "default",
                            position: "relative",
                            minWidth: 50,
                            maxWidth: 1400 / tableColumns.length,
                    }}
                    >
                        {col.label}
                        {isSortable && sortConfig?.key === col.key && sortConfig?.order !== null && (
                            <span>{sortConfig.order === 'asc' ? ' 🔽' :  ' 🔼'}</span>
                        )}
                        <div
                            onMouseDown={(e) => handleMouseDown(e, col.key)}
                            style={{
                                position: "absolute",
                                right: 0,
                                top: 0,
                                height: "100%",
                                width: "6px",
                                cursor: "col-resize",
                                userSelect: "none",
                                zIndex: 10,
                            }}
                        />
                    </th>
                    );
                })}
            </tr>
            </thead>
            <tbody>
            {data.map((row, rowIndex) => (
                <tr key={row.id ?? rowIndex} onClick={() => onRowClick(row)}>
                    {tableColumns.map(col => (
                        <td key={col.key}>{getCellValue(row, col.key)}</td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
}