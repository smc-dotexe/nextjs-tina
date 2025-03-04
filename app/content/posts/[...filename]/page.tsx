import React from "react";
import client from "../../../../tina/__generated__/client";
import Layout from "../../../../components/layout/layout";
import PostClientPage from "./client-page";

export default async function PostPage({
  params,
}: {
  params: { filename: string[] };
}) {
  console.log("$$$$$$$$$PARAMS.FILENAME", params.filename);
  const data = await client.queries.post({
    relativePath: `${params.filename.join("/")}.mdx`,
  });

  return (
    <Layout rawPageData={data}>
      <PostClientPage {...data} />
    </Layout>
  );
}

export async function generateStaticParams() {
  const posts = await client.queries.postConnection();
  const paths = posts.data?.postConnection.edges.map((edge) => ({
    filename: edge.node._sys.breadcrumbs,
  }));
  console.log('PATHSYA', paths)
  return paths || [];
}
