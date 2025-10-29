// // backend/server.js
// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Connect to local MongoDB
// mongoose
//   .connect("mongodb://127.0.0.1:27017/healthcare", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("✅ Connected to local MongoDB"))
//   .catch((err) => console.error("❌ DB connection error:", err));

// // Schema for bookings
// const bookingSchema = new mongoose.Schema({
//   name: String,
//   phone: String,
//   slot: String,
//   center: String,
//   date: { type: Date, default: Date.now },
// });

// const Booking = mongoose.model("Booking", bookingSchema);

// // API route to handle booking
// app.post("/api/bookings", async (req, res) => {
//   try {
//     const { name, phone, slot, center } = req.body;
//     if (!name || !phone || !slot || !center)
//       return res.status(400).json({ error: "All fields are required" });

//     const booking = new Booking({ name, phone, slot, center });
//     await booking.save();
//     res.status(201).json({ message: "Booking saved successfully", booking });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // Optional — view all bookings
// app.get("/api/bookings", async (req, res) => {
//   const bookings = await Booking.find();
//   res.json(bookings);
// });

// const PORT = 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// // backend/server.js
// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// mongoose
//   .connect("mongodb://127.0.0.1:27017/healthcare", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("✅ Connected to MongoDB"))
//   .catch((err) => console.error("❌ DB connection error:", err));

// // Booking schema
// const bookingSchema = new mongoose.Schema({
//   name: String,
//   phone: String,
//   slot: String,
//   center: String,
//   date: { type: Date, default: Date.now },
// });

// const Booking = mongoose.model("Booking", bookingSchema);

// // Save booking
// app.post("/api/bookings", async (req, res) => {
//   try {
//     const { name, phone, slot, center } = req.body;
//     if (!name || !phone || !slot || !center)
//       return res.status(400).json({ error: "All fields are required" });

//     const booking = new Booking({ name, phone, slot, center });
//     await booking.save();

//     res.status(201).json({ message: "Booking successful", booking });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // Get all bookings
// app.get("/api/bookings", async (req, res) => {
//   const bookings = await Booking.find();
//   res.json(bookings);
// });

// // 🆕 Get slot booking counts for a given hospital
// app.get("/api/bookings/count/:center", async (req, res) => {
//   try {
//     const center = req.params.center;
//     const counts = await Booking.aggregate([
//       { $match: { center } },
//       { $group: { _id: "$slot", count: { $sum: 1 } } },
//     ]);

//     res.json(counts);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Error fetching counts" });
//   }
// });

// const PORT = 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// mongoose
//   .connect("mongodb://127.0.0.1:27017/healthcare", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("✅ Connected to MongoDB"))
//   .catch((err) => console.error("❌ DB connection error:", err));

// // Schema for booking
// const bookingSchema = new mongoose.Schema({
//   name: String,
//   phone: String,
//   slot: String,
//   center: String,
//   date: { type: Date, default: Date.now },
// });

// const Booking = mongoose.model("Booking", bookingSchema);

// // 📌 Save booking
// app.post("/api/bookings", async (req, res) => {
//   try {
//     const { name, phone, slot, center } = req.body;
//     if (!name || !phone || !slot || !center)
//       return res.status(400).json({ error: "All fields are required" });

//     const booking = new Booking({ name, phone, slot, center });
//     await booking.save();

//     res.status(201).json({ message: "Booking successful", booking });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // 📊 Get all bookings
// app.get("/api/bookings", async (req, res) => {
//   const bookings = await Booking.find();
//   res.json(bookings);
// });

// // app.get("/api/bookings/count/:center", async (req, res) => {
// //   try {
// //     const centerParam = decodeURIComponent(req.params.center);

// //     // Log to check what is received
// //     console.log("Fetching slot counts for:", centerParam);

// //     const counts = await Booking.aggregate([
// //       {
// //         $match: {
// //           center: { $regex: new RegExp(centerParam, "i") }, // case-insensitive match
// //         },
// //       },
// //       {
// //         $group: {
// //           _id: "$slot",
// //           count: { $sum: 1 },
// //         },
// //       },
// //     ]);

// //     // Log aggregation result
// //     console.log("Counts:", counts);

// //     const formatted = counts.map((item) => ({
// //       slot: item._id,
// //       count: item.count,
// //     }));

// //     res.json(formatted);
// //   } catch (err) {
// //     console.error("Error in /api/bookings/count/:center:", err);
// //     res.status(500).json({ error: "Error fetching counts" });
// //   }
// // });

