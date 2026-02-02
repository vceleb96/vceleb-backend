router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  console.log("LOGIN ATTEMPT:");
  console.log("Email from frontend:", JSON.stringify(email));
  console.log("Password from frontend:", JSON.stringify(password));

  const admin = await Admin.findOne({ email });

  if (!admin) {
    console.log("❌ No admin found with this email");
    return res.status(401).json({ message: "Invalid email" });
  }

  console.log("Email in DB:", JSON.stringify(admin.email));
  console.log("Password in DB:", JSON.stringify(admin.password));

  if (password !== admin.password) {
    console.log("❌ Password mismatch");
    return res.status(401).json({ message: "Invalid password" });
  }

  console.log("✅ LOGIN SUCCESS");

  const token = jwt.sign(
    { id: admin._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token });
});
