import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest, res: NextResponse) {
    

    const id = req.body;
    const id1 = req.url.split("/").at(-1);
    console.log(id1);

    // console.log(id);

    return NextResponse.json({ message: "Form submitted successfully",id:id1 });

}