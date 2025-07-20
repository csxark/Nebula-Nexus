# 🚀 Mission Control

**Mission Control** is an interactive space dashboard that visualizes real-time data from various space missions. It includes live ISS tracking, Mars weather updates, solar activity, Earth overview, and real-time telemetry — all in a beautiful, unified interface.

<!-- 
![Mission Control Demo](screenshot.png) 
-->

---

## ✨ Features

- 🌏 **Earth Overview:** 3D interactive globe and real-time ISS visualization
- 🛰️ **Live ISS Tracking:** Watch the ISS orbit in real time
- 📈 **Telemetry:** Live satellite data and mission stats
- ☀️ **Solar Activity:** Flare and geomagnetic activity
- 🪐 **Mars Weather:** Atmospheric readings and seasonal data from NASA InSight
- 🧭 **Collapsible Sidebar:** Quick access to missions, space weather, and more
- 💨 **Responsive, Smooth Animations:** Fast, fluid experience on any device

---

## 🚀 Getting Started

1. **Clone the repo:**

    ```
    git clone https://github.com/YOUR_USERNAME/mission-control.git
    cd mission-control
    ```

2. **Install dependencies:**

    ```
    npm install
    # or
    yarn
    ```

3. **Run locally:**

    ```
    npm run dev
    # or
    yarn dev
    ```

4. Open [localhost:5173](http://localhost:5173) in your browser.

---

## 📦 Tech Stack

- **React** — UI, custom hooks, and logic
- **Vite** — Lightning-fast development/build tooling
- **Tailwind CSS** — Utility-first, responsive styling
- **Framer Motion** — Animations and sidebar transitions
- **@react-three/fiber & drei** — For 3D globe rendering
- **External APIs** — Live ISS, Mars weather, and space weather data

---

## 🌐 Data Sources

- [Open Notify – ISS Location](http://open-notify.org/Open-Notify-API/ISS-Location-Now/)
- [NASA InSight Mars Weather](https://mars.nasa.gov/insight/weather/)
- [NOAA SPC, SpaceWeatherLive APIs](https://www.swpc.noaa.gov/)
- (Custom sources for telemetry & satellites)

---


---

## 💡 Customization

- Change the look with `tailwind.config.js` or modify the 3D globe assets in `public/textures/`.
- Point to your telemetry or external APIs by editing the hooks in `src/hooks/`.

---

## 🙏 Credits

- **NASA**, **OpenNotify**, **SWPC**, **SpaceWeatherLive** — Live data APIs
- **Drei/@react-three/fiber** — 3D Earth rendering


---

## 📄 License

MIT  
See [LICENSE](LICENSE) file.

---

## ⭐️ Contribute

Pull requests, issues, and suggestions welcome!  
Let’s build the space dashboard we always wanted.

**Enjoy exploring the universe with Mission Control!**





