import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Select from 'react-select';
import { GetTableData, UpdateSelectedColumns } from '../../utils/CRUDoperations';
// import { Tooltip } from 'react-tooltip';

// import Checkbox from '@mui/material/Checkbox';

import { GrConfigure } from "react-icons/gr";
import { IoIosArrowBack, IoIosArrowForward, IoIosArrowRoundUp, IoIosArrowRoundDown, IoMdStar, IoMdMove } from "react-icons/io";
import { RiFilter2Line } from "react-icons/ri";
import { GoPlus } from "react-icons/go";
import { IoClose, IoReloadSharp } from "react-icons/io5";
import { FaGripLinesVertical } from "react-icons/fa6";
import { LuAmpersand } from "react-icons/lu";
import { FiSearch } from "react-icons/fi";
import { MdOutlineFilterListOff, MdDelete } from "react-icons/md";

import ConfigureFields from '../ConfigureFields/ConfigureFields';

import {
    TableContainer, CustomTable, CustomThead, CustomTh,
    CustomTr, CustomTbody, CustomTd, CheckBoxTag, MainContainer,
    ConfigureButton, BackBtn, HeaderContainer, TitleContainer,
    FilterBtn, MultiLevelDropdownContainer, DropdownToggle, DropdownMenu,
    MenuItem, SubMenu, SubMenuItem, ActionsContainer, SearchInput,
    FilterContainer, FiltersContainer, SearchContainer,
    OrBtn, AndBtn, AndOrBtnClose, ReloadBtn, TableFooter, PaginationBtnsContainer,
    PaginationArrBtn, ColumnOptions, HeadTr, ThContent, ColumnOptionsPopup,
    SortOptBtn, ClearSortingsBtn, RowActionsContainer, RowActionBtn
} from './StyledComponents'

const conditions = ['Like', 'Not Like', 'Equals To', 'Not Equals To']

// <<<<<Model Styles
const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
        top: '6%',
        left: '4%',
        right: '2%',
        bottom: '8%',
        borderRadius: '10px',
        width: '92vw',
        height: '87vh',
        overflow: 'hidden',
        padding: '3px',
        zIndex: '5'
    },
}
// Model Styles>>>>>

const selectCustomStyles = {
    control: (provided) => ({
        ...provided,
        // border: 'none', // Remove border from control
        boxShadow: 'none', // Remove box-shadow
        borderRadius: '50px',
        '&:hover': {
            // border: 'none', // Remove border on hover
        },
    }),
    singleValue: (provided) => ({
        ...provided,
        marginRight: '0', // Remove margin-right to eliminate space
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        padding: '0.2rem', // Remove padding from the indicator
    }),
    indicatorSeparator: () => ({
        display: 'none', // Hide the separator line between the label and arrow
    }),
};

