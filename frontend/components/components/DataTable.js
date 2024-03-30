import React, { useState, useRef, useEffect } from 'react'
import DataEditor, {
    GridCell,
    GridCellKind,
    GridColumn,
    NumberCell,
    Theme
} from "@glideapps/glide-data-grid";
import { CiSearch } from 'react-icons/ci'
import { useExtraCells } from "@glideapps/glide-data-grid-cells";
import { CRow, CButton ,CCol} from '@coreui/react-pro';

const isValidDate = (dt) => {
    let d = new Date(dt)
    return d instanceof Date && !isNaN(d);
}

const DateToISOString = (dt) => {
    let d = new Date(dt)
    return Intl.DateTimeFormat("en-GB", { dateStyle: 'short', timeStyle: 'short' }).format(d);
}


const DataTable = ({ rows, columns, editFunc, deleteFunc, addFunc, title }) => {
    const actionColumns = [{
        title: "Edit",
        id: "edit",
        width: 50,
        kind: GridCellKind.Custom,
        align: "center",
        editable: false
    },
    {
        title: "Delete",
        id: "delete",
        width: 50,
        kind: GridCellKind.Custom,
        align: "center",
        editable: false
    }]
    columns = [...columns, ...actionColumns]
    const getContent = React.useCallback((cell) => {
        const [col, row] = cell;
        const dataRow = rows[row];
        const indexes = columns;
        const id = indexes[col].id
        const kind = indexes[col].kind
        if (dataRow === undefined) {
            return {
                kind: kind,
                allowOverlay: false,
                displayData: "",
                contentAlign: indexes[col].align,
                data: "",
            }
        }
        const d = dataRow[id]
        let displayD = d ?? ""
        if (indexes[col].format !== undefined) {
            displayD = indexes[col].format(d)
        }
        displayD = displayD.toString()
        switch (kind) {
            case GridCellKind.Text:
                let isDate = isValidDate(d) && (d !== null)
                if (isDate) {
                    return {
                        kind: GridCellKind.Text,
                        allowOverlay: false,
                        displayData: DateToISOString(d),
                        contentAlign: indexes[col].align,
                        data: d,
                    }
                }
                return {
                    kind: GridCellKind.Text,
                    allowOverlay: false,
                    displayData: displayD,
                    contentAlign: indexes[col].align,
                    data: d,
                }
            case GridCellKind.Boolean:
                return {
                    kind: GridCellKind.Boolean,
                    displayData: displayD,
                    contentAlign: indexes[col].align,
                    data: d,
                    allowOverlay: false
                }
            case GridCellKind.Number:
                return {
                    kind: GridCellKind.Number,
                    displayData: displayD,
                    contentAlign: indexes[col].align,
                    data: d,
                    allowOverlay: false
                }
            case GridCellKind.RowID:
                return {
                    kind: GridCellKind.RowID,
                    allowOverlay: false,
                    displayData: d,
                    contentAlign: indexes[col].align,
                    data: d
                }
            case GridCellKind.Custom:
                switch (id) {
                    case "edit":
                        return {
                            kind: GridCellKind.Custom,
                            cursor: "pointer",
                            allowOverlay: false,
                            readonly: true,
                            data: {
                                kind: "button-cell",
                                backgroundColor: ["white", "white"],
                                color: ["#7663FF", "#7663FF"],
                                borderColor: "transparent",
                                borderRadius: 4,
                                title: "✎",
                                onClick: () => editFunc(dataRow)
                            },
                            themeOverride: {
                                baseFontStyle: "700 20px",
                            },
                        };
                    case "delete":
                        return {
                            kind: GridCellKind.Custom,
                            cursor: "pointer",
                            allowOverlay: false,
                            readonly: true,
                            data: {
                                kind: "button-cell",
                                backgroundColor: ["white", "white"],
                                color: ["#E63325", "#E63325"],
                                borderColor: "transparent",
                                borderRadius: 4,
                                title: "🗑",
                                onClick: () => deleteFunc(dataRow)
                            },
                            themeOverride: {
                                baseFontStyle: "700 20px",
                            },
                        };
                    default:
                        break;
                }
                break;
            default:
                break;
        }
    }, [rows]);
    const gridStyles = {
        borderRadius: "0px",
        border: "1px solid white",
        height: 400,
        margin: "24px 0",
        overflow: "hidden",
        position: "relative",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2), 0 0 1px rgba(0, 0, 0, 0.4)",
        width: "auto"
    };
    const cellProps = useExtraCells();
    return (
        <>
            <CRow className="mx-2 ">
                <CCol md={10}>
                <CButton color="success" className='col-auto' onClick={addFunc}> Add New {title} </CButton>
                </CCol>
            </CRow>
            <div style={gridStyles}>
                <DataEditor
                    {...cellProps}
                    getCellContent={getContent}
                    rowHeight={20}
                    columns={columns}
                    onPaste={true}
                    verticalBorder={true}
                    smoothScrollX={true}
                    smoothScrollY={true}
                    height={gridStyles.height}
                    getCellsForSelection={true}
                    keybindings={{
                        clear: true,
                        copy: true,
                        downFill: true,
                        rightFill: true,
                        pageDown: true,
                        pageUp: true,
                        paste: true,
                        search: true,
                        selectAll: true,
                        selectColumn: true,
                        selectRow: true
                    }}
                    width={gridStyles.width}
                    rowMarkers={"clickable-number"}
                    theme={{
                        textHeader: "rgba(26, 25, 31)",
                        baseFontStyle: "12px",
                        cellVerticalPadding: 0,
                        cellHorizontalPadding: 2
                    }}
                    rows={rows.length}
                />
            </div></>);
}

export default DataTable;