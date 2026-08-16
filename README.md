# ASER Rural Learning Analysis

A product prototype for District Education Officers (DEOs) to monitor
foundational learning levels across states using ASER rural learning data.

## Problem

Students can progress through grades without fully understanding the
foundational concepts required at their current level. This product helps
DEOs identify learning gaps and prioritize areas requiring intervention.

## Features

- State and year based learning dashboard
- Reading and arithmetic performance metrics
- Dynamic risk classification
- Kerala vs Bihar state comparison
- Priority Areas showing learning skills with less than 40% understanding
- Interactive tables using real ASER data
- Excel-based data loading through a Node.js backend

## Tech Stack

- React + Vite
- Node.js + Express
- Axios
- Excel (.xlsx) data
- Power BI for supporting analysis

## Project Structure

```text
ASER-Rural-Learning-Analysis/
├── dataset/
├── powerbi/
└── website/
    ├── client/
    └── server/