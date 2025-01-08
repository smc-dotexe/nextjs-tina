import Layout from "../../../components/layout/layout";
import client from "../../../tina/__generated__/client";
import PostsClientPage from "./client-page";

export default async function PostsPage() {
  const posts = await client.queries.postConnection();
  if (!posts) {
    return null;
  }

  return (
    <Layout rawPageData={posts.data}>
      <div className='flex flex-col items-center justify-center h-full'>
        <PostsClientPage {...posts} />
      </div>
    </Layout>
  );
}
