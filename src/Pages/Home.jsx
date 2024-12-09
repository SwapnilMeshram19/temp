import mapboxgl from "mapbox-gl";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

const accessToken =
  "pk.eyJ1Ijoic3dhcG5pbC1tZXNocmFtIiwiYSI6ImNtNGcxZ3l4aDFiNmgyanNjcXFkb2RuZDEifQ.MBznBP8oQFCIpsgjB9X_TQ";
mapboxgl.accessToken = accessToken;
const Home = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [currentStyle, setCurrentStyle] = useState(
    "mapbox://styles/mapbox/streets-v12"
  );

  const mapStyles = {
    streets: "mapbox://styles/mapbox/streets-v12",
    outdoors: "mapbox://styles/mapbox/outdoors-v12",
    satellite: "mapbox://styles/mapbox/satellite-streets-v12",
    light: "mapbox://styles/mapbox/light-v10",
    dark: "mapbox://styles/mapbox/dark-v10",
  };

  useEffect(() => {
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: currentStyle,
      center: [-74.5, 40],
      zoom: 9,
    });

    mapRef.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    mapRef.current.on("load", () => {
      mapRef.current.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.terrain-rgb",
        tileSize: 512,
        maxzoom: 15,
      });

      mapRef.current.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });

      mapRef.current.addLayer({
        id: "sky",
        type: "sky",
        paint: {
          "sky-type": "atmosphere",
          "sky-atmosphere-sun": [0.0, 0.0],
          "sky-atmosphere-sun-intensity": 15,
        },
      });
    });

    return () => {
      if (mapRef.current) mapRef.current.remove();
    };
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setStyle(currentStyle);

      mapRef.current.on("style.load", () => {
        mapRef.current.addSource("mapbox-dem", {
          type: "raster-dem",
          url: "mapbox://mapbox.terrain-rgb",
          tileSize: 512,
          maxzoom: 15,
        });

        mapRef.current.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });

        if (!mapRef.current.getLayer("sky")) {
          mapRef.current.addLayer({
            id: "sky",
            type: "sky",
            paint: {
              "sky-type": "atmosphere",
              "sky-atmosphere-sun": [0.0, 0.0],
              "sky-atmosphere-sun-intensity": 15,
            },
          });
        }
      });
    }
  }, [currentStyle]);

  return (
    <>
      <div style={{ position: "relative", height: "100vh" }}>
        <div
          ref={mapContainerRef}
          style={{ width: "100vw", height: "100vh" }}
        />

        <div
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "8px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
            zIndex: 1,
          }}
        >
          <h4>Map Styles</h4>
          <button
            onClick={() => setCurrentStyle(mapStyles.streets)}
            style={{
              margin: "5px",
              padding: "8px 12px",
              borderRadius: "4px",
              cursor: "pointer",
              border: "none",
              background: "#007bff",
              color: "white",
            }}
          >
            Streets
          </button>
          <button
            onClick={() => setCurrentStyle(mapStyles.satellite)}
            style={{
              margin: "5px",
              padding: "8px 12px",
              borderRadius: "4px",
              cursor: "pointer",
              border: "none",
              background: "#28a745",
              color: "white",
            }}
          >
            Satellite
          </button>

          <button
            onClick={() => setCurrentStyle(mapStyles.outdoors)}
            style={{
              margin: "5px",
              padding: "8px 12px",
              borderRadius: "4px",
              cursor: "pointer",
              border: "none",
              background: "#6c757d",
              color: "white",
            }}
          >
            Outdoors
          </button>
          <button
            onClick={() => setCurrentStyle(mapStyles.light)}
            style={{
              margin: "5px",
              padding: "8px 12px",
              borderRadius: "4px",
              cursor: "pointer",
              border: "none",
              background: "#6c757d",
              color: "white",
            }}
          >
            Light
          </button>
          <button
            onClick={() => setCurrentStyle(mapStyles.dark)}
            style={{
              margin: "5px",
              padding: "8px 12px",
              borderRadius: "4px",
              cursor: "pointer",
              border: "none",
              background: "#6c757d",
              color: "white",
            }}
          >
            Dark
          </button>
        </div>
      </div>
    </>
  );
};
export default Home;
