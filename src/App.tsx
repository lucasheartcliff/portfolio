import React, { useEffect } from "react";
import { useTheme } from "./style/themes/use-theme";
import Switch from "antd/lib/switch";
import { CACHE_TIME, useGetRequest } from "./services";
import { WAKATIME_LANGUAGES } from "./utils/url";

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useTheme();
  const query = useGetRequest(WAKATIME_LANGUAGES, { cacheTime: 0 });

  console.log(query);

  useEffect(() => {}, []);
  return (
    <>
      <div className="container">
        <Switch checked={darkMode} onChange={setDarkMode} />
      </div>
    </>
  );
};

export default App;
