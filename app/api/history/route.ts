/*
Contentful - translationstudio extension
Copyright (C) 2025 I-D Media GmbH, idmedia.com

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, see https://www.gnu.org/licenses/old-licenses/gpl-2.0.html
*/
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getAlreadyValidatedSessionCookieData } from "utils/AuthUtils";
import TranslationstudioConfiguration from "utils/TranslationstudioConfiguration";

export const dynamic = "force-dynamic";

export type TranslationHistory = {
    "element-uid": string;
    "element-name": string;
    "target-language": string;
    "time-updated": number;
    "time-requested": number;
    "time-intranslation": number;
    "time-imported": number;
}

export async function GET(request: NextRequest)
{
    const space = request.nextUrl.searchParams.get("space") ?? "";
    const entry = request.nextUrl.searchParams.get("entry") ?? "";

    if (space === "" || entry === "")
    {
        return NextResponse.json({ message: "Bad input" }, {
            status: 500
        });
    }
    
    const cookieStore = await cookies();
    const data = await getAlreadyValidatedSessionCookieData(cookieStore);
    if (data === null || !data.token)
    {
        return NextResponse.json({ message: "Access impossible" }, {
            status: 401
        });
    }

    const res = await fetch(TranslationstudioConfiguration.URL + "/translationstudio/history/element?=space=" + space + "&entry=" + entry, {
		method: "GET",
        cache: "no-cache",
		headers:{
			'Content-Type': 'application/json',
            'Authorization': data.token
		}
	});

    if (res.ok)
    {
        const js = await res.json();
        if (js && Array.isArray(js))
            return NextResponse.json(js);
        else
            return NextResponse.json([]);
    }

    const response = NextResponse.json({ message: "Could not fetch history" }, {
        status: res.status
    });
    if (response.cookies.has("tssession"))
        response.cookies.delete("tssession");

    return response;

}