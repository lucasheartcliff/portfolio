import Switch from "antd/lib/switch";
import React, { useEffect } from "react";

import LanguageChart from "./components/LanguageChart";
import Logo from "./logo";
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
        <Switch checked={darkMode} onChange={setDarkMode} />
        <Logo title={"LucasHeartcliff"} onClick={() => null} />
        {status === "success" ? <LanguageChart data={data} /> : null}
      </div>
    </>
  );
};

export default App;
