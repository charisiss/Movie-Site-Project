import { useRouter } from "next/router";
import Layout from "../../components/layout/Layout";

const HelloPage = () => {
  const router = useRouter();
  return (
    <Layout pageId={router.query.subId}>
      <div>{router.query.subId}</div>
    </Layout>
  );
};

export default HelloPage;
