import styled, { keyframes } from "styled-components";
import BootstrapDropdown from "react-bootstrap/Dropdown";


const fadeIn = keyframes`
    from {
    opacity: 0;
    transform: translateY(-10px); /* Move the dropdown up initially */
    }
    to {
    opacity: 1;
    transform: translateY(0); /* Move the dropdown down */
    }
`

const slideIn = keyframes` //animation source
    from {
    opacity: 0;
    transform: translateX(-10px); /* Move the sub-menu to the left initially */
    }
    to {
    opacity: 1;
    transform: translateX(0); /* Move the sub-menu to its original position */
    }
`

export const MainContainer = styled.div`
    max-width: 100%;
    max-height: 100%;
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0.5rem;
    gap: 0.1rem;
    border-radius: 0.7rem;
    box-shadow: 0 0 0.5rem 0.2rem #ccc;
`

export const TableContainer = styled.div`
    background-color: #fff;
    color: #000;
    width: 100%;
    max-height: 78vh;
    overflow-y: auto;
    font-size: 13px;

    &::-webkit-scrollbar{
        width: 7px;
    }
    &::-webkit-scrollbar-track{
        background: transparent;
    }
`;

export const CustomTable = styled.table`
    width: 100%;
    height: fit-content;
    flex-grow: 1; 
    margin: 0px;
    background-color: #fff;
    border-collapse: collapse;
`;

export const CustomThead = styled.thead`
    background-color: #4a4e69;
    color: #ffffff;
    padding: 10px;
`;

export const CustomTh = styled.th`
    border: 1px solid #dddddd;
    padding: 8px;
    text-align: left;
    margin: 5px;
    height: 20%;
    background-color: #363946;
    color: #fff;
    border: none;
    position: sticky;
    top: 0;
`;

export const CustomTr = styled.tr`
    border-bottom: 1px solid #e5e5e5;
    overflow-y: auto;
    background-color: ${({ isSelectedRow }) => isSelectedRow ? '#caf0f8' : 'tranparent'};
    
    &:hover {
        background-color:  ${({ isSelectedRow }) => isSelectedRow ? '#f0fff1' : '#e5e5e5'};
    }
`;

export const HeadTr = styled(CustomTr)`
    width: 100%;
    position: relative;
    /* display: flex; */
    /* width: 100%; */
`

export const CustomTbody = styled.tbody`
`;

export const CustomTd = styled.td`
    text-align: left;
    border: none ;
    text-align: left;
    padding: 2px 8px 2px 8px;
    margin: 5px;
    height: 40px;
`;

export const ThContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2%;
    
    &:hover {
        div{
            opacity: 1;
        }
    }
`

export const CheckBoxTag = styled.input`
    background-color: #fff;
    color: #fff;
`;

export const ColumnOptions = styled.div`
    padding: 0rem;
    margin: 0;
    width: fit-content;
    max-height: 100%;
    border-radius: 0%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.3rem;
    border: none;
    outline: none;
    background-color: transparent;
    color: transparent;
    opacity: 0;
`

export const ConfigureButton = styled.button`
    padding: 0.5rem;
    margin: 0;
    width: fit-content;
    cursor: pointer;
    outline: none;
    border: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    
    &:hover{
        background-color: #e5e5e5;
    }
`

export const BackBtn = styled.button`
    height: 30px;
    width: 30px;
    padding: 0;
    outline: none;
    margin: 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: transparent;
    margin-right: 10px;
    border-radius: 50%;
    border: none;
    color: #000;
    cursor: pointer;

    &:hover {
        outline: none;
        background-color: #f5f5f5;
    }
`;

export const HeaderContainer = styled.div`
    height: fit-content;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 2px 2px 2px 0px ;
    border-radius: 5px;
`

export const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    border-radius: 10px;;
`;

export const FilterBtn = styled.button`
    height: 30px;
    width: 30px;
    padding: 0;
    outline: none;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    margin-right: 10px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    color: #000;

    &:hover {
        outline: none;
        border: none;
        background-color: #e9ecef;
    }
`;



export const MultiLevelDropdownContainer = styled.div`
    position: relative;
    display: inline-block;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: row;
    height: 100%;
    width: fit-content;
    text-decoration: underline;
    
    &:hover {
        color: blueviolet;
    }
`;

export const DropdownMenu = styled.ul`
    list-style: none;
    padding: 0;
    margin: 1px;
    position: absolute;
    top: 100%;
    left: 0;
    display: none;
    background-color: #fff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    z-index: 1;
    width: 200px;
    border-radius: 3px;
    opacity: 0;
    animation: ${fadeIn} 0.3s ease-in-out;

    ${MultiLevelDropdownContainer}:hover & {
        display: block;
        opacity: 1;
    }
`;

