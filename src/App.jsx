import React, { useState } from "react";
import axios from "axios";
// import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";

function App() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // const override = css`
  //   display: block;
  //   margin: 0 auto;
  //   border-color: red;
  // `;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:3001/check-seo", {
        url: url,
      });
      setResult(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderData = (data) => {
    if (!data) {
      return null;
    }

    return Object.entries(data).map(([key, value]) => (
      <div key={key} className="seo-card-container">
        {" "}
        {/* <div className="seo-card" style={{width:"18rem"}}> */}
        <div className="seo-card">
          {" "}
          <h2 className="text-center">{key}</h2>
          {typeof value === "object" ? renderData(value) : <p className="text-center">{value}</p>}
        </div>
      </div>
    ));
  };

  return (
    <section>
      <div className="container-fluid">
        <div className="form-content">
          <div className="input-container d-flex justify-content-center ">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="input"
                placeholder="Enter any desired URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <button className="btn mx-2" type="submit">
                Check SEO
              </button>
            </form>
          </div>

          {isLoading ? (
            <div className="ls">
              <div className="loading-spinner">
                <ClipLoader
                  // css={override}
                  size={50}
                  color={"#123abc"}
                  loading={isLoading}
                />
              </div>
            </div>
          ) : null}

          {result && (
            <div>
              <h1 className="font-weight-bolder text-center mt-5">
                <em>SEO Results</em>
              </h1>
              <hr />
              <div class="container mt-5">
                {/* <div class="row row-cols-5 row-cols-lg-5 g-2 g-lg-3"> */}
                <div class="row ">
                  <div className="col seo-cards">{renderData(result)}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default App;
