import { Container } from "@mui/material";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useState } from "react";

const Request = dynamic(() => import('../components/Request'), { ssr: false });

export default function Home() {
  const [requested, setRequested] = useState(false);

  return (
    <>
      <Head>
        <title>Request automated demand-responsive bus</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Container>
        {requested
          ? <p>バスを予約しました。</p>
          : <Request onRequested={request => {
            setRequested(true);
          }} />
        }
      </Container>
    </>
  );
}
