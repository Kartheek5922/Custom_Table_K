
import { useState, useEffect } from "react";
import TableComponent from "../TableComponent/TableComponent";

import { CompaniesDummyData } from "../../utils/DummyData";
import { GetTableColumnNames } from "../../utils/CRUDoperations";

import { HomeContainer, ContentContainer, Title } from "./HomeStyledComponents";

const hostedUrl = import.meta.env.VITE_HOSTED_API_URL
const DummyColumnNames = [
    { "name": "company_name", "value": "varchar" },
    { "name": "id", "value": "int" },
    { "name": "street", "value": "varchar" },
    { "name": "city", "value": "varchar" },
    { "name": "state_or_country", "value": "varchar" },
    { "name": "postal_code", "value": "int" },
    { "name": "phone_no", "value": "int" },
    { "name": "fax_no", "value": "int" },
    { "name": "contact_person", "value": "varchar" },
    { "name": "currency", "value": "varchar" }
]



export default function Home() {
    const [TableColumnNames, setTableColumnNames] = useState(DummyColumnNames)
    const [companiesData, setCompaniesData] = useState(CompaniesDummyData)

    // <<<<API CALL
    useEffect(() => {
        fetchGroupsData()
    }, [])

    // API CALL >>>>>

    const fetchGroupsData = async () => {
        try {
            const url = `${hostedUrl}/table/companies`
            const options = {
                method: 'GET',
            }

            const response = await fetch(url, options)
            const data = await response.json()
            const newColumnNames = await GetTableColumnNames('companies')
            if (data?.companies?.length === 0) {
                setCompaniesData(CompaniesDummyData)
            } else {
                setCompaniesData(data.companies)
            }
            newColumnNames?.columns?.length === 0 ?
                setTableColumnNames(DummyColumnNames) :
                setTableColumnNames(newColumnNames.columns)
        } catch {
            setTableColumnNames(DummyColumnNames)
            setCompaniesData(CompaniesDummyData)
            console.log('Error fetching Companies Data')
        }
    }

    return (
        <HomeContainer>
            <ContentContainer>
                <Title>Companies Table Component</Title>

                <TableComponent
                    tableData={companiesData}
                    recordsPerPage={50}
                    tableName={'companies'}
                    TableColumnNames={TableColumnNames}
                    setTableColumnNames={setTableColumnNames}
                    id={'id'}
                    showConfigurefieldsBtn={true}
                    title='Companies'
                    fetchTableData={fetchGroupsData}
                    rdtColValue={'id'}
                    redirectionPath={`/company/`}
                />
            </ContentContainer>
        </HomeContainer>
    )
}