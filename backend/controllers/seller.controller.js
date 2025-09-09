// import jwt from "jsonwebtoken"

// //seller login /api/seller/login
// export const sellerLogin = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         if (email === process.env.SELLER_EMAIL && password === process.env.SELLER_PASSWORD) {
//             const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "7d", })

//             res.cookie("sellerToken", token, {
//                 httpOnly: true,
//                 secure: process.env.NODE_ENV === "production",
//                 sameSite: process.env.NODE_ENV === "production" ? "none" : "Strict", maxAge: 7 * 24 * 60 * 60 * 1000
//             });

//             res.status(200).json({ message: "Login successful", success: true })
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Internal server error" })
//     }
// }

// // logout seller : /api/seller/logout
// export const sellerLogout = async (req, res) => {
//     try {
//         res.clearCookie("sellerToken", {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === "production",
//             sameSite: process.env.NODE_ENV === "production" ? "none" : "Strict",
//         });
//         res.status(200).json({ message: "Logout successful", success: true })
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Internal server error" })
//     }
// }

// //check auth seller /api/seller/is-auth

// export const isAuthSeller = async (req, res) => {
//     try {
//         res.status(200).json({
//             success: true
//         })
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Internal server error" })
//     }
// }
















import jwt from "jsonwebtoken";

// ================== SELLER LOGIN ==================
export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check env credentials
    if (email === process.env.SELLER_EMAIL && password === process.env.SELLER_PASSWORD) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "7d" });

      // ✅ Set cookie correctly for cross-site (Vercel)
      res.cookie("sellerToken", token, {
        httpOnly: true,
        secure: true,         // must be true on HTTPS
        sameSite: "none",     // required for cross-site cookies
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      return res.status(200).json({ message: "Login successful", success: true });
    }

    // wrong credentials
    res.status(400).json({ message: "Invalid seller credentials", success: false });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ================== SELLER LOGOUT ==================
export const sellerLogout = async (req, res) => {
  try {
    res.clearCookie("sellerToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(200).json({ message: "Logout successful", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ================== CHECK AUTH SELLER ==================
export const isAuthSeller = async (req, res) => {
  try {
    const token = req.cookies.sellerToken;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      res.status(200).json({ success: true, seller: decoded });
    } catch (err) {
      return res.status(401).json({ message: "Invalid token", success: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
