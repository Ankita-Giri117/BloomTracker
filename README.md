# 🌍 Bloom Tracker Dashboard

A dynamic dashboard to **visualize and track plant blooming events (NDVI) across time** using NASA MODIS data and Google Earth Engine (GEE). This project was developed for hackathon submission to monitor, predict, and manage vegetation changes worldwide.



## 🔗 Live App

The dashboard is deployed as a **Google Earth Engine app**:  
[🌸 Open Bloom Tracker Dashboard](https://bloom-time-lapse-map.projects.earthengine.app/view/bloom-tracker-dashboard)


## 📌 Features

- **Year Selector**: Choose from multiple years (2015, 2018, 2020, 2023, 2025).  
- **NDVI Slider**: Scroll through images of plant vegetation over the selected year.  
- **Dynamic Date Label**: Shows the date corresponding to the current NDVI image.  
- **Click-to-Chart**: Click on the map to generate a time series chart of NDVI for that location.  
- **Interactive Map**: Zoom, pan, and explore NDVI globally.  
- **Optimized for Performance**: Limits images to 50 per year for smooth interaction.


## 🗂 Folder Structure
BloomTracker\
├─ gee_main.js # Main GEE script for deployment \
├─ ndviLayer.js # NDVI data loading and visualization \
├─ uiPanel.js # UI panel, slider, year selector \
├─ chartHandler.js # Map click and NDVI chart functionality \
├─ dataUtils.js # Helper functions (date preprocessing) \
├─ extraUtils.js # Additional utilities and formatting functions \
├─ README.md # Project description and instructions 



## 🛠 How to Run

### 1. In Google Earth Engine

1. Open [GEE Code Editor](https://code.earthengine.google.com/).  
2. Copy the contents of `gee_main.js` into a new script.  
3. Run the script.  
4. Interact with the dashboard:  
   - Change year with the dropdown  
   - Use slider to scroll through NDVI images  
   - Click on the map to generate NDVI charts  

### 2. Locally / GitHub

- All modular files are included for reference and future development.  
- This project is structured to allow modular expansion for additional features like species detection, bloom prediction, or advanced charting.


## 📊 Screenshot / Demo
<img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/a18fd6e7-c5fa-41da-810f-aac8665ba646" />
<img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/97e79c0e-1e74-40d4-ab47-0d1784b5c92a" />
<img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/0970a937-6f10-4e20-b659-ce0f164b8de9" />



## 💡 Hackathon Objective

- Monitor and visualize plant bloom events globally.  
- Provide actionable insights for agriculture, ecological studies, and phenology analysis.  
- Demonstrate scalability and interactivity of NASA MODIS data using GEE.



## 📝 Credits

- Developed using **NASA MODIS NDVI datasets**.  
- Built with **Google Earth Engine** for data processing and visualization.  
- UI developed using **Earth Engine UI API**.  



## ⚡ Future Improvements

- Include **real-time bloom predictions** using machine learning.  
- Add **species-specific bloom tracking**.  
- Integrate **more satellite datasets** for multi-spectral analysis.  

## 👤 Author

**Ankita Giri**  
Hackathon Submission/NASA Space Apps Challenge Noida 2025 \
**Date:** 20th September 2025





