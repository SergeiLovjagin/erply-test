import axios from "axios";
import {SubmitDataType} from "../redux/dataReducer";

export const loginApi = {
    async data(values: { clientCode: string, username: string, password: string }) {
        const {clientCode, username, password} = values
        return await axios.post(`https://${clientCode}.erply.com/api/?clientCode=${clientCode}&username=${username}&password=${password}&request=verifyUser&sendContentType=1`, {}, {})
    }
}
export const getData = {
    async getWarehouses(clientCode: string, sessionKey: string) {
        return await axios.post<getWarehousesResponseType>(`https://${clientCode}.erply.com/api/?clientCode=${clientCode}&sessionKey=${sessionKey}&request=getWarehouses&sendContentType=1`)
    },
    async getPayments(clientCode: string, sessionKey: string) {
        return await axios.post<getPaymentsResponseType>(`https://${clientCode}.erply.com/api/?clientCode=${clientCode}&sessionKey=${sessionKey}&request=getPaymentTypes&sendContentType=1`)
    },
    async saveDataToSafa(values: SubmitDataType, identityToken: string) {
        return await axios.post<{ message: string, statusCode: string }>(`https://api-cafa-us.erply.com/configuration`, {
                "application": "test-assignment",
                "level": "Warehouse",
                "level_id": "1",
                "name": values.companyName,
                "value": {
                    companyName: values.companyName,
                    websiteUrl: values.websiteUrl,
                    warehouse: values.warehouse,
                    email: values.email,
                    paymentGateway: values.paymentGateway,
                    erplyPaymentType: values.erplyPaymentType
                }
            }, {
                headers: {jwt: identityToken}
            }
        )
    },
    async getDataFromSafa(identityToken: string) {
        return await axios.get(`https://api-cafa-us.erply.com/configuration/test-assignment`,
            {
                headers: {jwt: identityToken}
            }
        )
    },
}

type getPaymentsResponseType = {
    records: [
        {
            added: string
            id: string
            lastModified: string
            name: string
            print_name: string
            quickBooksDebitAccount: string
            type: string
        }
    ],
    status: Object

}
type getWarehousesResponseType = {
    records: [
        {
            ZIPcode: string
            address: string
            address2: string
            addressID: 0
            assortmentID: 0
            bankAccountNumber: string
            bankName: string
            city: string
            code: string
            companyCode: string
            companyName: string
            companyVatNumber: string
            country: string
            defaultCustomerGroupID: string
            email: string
            fax: string
            iban: string
            isOfflineInventory: string
            name: string
            phone: string
            pricelistID: string
            pricelistID2: string
            pricelistID3: string
            pricelistID4: 0
            pricelistID5: string
            state: string
            storeGroups: string
            storeRegionID: string
            street: string
            swift: string
            timeZone: string
            usesLocalQuickButtons: string
            warehouseID: string
            website: string
        }
    ],
    status: Object
}
