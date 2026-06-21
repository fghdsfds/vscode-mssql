/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as path from "path";
import * as fs from "fs";
import * as vscode from "vscode";

export interface ForeignKeyMapping {
    targetTable: string;
    targetColumn: string;
    isQuoteRequired: boolean;
}

export let cachedFKMap: Record<string, ForeignKeyMapping> = {};

const dummyFKMap: Record<string, ForeignKeyMapping> = {
    AssignmentID: {
        targetTable: "tblAssignment",
        targetColumn: "AssignmentID",
        isQuoteRequired: false,
    },
    AssignmentNoteID: {
        targetTable: "tblAssignmentNote",
        targetColumn: "AssignmentNoteID",
        isQuoteRequired: false,
    },
    AssignmentObjectID: {
        targetTable: "tblAssignmentObject",
        targetColumn: "AssignmentObjectID",
        isQuoteRequired: false,
    },
    AssignmentStatusID: {
        targetTable: "tblAssignmentStatus",
        targetColumn: "AssignmentStatusID",
        isQuoteRequired: false,
    },
    AssignmentTypeID: {
        targetTable: "tblAssignmentType",
        targetColumn: "AssignmentTypeID",
        isQuoteRequired: false,
    },
    CustomerID: {
        targetTable: "tblCustomer",
        targetColumn: "CustomerID",
        isQuoteRequired: false,
    },
    CustomerSiteID: {
        targetTable: "tblCustomerSite",
        targetColumn: "CustomerSiteID",
        isQuoteRequired: false,
    },
    DepartmentID: {
        targetTable: "tblDepartment",
        targetColumn: "DepartmentID",
        isQuoteRequired: false,
    },
    DimensionID: {
        targetTable: "tblDimension",
        targetColumn: "DimensionID",
        isQuoteRequired: false,
    },
    EditAssignmentProductID: {
        targetTable: "tblAssignmentProduct",
        targetColumn: "AssignmentProductID",
        isQuoteRequired: false,
    },
    EmployeeInChargeID: {
        targetTable: "tblEmployee",
        targetColumn: "EmployeeID",
        isQuoteRequired: false,
    },
    FromEmployeeID: {
        targetTable: "tblEmployee",
        targetColumn: "EmployeeID",
        isQuoteRequired: false,
    },
    FromStorageID: {
        targetTable: "tblStorage",
        targetColumn: "StorageID",
        isQuoteRequired: false,
    },
    ObjectID: {
        targetTable: "tblObject",
        targetColumn: "ObjectID",
        isQuoteRequired: false,
    },
    ObjectTypeID: {
        targetTable: "tblObjectType",
        targetColumn: "ObjectTypeID",
        isQuoteRequired: false,
    },
    OfficeClerkID: {
        targetTable: "tblEmployee",
        targetColumn: "EmployeeID",
        isQuoteRequired: false,
    },
    OrderID: {
        targetTable: "tblOrder",
        targetColumn: "OrderID",
        isQuoteRequired: false,
    },
    OrderItemID: {
        targetTable: "tblOrderItem",
        targetColumn: "OrderItemID",
        isQuoteRequired: false,
    },
    ParentAssignmentProductID: {
        targetTable: "tblAssignmentProduct",
        targetColumn: "AssignmentProductID",
        isQuoteRequired: false,
    },
    ParentDimensionID: {
        targetTable: "tblDImension",
        targetColumn: "DimensionID",
        isQuoteRequired: false,
    },
    ParentObjectID: {
        targetTable: "tblObject",
        targetColumn: "ParentObjectID",
        isQuoteRequired: false,
    },
    PocketPCID: {
        targetTable: "tblPocketPC",
        targetColumn: "PocketPCID",
        isQuoteRequired: false,
    },
    ProductID: {
        targetTable: "tblProduct",
        targetColumn: "ProductID",
        isQuoteRequired: false,
    },
    QualityControlID: {
        targetTable: "tblQualityControl",
        targetColumn: "QualityControlID",
        isQuoteRequired: false,
    },
    ResponsibleEmployeeID: {
        targetTable: "tblEmployee",
        targetColumn: "EmployeeID",
        isQuoteRequired: false,
    },
    ServiceID: {
        targetTable: "tblService",
        targetColumn: "ServiceID",
        isQuoteRequired: false,
    },
    SignatureID: {
        targetTable: "tblSignature",
        targetColumn: "SignatureID",
        isQuoteRequired: false,
    },
    StorageID: {
        targetTable: "tblStorage",
        targetColumn: "StorageID",
        isQuoteRequired: false,
    },
    SupplierID: {
        targetTable: "tblSupplier",
        targetColumn: "SupplierID",
        isQuoteRequired: false,
    },
    ToEmployeeID: {
        targetTable: "tblEmployee",
        targetColumn: "EmployeeID",
        isQuoteRequired: false,
    },
    UserProfileID: {
        targetTable: "tblUserProfile",
        targetColumn: "UserProfileID",
        isQuoteRequired: false,
    },
};

export async function initializeFKMap(context: vscode.ExtensionContext): Promise<void> {
    try {
        const storagePath = context.globalStorageUri.fsPath;
        if (!fs.existsSync(storagePath)) {
            fs.mkdirSync(storagePath, { recursive: true });
        }

        const filePath = path.join(storagePath, "mssql-fk-map.json");

        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, JSON.stringify(dummyFKMap, null, 4), "utf8");
            cachedFKMap = dummyFKMap;
        } else {
            const data = fs.readFileSync(filePath, "utf8");
            cachedFKMap = JSON.parse(data);
        }
    } catch (err) {
        console.error("Failed to initialize or read virtual FK map:", err);
        // Fallback to dummy mapping if loading fails
        cachedFKMap = dummyFKMap;
    }
}
