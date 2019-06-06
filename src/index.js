import React, { useState } from "react";
import { CloudinaryContext, Image, Transformation } from "cloudinary-react";
import ReactDOM from "react-dom";
import axios from "axios";
import "bulma/css/bulma.css";

import "./styles.css";

// Font Families and theme colors
const fontFamilies = [
  "Arial",
  "Verdana",
  "Helvetica",
  "Courier",
  "Comic Sans MS",
  "Trebuchet MS",
  "Courier New"
];
const darkColors = ["black", "Navy", "DarkGreen"];
const lightColors = ["yellow", "orange"];

// Generate random font-family
const randomFamily = () => {
  const randomIndex = Math.floor(Math.random() * fontFamilies.length - 1);

  return fontFamilies[randomIndex];
};

// Generate random background color
const randomBackground = type => {
  if (type === "light") {
    const randomLightColorIndex = Math.floor(
      Math.random() * lightColors.length
    );
    return lightColors[randomLightColorIndex];
  }
  if (type === "dark") {
    const randomDarkColorIndex = Math.floor(Math.random() * darkColors.length);
    return darkColors[randomDarkColorIndex];
  }
};

function App() {
  const [image, setImage] = useState(null);
  const [bannerWidth, setBannerWidth] = useState(1000);
  const [theme, setTheme] = useState("dark");
  const [articleTitle, setArticleTitle] = useState(null);

  // Fetch Image from custom API
  const fetchImage = () => {
    axios
      .get("https://image-generator-api.williamimoh.now.sh/api/random-photo")
      .then(res => {
        console.log(res.data);
        setImage(res.data.id);
      })
      .catch(err => console.log(err));
  };

  const handleTitle = e => {
    setArticleTitle(e.target.value);
  };

  const handleTheme = e => {
    setTheme(e.target.value);
  };

  const handleWidth = e => {
    setBannerWidth(+e.target.value);
  };

  return (
    <div className="App content">
      <div style={{ paddingTop: "30px" }}>
        <h1>Auto Banner Image Maker</h1>
        <h2>Made with ❤️ ❤️ from Unsplash, Cloudinary and by Chuloo</h2>
      </div>

      <div className="controls">
        <form>
          <div className="field">
            <label className="label">Article Title</label>
            <div className="control">
              <input
                className="input"
                value={articleTitle}
                onChange={handleTitle}
                type="text"
                placeholder="Insert article title"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Width</label>
            <div className="control">
              <div className="select">
                <select value={bannerWidth} onChange={handleWidth}>
                  <option value="1000">1000px</option>
                  <option value="500">500px</option>
                </select>
              </div>
            </div>
          </div>

          <div class="field">
            <label class="label">Theme</label>
            <div className="control">
              <div className="select">
                <select value={theme} onChange={handleTheme}>
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                </select>
              </div>
            </div>
          </div>

          <button type="button" className="button is-link" onClick={fetchImage}>
            Fetch Image
          </button>
        </form>
      </div>

      <CloudinaryContext cloudName="chuloo">
        <Image publicId={image} width="auto">
          <Transformation width={bannerWidth} crop="scale" />
          <Transformation quality="auto" fetchFormat="auto" />
          <Transformation background={randomBackground(theme)} opacity="20" />
          <Transformation
            width={bannerWidth > 700 ? "800" : "450"}
            height={bannerWidth > 700 ? "360" : "180"}
            overlay={{
              fontFamily: `${randomFamily()}`,
              fontSize: `${bannerWidth > 700 ? "80" : "40"}`,
              fontWeight: "bold",
              textAlign: "center",
              text: `${articleTitle}`,
              width: "50"
            }}
            color={theme === "dark" ? "white" : "black"}
            crop="fit"
          />
        </Image>
      </CloudinaryContext>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
