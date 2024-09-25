import TrendMainContainer from "@/trend/containers/TrendMainContainer";
import TrendSub from "@/trend/components/TrendSub";
import Head from "next/head";

export const metadata = {
  title: '최신 연구 트렌드',
  description: '최신 연구 트렌드',
};

const Trend = () => {
  return (
    <>
      <Head>
        <title>최신 연구 트렌드</title>
      </Head>
      <TrendMainContainer/>
    </>
  );
};

export default Trend;