// // 📈 Get slot booking percentages for a hospital
// app.get("/api/bookings/count/:center", async (req, res) => {
//   try {
//     const centerParam = decodeURIComponent(req.params.center);
//     const MAX_CAPACITY = 10; // ✅ Set your slot capacity here

//     const counts = await Booking.aggregate([
//       {
//         $match: {
//           center: { $regex: new RegExp(centerParam, "i") },
//         },
//       },
//       {
//         $group: {
//           _id: "$slot",
//           count: { $sum: 1 },
//         },
//       },
//     ]);

//     // Format the data and calculate percentage
//     const formatted = counts.map((item) => ({
//       slot: item._id,
//       count: item.count,
//       percentage: Math.min(Math.round((item.count / MAX_CAPACITY) * 100), 100),
//     }));

//     res.json(formatted);
//   } catch (err) {
//     console.error("Error in /api/bookings/count/:center:", err);
//     res.status(500).json({ error: "Error fetching counts" });
//   }
// });

// const PORT = 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// supabase
// working...
// backend/server.js
// import express from "express";
// import cors from "cors";
// import { createClient } from "@supabase/supabase-js";

// const app = express();
// app.use(cors());
// app.use(express.json());

// // 🔗 Supabase connection
// const supabaseUrl = "https://oljjxpfamucriqqpmumj.supabase.co/";
// const supabaseKey =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9samp4cGZhbXVjcmlxcXBtdW1qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1NzE2ODYsImV4cCI6MjA3NzE0NzY4Nn0.sPqtQI_67W34uBZtmIRdt8uxuZYpiRaIY2FqpAojLE0"; // or anon key for testing
// const supabase = createClient(supabaseUrl, supabaseKey);

// // ✅ Get all users grouped by slot for City General Hospital (tab-friendly)
// app.get("/api/bookings/center/:center", async (req, res) => {
//   try {
//     const centerParam = decodeURIComponent(req.params.center);

//     // Restrict strictly to City General Hospital
//     if (centerParam !== "City General Hospital") {
//       return res
//         .status(403)
//         .json({ error: "Access restricted to this center only" });
//     }

//     // Fetch bookings for this center
//     const { data, error } = await supabase
//       .from("bookings")
//       .select("*")
//       .eq("center", "City General Hospital")
//       .order("slot", { ascending: true });

//     if (error) {
//       console.error("Supabase error:", error);
//       return res.status(500).json({ error: "Failed to fetch data" });
//     }

//     // Define slots
//     const slots = [
//       "9:00 AM - 10:00 AM",
//       "10:00 AM - 11:00 AM",
//       "11:00 AM - 12:00 PM",
//       "2:00 PM - 3:00 PM",
//     ];

//     // Group data by slot
//     const grouped = {};
//     slots.forEach((slot) => (grouped[slot] = []));
//     data.forEach((record) => {
//       if (grouped[record.slot]) grouped[record.slot].push(record);
//     });

//     res.json(grouped);
//   } catch (err) {
//     console.error("Error fetching City General Hospital data:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // 📌 Save booking
// app.post("/api/bookings", async (req, res) => {
//   try {
//     const { name, phone, slot, center, patient_type } = req.body;
//     console.log("Incoming data:", req.body); // 👈 debug log

//     if (!name || !phone || !slot || !center || !patient_type)
//       return res.status(400).json({ error: "All fields are required" });

//     const { data, error } = await supabase
//       .from("bookings")
//       .insert([{ name, phone, slot, center, patient_type }]); // 👈 same name

//     if (error) throw error;
//     res.status(201).json({ message: "Booking successful", data });
//   } catch (err) {
//     console.error("Error saving booking:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // 📊 Get all bookings
// app.get("/api/bookings", async (req, res) => {
//   const { data, error } = await supabase.from("bookings").select("*");
//   if (error) return res.status(500).json({ error: error.message });
//   res.json(data);
// });

// // 📈 Get booking percentages per slot
// app.get("/api/bookings/count/:center", async (req, res) => {
//   try {
//     const center = decodeURIComponent(req.params.center);
//     const MAX_CAPACITY = 10;

//     const { data, error } = await supabase
//       .from("bookings")
//       .select("slot, center")
//       .eq("center", center);

//     if (error) throw error;

//     // Count per slot manually
//     const counts = {};
//     data.forEach((b) => {
//       counts[b.slot] = (counts[b.slot] || 0) + 1;
//     });

