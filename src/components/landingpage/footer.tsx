import Link from "next/link";

export function Footer() {
  return (
    <footer className="p-4 bg-white sm:p-6 dark:bg-gray-800">
      <div className="mx-auto max-w-screen-xl">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center">
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-[#3563E9]">
                MORENT
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-black-900 uppercase dark:text-white">
                About
              </h2>
              <ul className="text-black-600 dark:text-black-400">
                <li className="mb-4">
                  <Link href="/" className="hover:underline">
                    How it Works
                  </Link>
                </li>
                <li className="mb-4">
                  <Link href="/" className="hover:underline">
                    Featured
                  </Link>
                </li>
                <li className="mb-4">
                  <Link href="/" className="hover:underline">
                    Partnership
                  </Link>
                </li>
                <li className="mb-4">
                  <Link href="/" className="hover:underline">
                    Bussiness Relation
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-black-900 uppercase dark:text-white">
                Community
              </h2>
              <ul className="text-black-600 dark:text-black-400">
                <li className="mb-4">
                  <Link href="/" className="hover:underline">
                    Events
                  </Link>
                </li>
                <li className="mb-4">
                  <Link href="/" className="hover:underline">
                    Blog
                  </Link>
                </li>
                <li className="mb-4">
                  <Link href="/" className="hover:underline">
                    Podcast
                  </Link>
                </li>
                <li className="mb-4">
                  <Link href="/" className="hover:underline">
                    Invite a Friend
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-black-900 uppercase dark:text-white">
                Social
              </h2>
              <ul className="text-black-600 dark:text-black-400">
                <li className="mb-4">
                  <Link href="/" className="hover:underline">
                    Discord
                  </Link>
                </li>
                <li className="mb-4">
                  <Link href="/" className="hover:underline">
                    Instagram
                  </Link>
                </li>
                <li className="mb-4">
                  <Link href="/" className="hover:underline">
                    Twitter
                  </Link>
                </li>
                <li className="mb-4">
                  <Link href="/" className="hover:underline">
                    Facebook
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-black-200 sm:mx-auto dark:border-black-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-black-500 sm:text-center dark:text-black-400">
            © 2024{" "}
            <Link href="/" className="hover:underline">
              Morent™
            </Link>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
            <span className="text-sm text-black-500 sm:text-center dark:text-black-400">
              Privacy Policy
            </span>
            <span className="text-sm text-black-500 sm:text-center dark:text-black-400">
              Terms & Condition
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
