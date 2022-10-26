import Switch from "antd/lib/switch";
import React, { useEffect } from "react";
import BaseLayout from "./components/BaseLayout/BaseLayout";

import LanguageChart from "./components/LanguageChart";
import Logo from "./components/logo";
import { CACHE_TIME, useGetRequest } from "./services";
import { useTheme } from "./style/themes/use-theme";
import { WAKATIME_LANGUAGES } from "./utils/url";

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useTheme();
  const { isLoading, data, status } = useGetRequest(WAKATIME_LANGUAGES, {
    cacheTime: CACHE_TIME,
  });

  return (
    <>
      <div className="container">
        <BaseLayout>
          <>
            <Switch checked={darkMode} onChange={setDarkMode} />
            <Logo title={"LucasHeartcliff"} onClick={() => null} />
            {status === "success" ? <LanguageChart data={data} /> : null}
          </>
        </BaseLayout>
      </div>
    </>
  );
};

export default App;
