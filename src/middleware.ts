import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware() {
    // Your middleware code here if needed
  },
  {
    callbacks: {
      authorized({ token }) {
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/team-builder/:path*"],
};
