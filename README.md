# 🚀 Parth's Memory Lane

## Live Link and Demo
[Live Link](https://memory-lane-ae1f4.web.app)
[Video Demo](https://youtu.be/vOVjoW2NFa0)


## Features

### Home Page:

- View a list of memories.
- Sort memories by timestamp ("newest/oldest first").
- Add new memories.
- Select and view individual memories.

### Selected Memory Page:

- Edit or remove memory details.
- Add or remove photos associated with the memory.

### Share Button:

- Click to copy the link to the clipboard. Anyone with the link can view the page.

## Technical Overview

**Code Structure:**

- The code is organized into `components/page` directories. Each page folder contains the components used within that page.
- Tailwind CSS is utilized for rapid and responsive styling.

**API Service:**

- A service file (`apiService`) is added to handle all API requests throughout the React application.

**Storing Photos:**

- Photos are stored in GCP S3 buckets.
- Download links to the photos are stored in a new table within the database.

**Sorting:**

- Sorting functionality is implemented on the backend for efficiency.

## Getting Started

- Clone this repository and create a new branch with your name.
- Open a pull request on your own instance of the repository.
- Run the API by using `npm run serve:api`.
- Run `npm run build` and `firebase deploy` to build and launch the project 
