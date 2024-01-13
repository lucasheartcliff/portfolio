import {
  GithubOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  MailOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import CertificateCard from "@/components/CertificateCard";
import Link, { SocialLink } from "@/components/Link";
import ProjectGrid from "@/components/ProjectGrid";
import Scroll from "@/components/Scroll";
import Timeline from "@/components/Timeline";
import Block from "@/layouts/Block";
import { Meta } from "@/layouts/Meta";
import Row from "@/layouts/Row";
import profile from "@/public/assets/jsons/profile.json";
import { apiFetch } from "@/services";
import { Main } from "@/templates/Main";
import { capitalize } from "@/utils";
import { GITHUB_PINNED_REPO, WAKATIME_LANGUAGES } from "@/utils/url";

const Index = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [githubProfile, setGithubProfile] = useState<any>({});
  const [pinnedRepos, setPinnedRepos] = useState([]);

  const { username, email, experience, education, certification } = profile;
  useEffect(() => {
    apiFetch(WAKATIME_LANGUAGES)
      .getJsonP()
      .then((r) => r.json())
      .then((d) => {
        console.log("wakatime", d);
        setData(d);
      })
      .catch((e) => console.error(e));
    /*
    apiFetch(GITHUB_PROFILE(username))
      .getJsonP()
      .then((r) => r.json())
      .then((d) => {
        console.log('profile', d.data);
        setGithubProfile(d.data);
      })
      .catch((e) => console.error(e));
*/
    apiFetch(GITHUB_PINNED_REPO(username))
      .get()
      .then((r) => r.json())
      .then((d) => {
        console.log("repos", d);
        setPinnedRepos(
          d.map((v: any) => ({
            ...v,
            url: `https://github.com/${username}/${v.name}`,
            name: capitalize(v.name?.replace(/-/g, " ")),
          }))
        );
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <>
      <Main
        meta={
          <Meta title={githubProfile.name} description={githubProfile.bio} />
        }
      >
        <Row>
          <Block>
            <div className="flex flex-col">
              <span className="text-6xl font-bold text-black">
                {githubProfile.name}
              </span>
              <span className="text-4xl font-semibold italic text-black ">
                {`@${username}`}
              </span>
              <div className="flex flex-1 flex-row items-center justify-between text-2xl text-black hover:no-underline">
                <SocialLink href={`https://github.com/${username}`}>
                  <GithubOutlined />
                </SocialLink>
                <SocialLink href={`https://x.com/${username}`}>
                  <TwitterOutlined />
                </SocialLink>
                <SocialLink href={`https://linkedin.com/in/${username}`}>
                  <LinkedinOutlined />
                </SocialLink>
                <SocialLink href={`https://instagram.com/${username}`}>
                  <InstagramOutlined />
                </SocialLink>
                <SocialLink href={`mailto:${email}`}>
                  <MailOutlined />
                </SocialLink>
              </div>
            </div>
          </Block>
          <Block></Block>
        </Row>
        <Row>
          <Block>
            <div className="flex flex-1 flex-col">
              <span
                id="about"
                className="mb-3 text-4xl font-semibold text-black "
              >
                {"About Me"}
              </span>
              <span>{githubProfile.bio}</span>
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
                items={pinnedRepos}
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
