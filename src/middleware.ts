/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
axios.get('http://localhost:8090/users/verify_token', {
  headers: {
    Authorization: `Bearer ${request.cookies.get('token')?.value}`
  }
}).then((res) => {
localStorage.setItem('token', res.data.token);
console.log(res.data.token);
  return NextResponse.next();
}).catch((err) => {
  return NextResponse.redirect(new URL('/', request.url));
})
}

export const config = {
  matcher: ['/:path*']
}