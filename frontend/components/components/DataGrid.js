import React, { useState, useRef, useEffect } from 'react'
import DataEditor, {
    GridCell,
    GridCellKind,
    GridColumn,
    NumberCell,
    Theme
} from "@glideapps/glide-data-grid";
import { useExtraCells } from "@glideapps/glide-data-grid-cells";
import { CRow, CButton, CCol, CFormInput, CPagination, CPaginationItem, CFormLabel } from '@coreui/react-pro';

const isValidDate = (dt) => {
    let d = new Date(dt)
    return d instanceof Date && !isNaN(d);
}

const DateToISOString = (dt) => {
    let d = new Date(dt)
    return Intl.DateTimeFormat("en-GB", { dateStyle: 'short', timeStyle: 'short' }).format(d);
}


const DataGrid = ({ rows, columns, title, deleteFunc, onCellEdited, addFunc, filterFunc, isEdit = false, editFunc, viewFunc, barcodeFunc, printFunc, showFilter = false, isActionColumns = true, width = 'auto',height = "60vh" }) => {

    const [pageCount, setPageCount] = useState(0)
    const [rowCount, setRowCount] = useState(50)
    let actionColumns = [
        {
            title: "Delete",
            id: "delete",
            width: 60,
            kind: GridCellKind.Custom,
            align: "center",
            editable: false
        }]
    if (isEdit) { 
        actionColumns = [{
            title: "View",
            id: "edit",
            width: 50,
            kind: GridCellKind.Custom,
            align: "center",
            editable: false
        }, ...actionColumns]
    }

    if (isActionColumns) {
        columns = [...columns, ...actionColumns]
    }
    const gridStyles = {
        borderRadius: "2px",
        border: ".5px solid #f0f0f2",
        height: height,
        margin: "15px 0",
        overflow: "hidden",
        position: "relative",
        boxShadow: "0",
        
        width: width
    };
    useEffect(() => {
        if(filterFunc !== undefined) filterFunc(filter, pageCount,rowCount);
    }, [pageCount,rowCount]);
    useEffect(() => {
    }, [rows]);
    const cellProps = useExtraCells();
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
                if (d !== null) {
                    let isDate = indexes[col].isdate
                    if (isDate) {
                        return {
                            kind: GridCellKind.Text,
                            allowOverlay: indexes[col].editable,
                            displayData: DateToISOString(d),
                            contentAlign: indexes[col].align,
                            data: d,
                        }
                    }
                }
                return {
                    kind: GridCellKind.Text,
                    allowOverlay: indexes[col].editable,
                    displayData: displayD,
                    contentAlign: indexes[col].align,
                    data: d,
                }
            case GridCellKind.Boolean:
                if (d === true) {
                    return {
                        kind: GridCellKind.Boolean,
                        displayData: displayD,
                        contentAlign: indexes[col].align,
                        data: d,
                        allowOverlay: indexes[col].editable,
                        themeOverride: indexes[col].themeOverride? indexes[col].themeOverride : {
                            accentColor: "#00FF00",
                            textMedium: "#00FF00"
                        }
                    }
                } else {
                    return {
                        kind: GridCellKind.Boolean,
                        displayData: displayD,
                        contentAlign: indexes[col].align,
                        data: d,
                        allowOverlay: indexes[col].editable,
                        themeOverride: indexes[col].themeOverride? indexes[col].themeOverride : {
                            accentColor: "#FF0000",
                            textMedium: "#FF0000"
                        }
                    }
                }
            case GridCellKind.Number:
                return {
                    kind: GridCellKind.Number,
                    displayData: displayD,
                    contentAlign: indexes[col].align,
                    data: d,
                    allowOverlay: indexes[col].editable
                }
            case GridCellKind.RowID:
                return {
                    kind: GridCellKind.RowID,
                    allowOverlay: indexes[col].editable,
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

                    case "print":
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
                                title: "🖶",
                                onClick: () => printFunc(dataRow)
                            },
                            themeOverride: {
                                baseFontStyle: "700 20px",
                            },
                        };
    
                        // title: "🗑",
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
                        return {
                            kind: GridCellKind.Custom,
                            cursor: "pointer",
                            allowOverlay: indexes[col].editable,
                            readonly: false,
                            data: {
                                kind: "dropdown-cell",
                                allowedValues: (indexes[col].selectValues) ?? ['Loading...'],
                                value: d
                            },
                        };
                }
            default:
                break;
        }
    }, [rows, columns]);
    const onRowAppended = React.useCallback(() => {
        addFunc()
    }, [columns.length, getContent, rows.length]);
    let filter = showFilter ? (
        <CCol md={3} style={{paddingLeft:0}}>
            <CFormInput inline="true"
                type="text"
                name=" filter"
                label=" Filter"
                placeholder="filter"
                onChange={(e) => {
                    let filter = e.target.value;
                    filterFunc(filter, pageCount,rowCount);
                }} />
        </CCol>) : <></>;
    let rowCountInput = showFilter ? (
        <CCol className='mt-1 px-2 ' md={1}>
            <CFormInput className="form-control form-control-sm" inline="true"
                type="text"
                name="rowCount"
                label="Row Count"
                placeholder="rowCount"
                value={rowCount}
                onChange={(e) => {
                    let val = e.target.value;
                    setRowCount(val);
                }} />
        </CCol>) : <></>;


    let paginationItems = [];
    paginationItems.push(<CPaginationItem active={((pageCount + 1) == 1)}>1</CPaginationItem>)
    paginationItems.push(<CPaginationItem >...</CPaginationItem>)
    if (pageCount > 0) {
        paginationItems.push(<CPaginationItem active>{pageCount + 1}</CPaginationItem>)
        paginationItems.push(<CPaginationItem >...</CPaginationItem>)
    }
    let isLastPage = false;
    if (rows.length < rowCount || rows.length > rowCount) {
        //last page
        isLastPage = true;
    }
    let pagination = showFilter ? (
        <CCol className='mt-2 pr-2  ' md={3} >
            <CFormLabel>
                Pagination
            </CFormLabel>
            <CPagination>
                <CPaginationItem onClick={() => { if (pageCount > 0) { setPageCount(pageCount - 1) } }}>Previous</CPaginationItem>
                {paginationItems}
                <CPaginationItem onClick={() => { if (!isLastPage) { setPageCount(pageCount + 1) } }}>Next</CPaginationItem>
            </CPagination>
        </CCol>) : <></>;
    let addButton = showFilter ? (
        <CCol md={9} className='mt-4 text-end '>
            <CButton size='lg' className='primary' onClick={addFunc} variant='outline' >Add {title}</CButton>
        </CCol>) :<></>;


    return (
        <>
        <div className="container-fluid">
            <CRow className="mb-2">{filter}  {addButton}</CRow>
            </div>
            <div style={gridStyles}  key={1}>
                <DataEditor
                    {...cellProps}
                    getCellContent={getContent}
                    rowHeight={40}
                    
                    columns={columns}
                    onPaste={true}
                    
                    onCellEdited={onCellEdited}
                    keybindings={{
                        clear: true,
                        copy: true,
                        downFill: true,
                        rightFill: true,
                        pageDown: true,
                        pageUp: true,
                        paste: false,
                        search: true,
                        selectAll: true,
                        selectColumn: true,
                        selectRow: true
                    }}
                    onsle
                    
                    smoothScrollX={true}
                    verticalBorder={true}
                    smoothScrollY={true}
                    height={gridStyles.height}
                    getCellsForSelection={true}
                    width={gridStyles.width}
                    rowMarkers={"clickable-number"}
                    onRowAppended={addFunc === undefined ? undefined : onRowAppended}
                    theme={
                        {
                        
                        textHeader: "rgba(1, 1, 1, 1)",
                        bgHeader:"white",
                        baseFontStyle: "13px ",
                        cellVerticalPadding: 4,
                        cellHorizontalPadding: 8,
                        headerbackgroundcolor:"white",
                        // borderColor:"transparent",
                        headerFontStyle:"bold 15px",
                    }}
                    rows={rows.length}
                        
                />
                
            </div>
            <CRow className="mb-2 row justify-content-start" style={{padding:'10px'}}> {pagination} {rowCountInput}</CRow>
            </>);
}

export default DataGrid;