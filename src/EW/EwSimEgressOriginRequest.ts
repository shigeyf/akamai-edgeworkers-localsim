/**
 * tests/akamai-edgeworkers-localsim/EW/EwSimEgressOriginResponse.ts
 *
 * Copyright (c) 2021 Shigeyuki Fukushima <shigeyf@outlook.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import { EgressOriginRequest } from "./interfaces";
import { Device, UserLocation } from "./interfaces";
import { EwSimRequest } from "./EwSimRequest";

export class EwSimEgressOriginRequest extends EwSimRequest implements EgressOriginRequest {
    private readonly _headers: { [key: string]: string[] };
    private _variables: { [key: string]: string };

    constructor(
        host: string,
        method: string,
        path: string,
        scheme: string,
        query: string,
        url: string,
        cpCode: number,
        userLocation?: UserLocation,
        decice?: Device,
        headers?: { [key: string]: string[] },
        variables?: { [key: string]: string }
    ) {
        super(host, method, path, scheme, query, url, cpCode, userLocation, decice);
        this._headers = {};
        this._variables = {};
        if (headers != undefined) {
            Object.keys(headers).forEach((key) => {
                this._headers[key] = headers[key];
            });
        }
        if (variables != undefined) {
            Object.keys(variables).forEach((key) => {
                this._variables[key] = variables[key];
            });
        }
    }

    //
    // Implementations for HasRespondWith interfaces
    //
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/ban-types
    respondWith(status: number, headers: object, body: string, deny_reason?: string): void {
        // To Be Implemented - No implementation currently
        return;
    }

    //
    // Implementations for MutatesVariables interfaces
    //
    setVariable(name: string, value: string): void {
        this._variables[name] = value;
    }

    //
    // Implementations for ReadsHeaders interfaces
    //
    getHeader(name: string): string[] | null {
        if (Object.prototype.hasOwnProperty.call(this._headers, name)) {
            return this._headers[name];
        }
        return null;
    }

    //
    // Implementations for ReadsVariables interfaces
    //
    getVariable(name: string): string | undefined {
        if (Object.prototype.hasOwnProperty.call(this._variables, name)) {
            return this._variables[name];
        }
        return undefined;
    }
}
