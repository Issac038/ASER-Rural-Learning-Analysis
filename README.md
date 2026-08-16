# ASER Rural Learning Analysis

A product prototype designed for **District Education Officers (DEOs)** to monitor foundational learning levels, identify learning gaps, and prioritize areas requiring educational intervention using real ASER rural learning data.

## 🚀 Prototype

**Live Product:**  
https://aser-rural-learning-analysis.vercel.app/

The prototype provides an interactive dashboard where users can filter learning data by state and year, compare states, and identify high-priority learning areas.

---

## 🎯 Problem Statement

Students can progress to higher grades without fully understanding the foundational concepts required at their current level.

Traditional evaluation often focuses on whether students pass or fail, but this does not clearly show **which foundational skills students have actually mastered**.

This product focuses on learning outcomes rather than simply grade progression.

It allows District Education Officers to:

- Monitor foundational learning levels.
- Identify learning gaps across grades and subjects.
- Compare learning outcomes between states.
- Identify areas where student understanding is particularly low.
- Prioritize areas where intervention or additional support may be required.

The goal is to help ensure that students progress through grades with a stronger understanding of their fundamental concepts.

---

## 💡 Product Overview

**ASER Monitor** is a DEO-focused learning analysis dashboard built around real ASER rural learning data.

The product converts raw learning data into actionable views for education administrators.

Instead of requiring a DEO to manually analyse large datasets, the dashboard provides:

1. **Learning Overview**
2. **State Comparison**
3. **Priority Learning Areas**

These views allow decision-makers to move from raw data to potential intervention areas more quickly.

---

## ✨ Key Features

### 1. Learning Overview

The dashboard provides a high-level view of foundational learning performance.

Users can filter the data by:

- State
- Year

The dashboard dynamically updates:

- Reading performance
- Arithmetic performance
- Number of records analysed
- Overall learning risk
- Learning-level records

The underlying values are loaded from the ASER dataset rather than being hardcoded.

---

### 2. State Comparison

The State Comparison page allows users to analyse differences between:

- Kerala
- Bihar

The comparison is based on the learning data available in the ASER dataset.

This helps identify differences in foundational learning outcomes between states.

---

### 3. Priority Learning Areas

The Priority Areas page is designed specifically for educational intervention.

Users can select a state and view learning records where:

> **Understanding < 40%**

These records are classified as **High Priority**.

The view displays information such as:

- State
- Grade
- Subject
- Learning Level
- Percentage of students demonstrating the skill
- Priority level

This allows a DEO to identify specific grades and subjects where additional intervention may be required.

---

### 4. Dynamic Filtering

The prototype includes interactive filters that change the displayed data.

Examples include:

- State selection
- Year selection
- Priority-area filtering

The product therefore demonstrates working software rather than a static dashboard.

---

## 📊 Data

The product uses real **ASER rural learning data** provided as an Excel dataset.

The dataset contains learning information across:

- Years
- States
- Grades
- Subjects
- School types
- Learning levels
- Student understanding percentages

The prototype currently uses two sheets from the dataset:

- **All India**
- **Kerala & Bihar**

The backend reads the Excel workbook and exposes the relevant data through API endpoints.

---

## 🏗️ Architecture

```text
                         ┌──────────────────────┐
                         │      DEO User        │
                         └──────────┬───────────┘
                                    │
                                    ▼
                    ┌────────────────────────────┐
                    │       React Frontend       │
                    │          Vercel            │
                    └────────────┬───────────────┘
                                 │
                                 │ HTTP API
                                 ▼
                    ┌────────────────────────────┐
                    │      Node.js + Express      │
                    │           Render            │
                    └────────────┬───────────────┘
                                 │
                                 ▼
                    ┌────────────────────────────┐
                    │     ASER Excel Dataset      │
                    │      ASER Data Sheet.xlsx   │
                    └────────────────────────────┘