export default function TableComponent({
    // selectedColumns,
    // filteredData,
    // recordsPerPage,
    id, tableData, TableColumnNames, setTableColumnNames,
    showConfigurefieldsBtn, selectedRows, tableName, title,
    fetchTableData, maxPages = 10, rdtColValue, redirectionPath
}) {
    const [recievedTableData, setTableData] = useState(tableData)
    const [selectedRowIds, setselectedRowIds] = useState([])
    const [selectedColumns, setSelectedColumns] = useState(TableColumnNames)
    const [isConfigureActive, setConfigure] = useState(false)
    const [isFilterActive, setFilterStatus] = useState(false)
    const [searchingText, setSearchingText] = useState('')
    const [allTableFields, setAllTableFields] = useState(TableColumnNames || [])
    const [filterConditions, setFilterConditions] = useState([
        { filter: '', condition: '', searchText: '', logicalOperator: '', filterDisplayText: '' }
    ]);
    const [isLoading, setIsLoading] = useState(false)
    const [currPage, setCurrentPage] = useState(1)
    const [isSortingsApllied, setSortingsApplied] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        setTableData(tableData)
        setAllTableFields(TableColumnNames || [])
        // getSelectedColumns()
    }, [tableData, TableColumnNames])

    useEffect(() => {
        updateSelectedColumns()
    }, [selectedColumns])


    const SelectedRowActionsList = ['Delete', 'Mark As Favorite', 'Move', 'Copy']

    const convertName = (name) => {
        const nameArr = name.split('_')
        const convertedName = nameArr.map((item,) => item[0].toUpperCase() + item.slice(1))
        return (convertedName.join(' '))
    }

    const OnSelectedRowActions = (action) => {
        if (action === 'Delete') {
            const x = recievedTableData.filter(item => !selectedRows.includes(item.ticket_id))
            setTableData(x)
        }
        // setIsAllCheckBoxActive(false);
    }

    const updateSelectedColumns = async () => {
        if (selectedColumns.length > 0) {
            // console.log('updating selectedColumns')
            await UpdateSelectedColumns(tableName, JSON.stringify(selectedColumns))
        }
    }

    const getSelectedColumns = async () => {
        const columns = await GetTableData('table_selected_columns')
        const displayColumns = columns?.table_selected_columns?.filter(record => {
            // console.log(record.table_name, tableName)
            return record.table_name === tableName
        })[0]?.selected_columns || []

        setSelectedColumns(displayColumns)
    }

    const SelectAllCheckBox = (e) => {
        const selectAll = e.target.checked
        const selectedRowIds = tableData.map((item) => item.id)
        if (selectAll) {
            setselectedRowIds(selectedRowIds)
        } else {
            setselectedRowIds([])
        }
    }

    const CheckboxChange = (ID) => {
        // console.log(ID)
        if (!selectedRowIds.includes(ID)) {
            setselectedRowIds([...selectedRowIds, ID])
        } else {
            setselectedRowIds(selectedRowIds.filter(item => item !== ID))
        }
    }

    const camelCaseToReadable = (columns) => {
        const readableColumns = columns.map((column) => {
            return column.name
                .replace(/_/g, ' ')  // Replace underscores with space
                .replace(/([A-Z])/g, ' $1')  // Add space before capital letters
                .replace(/^./, (str) => str.toUpperCase()) // Capitalize the first letter

                // Capitalize the first letter of each word
                .replace(/\b\w/g, (str) => str.toUpperCase())
        }
        );

        return readableColumns;
    }

    const closeConfig = () => {
        setConfigure(false)
    }

    const OnSetFilter = (index, event) => {
        // console.log(event.value)
        const text = event.value.name;
        // Capitalize the filter text
        const snakeCase = text.replace(/([A-Z])/g, (match) => match.toLowerCase());
        // Create a copy of filterConditions array
        const Filters = [...filterConditions];
        // Update the specific filter at the given index
        Filters[index] = {
            ...Filters[index],
            filter: snakeCase,
            filterDisplayText: text
        };
        // Update state with the modified Filters array
        setFilterConditions(Filters);
    };

    const OnsetCondition = (index, event) => {
        const text = event.value;

        // Create a copy of filterConditions array
        const Filters = [...filterConditions];
        // Update the specific filter at the given index with the new condition
        Filters[index] = {
            ...Filters[index],
            condition: text
        };
        // Update state with the modified Filters array
        setFilterConditions(Filters);
    };

    const onSetSearchText = (e, index) => {
        const text = e.value;
        const filters = [...filterConditions];
        filters[index] = { ...filters[index], searchText: text };
        setFilterConditions(filters);
    };

    const onAnd = (index) => {
        if (filterConditions.length < 5) {
            const updatedConditions = [...filterConditions];
            updatedConditions[index] = {
                ...updatedConditions[index],
                logicalOperator: 'AND'
            };

            setFilterConditions([...updatedConditions, { filter: '', condition: '', searchText: '', logicalOperator: '' }]);
        }
    };

    const onOr = (index) => {
        if (filterConditions.length < 5) {
            const updatedConditions = [...filterConditions];
            updatedConditions[index] = {
                ...updatedConditions[index],
                logicalOperator: 'OR'
            };

            setFilterConditions([...updatedConditions, { filter: '', condition: '', searchText: '', logicalOperator: '' }]);
        }
    }

    const RemoveFilterContainer = (index) => {
        const Filters = [...filterConditions]
        if (Filters.length > 1) {
            Filters.splice(index, 1)
            setFilterConditions(Filters)
        }
    }

    // Toggling Filter container visibility
    const OnFilter = () => {
        setFilterStatus(!isFilterActive)
    }

    // go back button functionality
    const OnBack = () => {
        // Navigate to a specific route
        navigate(-1);
    };

    // handling searching text on change
    const onChangeSearchText = (e) => {
        const newText = e.target.value;
        setSearchingText(newText);

        const filteredData = tableData.filter((row) => {
            return Object.keys(row).some((key) => {
                // console.log(key, row[key])
                if (row && key && row[key]) {
                    return (row[key]
                        .toString() // Convert the value to string in case it's not
                        .toLowerCase()
                        .includes(newText.toLowerCase())
                    )
                }
            }
            )
        }
        );

        setTableData(filteredData)
    };

    const sortTableData = (fieldName, order) => {
        // const  = 
        // console.log(fieldName, order)
        const readableToCamelCase = (column) => {
            const camelCaseColumns = column
                .toLowerCase() // Convert the entire string to lowercase first
                .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
                    index === 0 ? match.toLowerCase() : match.toUpperCase().trim()  // Capitalize letters after the first word, remove spaces
                );


            return camelCaseColumns;
        };

        const sortedData = [...tableData].sort((a, b) => {
            let valueA = a[readableToCamelCase(fieldName)]
            let valueB = b[readableToCamelCase(fieldName)]
            // console.log(a, b, valueA, valueB, fieldName)

            // If sorting by numbers
            if (typeof valueA === 'number' && typeof valueB === 'number') {
                // console.log(order === 'asc' ? valueA - valueB : valueB - valueA)
                return order === 'asc' ? valueA - valueB : valueB - valueA;
            }

            // If sorting by strings
            if (typeof valueA === 'string' && typeof valueB === 'string') {
                // console.log(order === 'asc'
                //     ? valueA.localeCompare(valueB)
                //     : valueB.localeCompare(valueA))

                return order === 'asc'
                    ? valueA.localeCompare(valueB)
                    : valueB.localeCompare(valueA);
            }

            return 0; // In case of unknown type, don't change order
        });
        // console.log(sortedData)

        setTableData(sortedData); // Update the state with the sorted data
        setSortingsApplied(true)
    };


    const onReloadTableData = () => {
        setIsLoading(true)
        fetchTableData()
        setTableData(tableData)
        setIsLoading(false)
    }

    const onNextPage = () => {
        if (currPage < maxPages) {
            setCurrentPage(currPage + 1)
        }
    }

    const onPreviousePage = () => {
        if (currPage !== 1) {
            setCurrentPage(currPage - 1)
        }
    }

    const clearSortings = () => {
        setSortingsApplied(false)
        setTableData(tableData)
    }

    console.log(selectedColumns)

    return (
        <MainContainer>
            <HeaderContainer>
                <TitleContainer>
                    <BackBtn onClick={OnBack} title='Back'>
                        <IoIosArrowBack size={26} />
                    </BackBtn>

                    <FilterBtn onClick={OnFilter} style={{ background: isFilterActive ? '#adb5bd' : '' }}>
                        <RiFilter2Line size={20} />
                    </FilterBtn>

                    <MultiLevelDropdownContainer>
                        <DropdownToggle>{title}</DropdownToggle>

                        <DropdownMenu>
                            <MenuItem>
                                Export
                                <IoIosArrowForward className="plus" />
                                <SubMenu>
                                    <SubMenuItem>PDF</SubMenuItem>
                                    <SubMenuItem>CSV</SubMenuItem>
                                    <SubMenuItem>Excel</SubMenuItem>
                                </SubMenu>
                            </MenuItem>

                            <MenuItem>Selected Row Actions
                                <IoIosArrowForward className="plus" />
                                <SubMenu>
                                    {SelectedRowActionsList.map((each) => (
                                        <SubMenuItem key={each} onClick={() => OnSelectedRowActions(each)} >{each}</SubMenuItem>
                                    ))}
                                </SubMenu>
                            </MenuItem>

                            {/* <Link to='/create-department'> */}
                            <MenuItem >
                                Create New
                                <GoPlus className="plus" />
                            </MenuItem>
                            {/* </Link> */}
                        </DropdownMenu>
                    </MultiLevelDropdownContainer>

                    <ReloadBtn type="button" title="Reload" onClick={onReloadTableData}>
                        <IoReloadSharp size={20} />
                    </ReloadBtn>

                    {isSortingsApllied &&
                        <ClearSortingsBtn
                            onClick={clearSortings}
                            title='Clear All Sortings'
                        >
                            <MdOutlineFilterListOff size={20} />
                        </ClearSortingsBtn>}
                </TitleContainer>

                <RowActionsContainer isSelectedRows={selectedRowIds.length > 0}>
                    <RowActionBtn type='button' title='Delete Record (s)'>
                        <MdDelete size={18} />
                    </RowActionBtn>

                    <RowActionBtn type='button' title='Move Record (s)'>
                        <IoMdMove size={18} />
                    </RowActionBtn>

                    <RowActionBtn type='button' title='Star Record (s)'>
                        <IoMdStar size={18} />
                    </RowActionBtn>
                </RowActionsContainer>

                <ActionsContainer>
                    {showConfigurefieldsBtn === true &&
                        <ConfigureButton
                            title='Configure Fields'
                            type='button'
                            onClick={() => setConfigure(true)}
                        >
                            <GrConfigure />
                        </ConfigureButton>
                    }

                    <SearchContainer>
                        <SearchInput
                            type="text"
                            placeholder="Search"
                            onChange={onChangeSearchText}
                            value={searchingText}
                            style={{
                                borderRight: '2px solid #007200',
                            }}
                        />

                        <FiSearch
                            size={20}
                            onClick={onChangeSearchText}
                            style={{ cursor: 'pointer' }}
                        />
                    </SearchContainer>
                </ActionsContainer>
            </HeaderContainer>

            {/* <FiltersContainer> */}
            {isFilterActive &&
                filterConditions.map((eachArray, index) => (
                    <FilterContainer key={index}>
                        <Select
                            defaultvalue={eachArray.filterDisplayText ?
                                { label: convertName(eachArray.filterDisplayText), value: eachArray.filterDisplayText }
                                : { label: 'Select Filter', value: '--' }}
                            onChange={(event) => OnSetFilter(index, event)}
                            options={selectedColumns.map(column => ({ label: convertName(column.name), value: column }))}
                            placeholder="Select Filter"
                            styles={selectCustomStyles}
                        />

                        <Select
                            defaultvalue={eachArray.condition ?
                                { label: convertName(eachArray.condition), value: eachArray.condition }
                                : { label: 'Select Condition', value: '--' }}
                            onChange={(e) => OnsetCondition(index, e)}
                            options={conditions.map(condition => ({ label: convertName(condition), value: condition }))}
                            placeholder="Select Condition"
                            styles={selectCustomStyles}
                        />

                        <SearchInput
                            type="text"
                            placeholder="Value"
                            value={eachArray.searchText}
                            onChange={(e) => onSetSearchText(e, index)}
                        />

                        <AndBtn
                            style={{
                                background: eachArray.logicalOperator === 'AND' ? '#efd3d7' : '#fff'
                            }}
                            onClick={() => onAnd(index)} id={`And-${index}`}
                        >
                            <LuAmpersand size={15} />
                        </AndBtn>

                        <OrBtn style={{
                            background: eachArray.logicalOperator === 'OR' ? '#efd3d7' : '#fff'
                        }}
                            onClick={() => onOr(index)} id={`Or-${index}`}
                        >
                            <FaGripLinesVertical size={15} />
                        </OrBtn>

                        {index !== 0 &&
                            <AndOrBtnClose onClick={() => RemoveFilterContainer(index)}>
                                <IoClose size={20} />
                            </AndOrBtnClose>}
                    </FilterContainer>
                ))
            }
            {/* </FiltersContainer> */}

            {showConfigurefieldsBtn === true &&
                <ConfigureFields
                    isConfigureActive={isConfigureActive}
                    closeConfig={closeConfig}
                    customStyles={customStyles}

                    TableColumnNames={allTableFields?.map((field, index) => ({ ...field, id: index }))}
                    allFields={allTableFields}
                    setSelectedColumns={setSelectedColumns}
                    selectedColumns={selectedColumns}
                    recievedTableData={recievedTableData}
                    setTableColumnNames={setAllTableFields}
                />
            }

            <TableContainer>
                {isLoading ?
                    <div>Data Lolading...</div> :

                    <CustomTable id='myTable'>
                        <CustomThead>
                            <CustomTh style={{ width: '40px', zIndex: isConfigureActive || isFilterActive ? '0' : '1' }}>
                                <input
                                    style={{ color: '#fff' }}
                                    size='small'
                                    type="checkbox"
                                    onChange={(e) => SelectAllCheckBox(e)}
                                />
                            </CustomTh>

                            {selectedColumns?.length > 0 && (typeof (selectedColumns[0]) !== 'string') &&
                                camelCaseToReadable(selectedColumns).map((column) => {
                                    return <CustomTh key={column} >
                                        <ThContent>
                                            <span>{column}</span>

                                            <ColumnOptions>
                                                <SortOptBtn
                                                    type='button'
                                                    id={column}
                                                    onClick={() => sortTableData(column, 'asc')}
                                                >
                                                    <IoIosArrowRoundUp size={20} style={{ fontWeight: '1000' }} />
                                                </SortOptBtn>

                                                <SortOptBtn
                                                    type='button'
                                                    id={column}
                                                    onClick={() => sortTableData(column, 'desc')}
                                                >
                                                    <IoIosArrowRoundDown size={20} />
                                                </SortOptBtn>
                                            </ColumnOptions>

                                        </ThContent>
                                    </CustomTh>
                                })}
                        </CustomThead>

                        <CustomTbody>
                            {/* filteredData().slice(0, recordsPerPage) */}
                            {
                                recievedTableData?.length > 0 ?
                                    recievedTableData.map((row, index) => (
                                        <CustomTr
                                            key={index}
                                            style={{}}
                                            isSelectedRow={selectedRowIds.includes(row[`${id}`])}
                                        >
                                            <CustomTd>
                                                <input
                                                    style={{ zIndex: '0' }}
                                                    size='small'
                                                    type="checkbox"
                                                    checked={selectedRowIds.includes(row[`${id}`])}
                                                    onChange={() => CheckboxChange(row[`${id}`])}
                                                />
                                            </CustomTd>

                                            {selectedColumns.map((column) => (
                                                rdtColValue === column.name ?
                                                    <CustomTd
                                                        key={column.name}
                                                        style={{
                                                            textDecoration: 'underline',
                                                            color: 'blue',
                                                            cursor: 'pointer'
                                                        }}
                                                        onClick={() => navigate(`${redirectionPath}${row[id]}`)}
                                                    >
                                                        {typeof row[column.name] === 'object' ? `${row[column.name]}` : row[column.name]}
                                                    </CustomTd> :
                                                    <CustomTd key={column.name} >
                                                        {
                                                            typeof row[column.name] === 'object' ? `${row[column.name]}` : row[column.name]
                                                        }
                                                    </CustomTd>
                                            ))}
                                        </CustomTr>
                                    )) :
                                    <div
                                        style={{
                                            width: '100vw',
                                            display: 'felx',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            padding: '1rem'
                                        }}>
                                        No Data Is Available
                                    </div>
                            }
                        </CustomTbody>
                    </CustomTable>}
            </TableContainer>

            <TableFooter>
                <span>Page {currPage}</span>

                <PaginationBtnsContainer>
                    <PaginationArrBtn
                        type='button'
                        title='Previouse'
                        isFirstPage={currPage === 1}
                        onClick={onPreviousePage}
                    >
                        <IoIosArrowBack size={20} />
                    </PaginationArrBtn>

                    <span style={{ width: '20px', textAlign: 'center' }}>{currPage}</span>

                    <PaginationArrBtn
                        type='button'
                        title='Next'
                        isLastPage={currPage === maxPages}
                        onClick={onNextPage}
                    >
                        <IoIosArrowForward size={20} />
                    </PaginationArrBtn>
                </PaginationBtnsContainer>
            </TableFooter>
        </MainContainer>
    )
}