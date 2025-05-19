Calorie Tracker

A full-stack web application to track food intake and calorie count per meal. Built using Next.js, MongoDB, and Express-style API routes. Users can log meals, categorize them, track the date, and manage their entries with the implementation of CRUD operations.

Below is the installation and setup instructions.

Clone the Repo
>> git clone https://github.com/j3dl0/calorie-tracker/tree/main
>> cd calorie-tracker

Install Dependencies
>> npm install

Create a .env.local file (connects to a database)

MONGODB_URI=your_mongodb_connection_string
(You can get this URI from MongoDB Atlas once you create your database)

Start your development server
>> npm run dev

Visit http://localhost:3000 to view the app.

Live Deployment Link
https://vercel.com/j3dl0s-projects/calorie-tracker/4aT5LoUmM7SWLuqti3i8PWMtaGQq

I came up with this simple project idea with the summer coming up and always seeing people posting to get that "summer body". I faced multiple bugs and issues like not handling errors which crashed my app a few times. I liked using the MongoDB. It was easy to use and guided me on how to implement it in my app. I used ChatGPT to help me fix and locate the errors and to also help stylize. It was honestly my first time using ChatGPT and now I know why it is so popular. I decided to add an  overlay in between to help with a more cleaner design. However, I could not figure out how to remove the edge borders so it was a seamless overlay which is annoying. Other than that, I'm pleased with the overall CSS implementations I made. I also decided to add a "meal type" and "date logged" section to add more clarity. If I were to improve this  app, I would probably add a filter where you can search by date or meal type.