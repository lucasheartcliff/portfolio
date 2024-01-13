import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import CertificateCard from "@/components/CertificateCard";
import ProjectCard from "@/components/ProjectCard";
import ProjectGrid from "@/components/ProjectGrid";
import Scroll from "@/components/Scroll";
import Timeline from "@/components/Timeline";
import Block from "@/layouts/Block";
import { Meta } from "@/layouts/Meta";
import Row from "@/layouts/Row";
import profile from "@/public/assets/jsons/profile.json";
import { apiFetch } from "@/services";
import { Main } from "@/templates/Main";
import { WAKATIME_LANGUAGES } from "@/utils/url";

const Index = () => {
  const router = useRouter();
  const [data, setData] = useState([]);

  const { username, email, experience, education, certification } = profile;
  useEffect(() => {
    apiFetch(WAKATIME_LANGUAGES)
      .get()
      .then((r) => r.json())
      .then((d) => {
        setData(d);
      })
      .catch((e) => console.error(e));
  }, []);

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
        <Row>
          <Block>
            <div className="flex flex-col">
              <span className="text-6xl font-bold text-black">
                {"Lucas Morais"}
              </span>
              <span className="text-4xl font-semibold italic text-black ">
                {"@lucasheartcliff"}
              </span>
              <span className="text-2xl">
                {
                  "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat."
                }
              </span>
            </div>
          </Block>
          <Block></Block>
        </Row>
        <Row>
          <Block>
            <div className="flex flex-col">
              <span></span> <span></span>
            </div>
          </Block>
        </Row>
        <Row>
          <Block></Block>
          <Block></Block>
        </Row>
        <Row>
          <Block></Block>
          <Block>
            <div className="flex flex-1 flex-col ">
              <span
                id="experience"
                className="mb-3 text-4xl font-semibold text-black "
              >
                {"Experience"}
              </span>
              <Timeline data={experience} />
            </div>
          </Block>
        </Row>
        <Row>
          <Block>
            <div className="flex flex-1 flex-col">
              <span
                id="education"
                className="mb-3 text-4xl font-semibold text-black "
              >
                {"Education"}
              </span>
              <Timeline data={education} />
            </div>
          </Block>
          <Block></Block>
        </Row>
        <Row>
          <Block></Block>
          <Block>
            <div className="flex flex-1 flex-col">
              <span
                id="certification"
                className="mb-3 text-4xl font-semibold text-black "
              >
                {"Certification"}
              </span>
              <Scroll style={{ height: 400 }}>
                {certification?.map((v, key) => (
                  <div key={key} className="">
                    <CertificateCard key={key} {...v} />
                  </div>
                ))}
              </Scroll>
            </div>
          </Block>
        </Row>
        <Row>
          <Block>
            {" "}
            <div className="flex flex-1 flex-col">
              <span
                id="projects"
                className="mb-3 text-4xl font-semibold text-black "
              >
                {"Open Source Projects"}
              </span>
              <ProjectGrid
                initialItemsCount={8}
                itemsToAdd={8}
                items={[
                  {
                    language: "typescript",
                    name: "Crypt Image",
                    stars: 5,
                    forks: 1,
                    url: "",
                  },
                  {
                    language: "typescript",
                    name: "Crypt Image",
                    stars: 5,
                    forks: 1,
                    url: "",
                  },
                  {
                    language: "typescript",
                    name: "Crypt Image",
                    stars: 5,
                    forks: 1,
                    url: "",
                  },
                  {
                    language: "typescript",
                    name: "Crypt Image",
                    stars: 5,
                    forks: 1,
                    url: "",
                  },
                  {
                    language: "typescript",
                    name: "Crypt Image",
                    stars: 5,
                    forks: 1,
                    url: "",
                  },
                  {
                    language: "typescript",
                    name: "Crypt Image",
                    stars: 5,
                    forks: 1,
                    url: "",
                  },
                  {
                    language: "typescript",
                    name: "Crypt Image",
                    stars: 5,
                    forks: 1,
                    url: "",
                  },
                  {
                    language: "typescript",
                    name: "Crypt Image",
                    stars: 5,
                    forks: 1,
                    url: "",
                  },
                  {
                    language: "typescript",
                    name: "Crypt Image",
                    stars: 5,
                    forks: 1,
                    url: "",
                  },
                  {
                    language: "typescript",
                    name: "Crypt Image",
                    stars: 5,
                    forks: 1,
                    url: "",
                  },
                  {
                    language: "typescript",
                    name: "Crypt Image",
                    stars: 5,
                    forks: 1,
                    url: "",
                  },
                  {
                    language: "typescript",
                    name: "Crypt Image",
                    stars: 5,
                    forks: 1,
                    url: "",
                  },
                ]}
              />
            </div>
          </Block>
        </Row>
        <Row>
          <Block></Block>
        </Row>
      </Main>
    </>
  );
};

export default Index;
