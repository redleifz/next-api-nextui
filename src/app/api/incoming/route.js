import { NextResponse } from "next/server";
import axios from "axios";
import { BACKEND_URL } from "../config";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const startDateTime = searchParams.get("startDateTime");
    const endDateTime = searchParams.get("endDateTime");
    const page = searchParams.get("page");
    const size = searchParams.get("size");

    const headers = new Headers(req.headers);
    const token = headers.get('authorization')?.slice(7);
   
    try {
        const { data } = await axios.get(
            `${BACKEND_URL}view/report/incoming?startDateTime=${startDateTime}%2000%3A00%3A00&endDateTime=${endDateTime}%2000%3A00%3A00&page=${page}&size=${size}`
            , {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        return NextResponse.json(data, { status: 200 })
    }
    catch (error) {
        return NextResponse.json(error.response.data, { status: error.response.status })
    }
}
