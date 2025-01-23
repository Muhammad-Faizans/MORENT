// 'use client'

// import { signIn } from "next-auth/react"
// import Image from "next/image"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// export default function SignIn() {
//   return (
//     <div className="min-h-screen bg-[#F6F7F9] flex items-center justify-center p-4">
//       <Card className="w-full max-w-md">
//         <CardHeader className="space-y-1">
//           <CardTitle className="text-2xl font-bold text-center">Welcome to MORENT</CardTitle>
//           <CardDescription className="text-center">
//             Sign in to access your account
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <Button
//             className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 border hover:bg-gray-50"
//             onClick={() => signIn('google', { callbackUrl: '/' })}
//           >
//             <Image
//               src="/google.svg"
//               alt="Google"
//               width={20}
//               height={20}
//             />
//             Sign in with Google
//           </Button>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

'use client'

import { signIn } from "next-auth/react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SignIn() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="relative max-w-2xl w-full p-8 rounded-3xl shadow-xl bg-white flex flex-col items-center">
        {/* Decorative Circle */}
        <div className="absolute -top-8 -right-8 bg-purple-200 rounded-full w-32 h-32 transform rotate-45 blur-lg opacity-30"></div>
        <div className="absolute -bottom-8 -left-8 bg-pink-200 rounded-full w-32 h-32 transform rotate-45 blur-lg opacity-30"></div>

        {/* Logo */}
        <div className="mb-6 text-[#3563E9] text-[28px] md:text-[32px] font-bold leading-[36px]">
         MORENT
        </div>

        {/* Card Content */}
        <Card className="w-full bg-transparent">
          <CardHeader className="text-center space-y-3">
            <CardTitle className="text-4xl font-extrabold text-gray-800">
              Welcome Back!
            </CardTitle>
            <CardDescription className="text-gray-500">
              Sign in to continue exploring MORENT.
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-6">
            <Button
              className="w-full flex items-center justify-center gap-3 py-3 rounded-lg border bg-gray-50 hover:bg-gray-100 text-gray-800 shadow-md transition-all duration-300"
              onClick={() => signIn('google', { callbackUrl: '/' })}
            >
              <Image
                src="/google.svg"
                alt="Google"
                width={24}
                height={24}
              />
              <span className="font-medium text-lg">Sign in with Google</span>
            </Button>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 mt-8">
          By signing in, you agree to our{" "}
          <a href="/terms" className="text-purple-600 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-purple-600 hover:underline">
            Privacy Policy
          </a>.
        </div>
      </div>
    </div>
  )
}
