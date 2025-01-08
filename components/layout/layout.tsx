import React, { PropsWithChildren } from "react";
import client from "../../tina/__generated__/client";
import { cn } from "../../lib/utils";

type LayoutProps = PropsWithChildren & {
  rawPageData?: any;
};

export default async function Layout({ children }: LayoutProps) {
  await client.queries.global({
    relativePath: "index.json",
  });

  return (
    <main
      className={cn(
        "font-sans flex-1 text-gray-800 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-1000 flex flex-col"
      )}
    >
      {children}
    </main>
    // <div>
    //   <h2>from components/layout</h2>
    //   <Link href="/content/posts">Posts</Link>
    //   {children}
    // </div>
    // <LayoutProvider globalSettings={globalData.global} pageData={rawPageData}>
    //   <Header />
    //   <main
    //     className={cn(
    //       "font-sans flex-1 text-gray-800 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-1000 flex flex-col"
    //     )}
    //   >
    //     {children}
    //   </main>
    //   <Footer />
    // </LayoutProvider>
  );
}
