// import { NextResponse } from "next/server";
// import connect from "@/lib/db"
// import { NextApiRequest, NextApiResponse } from "next";
// export const GET = async (req: NextApiRequest,
//     res: NextApiResponse) => {
//     try {

import { auth } from "@/auth";

//         return new NextResponse(JSON.stringify());
//     } catch (error: any) {
//         return new NextResponse(error.message, { status: 500 });
//     }
// }
export const GET = auth((req) => {
    if (req.auth) {
        return Response.json({ data: "Protected data" });
    }

    return Response.json({ message: "Not authenticated" }, { status: 401 });
}) as any;