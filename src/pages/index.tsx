import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import CertificateCard from "@/components/CertificateCard";
import ProjectCard from "@/components/ProjectCard";
import Timeline from "@/components/Timeline";
import { Meta } from "@/layouts/Meta";
import { apiFetch } from "@/services";
import { Main } from "@/templates/Main";
import { WAKATIME_LANGUAGES } from "@/utils/url";

const Index = () => {
  const router = useRouter();
  const [data, setData] = useState([]);

  useEffect(() => {
    apiFetch(WAKATIME_LANGUAGES)
      .get()
      .then((r) => r.json())
      .then((d) => {
        setData(d);
      })
      .catch((e) => console.error(e));
  }, []);
  const randomDataArray = [
    {
      title: "Node1",
      startTime: "2022-01-01",
      endTime: "2022-03-15",
      children: [
        {
          title: "Node1.1",
          startTime: "2022-02-01",
          endTime: "2022-02-28",
        },
        {
          title: "Node1.2",
          startTime: "2022-03-01",
          endTime: "2022-03-15",
        },
      ],
    },
    {
      title: "Node2",
      startTime: "2021-11-01",
      endTime: "2022-01-15",
    },
    {
      title: "Node3",
      startTime: "2023-04-01",
    },
    {
      title: "Node4",
      startTime: "2023-01-01",
      endTime: "2023-02-15",
      children: [
        {
          title: "Node4.1",
          startTime: "2023-02-01",
          endTime: "2023-02-15",
        },
      ],
    },
    {
      title: "Node5",
      startTime: "2022-09-01",
      endTime: "2022-12-31",
      children: [
        {
          title: "Node5.1",
          startTime: "2022-10-01",
          endTime: "2022-11-30",
        },
        {
          title: "Node5.2",
          startTime: "2022-12-01",
          endTime: "2022-12-31",
        },
      ],
    },
  ];
  return (
    <>
      <Main
        meta={
          <Meta
            title="Next.js Boilerplate Presentation"
            description="Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework."
          />
        }
      >
        <div className="mx-12">
          <CertificateCard
            name={"Course 123aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}
            platform={"udemy"}
            url={"https://google.com"}
          />
          <ProjectCard
            language="typescript"
            stars={5}
            forks={1}
            name={"Crypt Image"}
            url={""}
          />
          <Timeline data={randomDataArray} />
        </div>
      </Main>
    </>
  );
};

export default Index;
