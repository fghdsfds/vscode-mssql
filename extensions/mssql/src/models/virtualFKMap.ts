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
    EmployeeInChargeID: {
        targetTable: "tblEmployee",
        targetColumn: "EmployeeID",
        isQuoteRequired: false,
    },
    CustomerID: {
        targetTable: "tblCustomer",
        targetColumn: "CustomerID",
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