export const DropdownToggle = styled.div`
    cursor: pointer;
    height: fit-content;
    width: fit-content;
    font-size: 22px;
    font-weight: bold;
`;

export const MenuItem = styled.li`
    display: flex;
    padding: 6px 10px 6px;
    align-items: center;
    color: #000;
    &:hover {
        background-color: #f0f0f0;
    }

    .plus {
        margin: 0;
        padding: 0;
        position: absolute;
        right: 10px;
    }
`;


export const SubMenu = styled.ul`
    position: absolute;
    top: 0;
    left: 100%;
    display: none;
    min-width: 100px;
    z-index: 1;
    width: 150px;
    background-color: #fff;
    margin: 2px;
    list-style-type: none;
    padding-left: 0px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    opacity: 0;
    animation: ${slideIn} 0.3s ease-in-out;

    ${MenuItem}:hover & {
        display: block;
        opacity: 1;
    }
`;

export const SubMenuItem = styled.li`
    padding: 5px;
    &:hover {
        background-color: #f0f0f0;
    }
`;

export const ActionsContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 20%;
`;

export const SearchInput = styled.input`
    border-radius: 80px;
    height: 100%;
    outline: none;
    /* border: 1px solid #6c757d; */
    padding: 0.5rem 0.8rem;
    background-color: #fff;
    color: #000;
    margin: 0;
    flex-grow: 1;
    border: none;
`;

export const FiltersContainer = styled.div`
    width: 100%;
    min-height: 10vh;
    max-height: 30vh;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    overflow: auto;
    gap: 0.5rem;
    z-index: 1000;
`

export const FilterContainer = styled.div`
    display: flex;
    width: fit-content;
    max-width: 100%;
    align-items: center;
    margin: 0px;
    gap: 0.5rem;
    padding: 0.3rem 0.5rem;
    
    &:hover{
        background-color: #f0f0f0;
    }
`;

export const AndBtn = styled.button`
    width: fit-content;
    outline: none;
    background-color: #fff;
    color: #000;
    padding: 0.3rem;
    font-size: 1rem;
    border-radius: 50%;
    cursor: pointer;
    /* border: none; */
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const AndOrBtnClose = styled.button`
    outline: none;
    background-color: #fff;
    color: red;
    padding: 0.2rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const OrBtn = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    color: #000;
    font-size: 1rem;
    text-align: center;
    padding: 0.3rem;
    border-radius: 50%;
`;

export const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 0  0.5rem 0 0;
    margin: 0;
    gap: 0.2rem;
    border: 1px solid #ccc;
    border-radius: 50px;
    background-color: #c7f9cc;
    flex-grow: 1;
    
    &:focus-within{
        box-shadow: 0 0 0.2rem 0.1rem #007200;
    }
`

export const ReloadBtn = styled.button`
  height: 100%;
  width: fit-content;
  padding: 5px;
  margin: 0;
  outline: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: #ccc;
  }
`

export const TableFooter = styled.div`
    width: 100%;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const PaginationBtnsContainer = styled.div`
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
`

export const PaginationArrBtn = styled.button`
    padding: 0.25rem;
    margin: 0;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    color: ${({ isFirstPage, isLastPage }) => isFirstPage || isLastPage ? '#ccc' : '#000'};
    
    &:hover {
        background-color:${({ isFirstPage, isLastPage }) => isFirstPage || isLastPage ? 'transparent' : '#E5E5E5'};
    }
`

export const ColumnOptionsPopup = styled.div`
    display: flex;
    flex-direction: column; 
    padding: '10px';
    color: #000 !important;
    gap: 0.4rem;
`

export const SortOptBtn = styled.button`
    padding: 0rem;
    outline: none;
    color: #fff !important;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.3rem;
    background-color: rgba(255, 255, 255 , 0.2);
    
    &:hover {
        /* color: #000 !important; */
    }
`

export const ClearSortingsBtn = styled.button`
    padding: 0;
    margin: 0;
    border: none;
    cursor: pointer;
    text-decoration: underline;
    margin-left: 2rem;
    
`

export const RowActionsContainer = styled.div`
    width: fit-content;
    height: 100%; 
    display: ${({ isSelectedRows }) => isSelectedRows ? 'flex' : 'none'};
    align-items: center;
    gap: 0.5rem;
    
    background-color: #c2f8cb;
    padding: 0 ;
    border-radius: 50px;
`
export const RowActionBtn = styled.button`
    cursor: pointer;
    padding: 0.3rem;
    margin: 0;
    border-radius: 50%;
    background-color: transparent;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    
    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }
`