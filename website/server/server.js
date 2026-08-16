const express = require("express");
const cors = require("cors");
const XLSX = require("xlsx");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

const filePath = path.join(__dirname, "data", "ASER Data Sheet.xlsx");

const workbook = XLSX.readFile(filePath);

// Read both datasets
const allIndiaSheet = workbook.Sheets["DataSheet (All India)"];
const keralaBiharSheet = workbook.Sheets["DataSheet( Kerala and Bihar)"];

const allIndiaData = XLSX.utils.sheet_to_json(allIndiaSheet, {
    range: 3
});

const keralaBiharData = XLSX.utils.sheet_to_json(keralaBiharSheet, {
    range: 2
});

// All India data
app.get("/api/all-india", (req, res) => {
    res.json(allIndiaData);
});

// Kerala vs Bihar data
app.get("/api/kerala-bihar", (req, res) => {
    res.json(keralaBiharData);
});

// Health check
app.get("/api/health", (req, res) => {
    res.json({
        message: "ASER API is working",
        allIndiaRows: allIndiaData.length,
        keralaBiharRows: keralaBiharData.length
    });
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`All India: ${allIndiaData.length} rows`);
    console.log(`Kerala & Bihar: ${keralaBiharData.length} rows`);
});