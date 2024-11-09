import { getToken } from "next-auth/jwt";
import {
  NextFetchEvent,
  NextRequest,
  NextResponse,
  NextMiddleware,
} from "next/server";

const onlyAdmin = ["admin"];
const authPage = ["auth"]; // Halaman khusus autentikasi

export default function withAuth(
  middleware: NextMiddleware,
  requireAuth: string[] = []
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname.split("/")[1];

    // Dapatkan token untuk mengecek status login
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // Jika pengguna sudah login dan mencoba akses halaman login, arahkan ke beranda
    if (token && authPage.includes(pathname)) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Cek apakah halaman membutuhkan autentikasi
    if (requireAuth.includes(pathname)) {
      // Jika pengguna tidak memiliki token dan halaman tidak termasuk dalam authPage, arahkan ke login
      if (!token) {
        const url = new URL("/auth/login", req.url);
        url.searchParams.set("callbackUrl", encodeURI(req.url));
        return NextResponse.redirect(url);
      }

      // Jika pengguna bukan admin dan mencoba mengakses halaman admin, arahkan ke beranda
      if (token.role !== "admin" && onlyAdmin.includes(pathname)) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    // Lanjutkan ke middleware berikutnya jika tidak ada kondisi yang terpenuhi
    return middleware(req, next);
  };
}