//     const formatted = Object.entries(counts).map(([slot, count]) => ({
//       slot,
//       count,
//       percentage: Math.min(Math.round((count / MAX_CAPACITY) * 100), 100),
//     }));

//     res.json(formatted);
//   } catch (err) {
//     console.error("Error fetching slot counts:", err);
//     res.status(500).json({ error: "Error fetching counts" });
//   }
// });

// const PORT = 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// ->

import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

const app = express();
app.use(cors());
app.use(express.json());

// 🔗 Supabase connection
const supabaseUrl = "https://oljjxpfamucriqqpmumj.supabase.co/";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9samp4cGZhbXVjcmlxcXBtdW1qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1NzE2ODYsImV4cCI6MjA3NzE0NzY4Nn0.sPqtQI_67W34uBZtmIRdt8uxuZYpiRaIY2FqpAojLE0"; // or anon key for testing
const supabase = createClient(supabaseUrl, supabaseKey);

// ✅ Get all users grouped by slot for City General Hospital (tab-friendly)
app.get("/api/bookings/center/:center", async (req, res) => {
  try {
    const centerParam = decodeURIComponent(req.params.center);

    // Restrict strictly to City General Hospital
    if (centerParam !== "City General Hospital") {
      return res
        .status(403)
        .json({ error: "Access restricted to this center only" });
    }

    // Fetch bookings for this center
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("center", "City General Hospital")
      .order("slot", { ascending: true });

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ error: "Failed to fetch data" });
    }

    // Define slots
    const slots = [
      "9:00 AM - 10:00 AM",
      "10:00 AM - 11:00 AM",
      "11:00 AM - 12:00 PM",
      "2:00 PM - 3:00 PM",
    ];

    // Group data by slot
    const grouped = {};
    slots.forEach((slot) => (grouped[slot] = []));
    data.forEach((record) => {
      if (grouped[record.slot]) grouped[record.slot].push(record);
    });

    res.json(grouped);
  } catch (err) {
    console.error("Error fetching City General Hospital data:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 📌 Save booking
app.post("/api/bookings", async (req, res) => {
  try {
    const { name, phone, slot, center, patient_type } = req.body;
    console.log("Incoming data:", req.body); // 👈 debug log

    if (!name || !phone || !slot || !center || !patient_type)
      return res.status(400).json({ error: "All fields are required" });

    const { data, error } = await supabase
      .from("bookings")
      .insert([{ name, phone, slot, center, patient_type }]); // 👈 same name

    if (error) throw error;
    res.status(201).json({ message: "Booking successful", data });
  } catch (err) {
    console.error("Error saving booking:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// 📊 Get all bookings
app.get("/api/bookings", async (req, res) => {
  const { data, error } = await supabase.from("bookings").select("*");
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// 📈 Get booking percentages per slot
app.get("/api/bookings/count/:center", async (req, res) => {
  try {
    const center = decodeURIComponent(req.params.center);
    const MAX_CAPACITY = 10;

    const { data, error } = await supabase
      .from("bookings")
      .select("slot, center")
      .eq("center", center);

    if (error) throw error;

    // Count per slot manually
    const counts = {};
    data.forEach((b) => {
      counts[b.slot] = (counts[b.slot] || 0) + 1;
    });

    const formatted = Object.entries(counts).map(([slot, count]) => ({
      slot,
      count,
      percentage: Math.min(Math.round((count / MAX_CAPACITY) * 100), 100),
    }));

    res.json(formatted);
  } catch (err) {
    console.error("Error fetching slot counts:", err);
    res.status(500).json({ error: "Error fetching counts" });
  }
});

// ✅ Toggle check-in status (UUID-safe)
app.put("/api/bookings/checkin/:id", async (req, res) => {
  try {
    const { id } = req.params; // This is a UUID string
    const { checkin } = req.body;

    const checkinTime = checkin ? new Date().toISOString() : null;

    console.log("Updating booking UUID:", id, "→ checkin:", checkin);

    const { data, error } = await supabase
      .from("bookings")
      .update({ checkin, checkinTime })
      .eq("id", id) // ✅ UUID string, not parsed integer
      .select("*");

    if (error) {
      console.error("Supabase update error:", error);
      return res.status(500).json({ error: "Failed to update check-in" });
    }

    if (!data || data.length === 0) {
      console.warn("⚠️ No booking found for id:", id);
      return res.status(404).json({ error: "Booking not found" });
    }

    console.log("✅ Updated booking:", data[0]);
    res.json(data[0]);
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
