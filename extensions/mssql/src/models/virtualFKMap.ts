/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export interface ForeignKeyMapping {
    targetTable: string;
    targetColumn: string;
    isQuoteRequired: boolean;
}

export const virtualFKMap: Record<string, ForeignKeyMapping> = {
    "EmployeeInChargeID": {
        "targetTable": "tblEmployee",
        "targetColumn": "EmployeeID",
        "isQuoteRequired": false
    },
    "DepartmentCode": {
        "targetTable": "tblDepartment",
        "targetColumn": "DeptCode",
        "isQuoteRequired": true
    }
};
