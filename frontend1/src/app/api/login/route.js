const { NextResponse } = require("next/server");

export async function POST(request){
    const {username, lozinka}= await request.json()
    const stvarnaLozinka = process.env.ADMIN_LOZINKA || 'S1fr@'
    const stvarniUsername = process.env.ADMIN_USERNAME || 'admin1'
    if(stvarnaLozinka !==lozinka){
        return NextResponse.json({erros:'Pogresna lozinka'},{status:401})
    }
    if(stvarniUsername !==username){
        return NextResponse.json({erros:'Pogresni username'},{status:401})
    }
    const res = NextResponse.json({succes:true})
    res.cookies.set('admin_token','ulogovan',{
        httpOnly:true,
        secure:true,
        path:'/',
        maxAge:60*60*24*7,
        sameSite:'lax'
    })
    return res

}