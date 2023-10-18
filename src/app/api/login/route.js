//make post api call to login
import { NextResponse } from "next/server";
import axios from "axios";
import { BACKEND_URL } from "../config";

export async function POST(request) {
    const { username, password } = await request.json();
    try {
        const { data } = await axios.post(`${BACKEND_URL}auth/signin?username=${username}&password=${password}`);
        return NextResponse.json(data, { status: 200 })
    } catch (error) {
        return NextResponse.json(error.response.data, {status: error.response.status})
    }
}