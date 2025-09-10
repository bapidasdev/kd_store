import jwt from "jsonwebtoken"

export const authSeller = (req, res, next) => {
    try {
        const { tokrn } = req.cookies;
        if (!tokrn) {
            return res.status(401).json({ message: "Unauthorizes", success: false })
        }

        const decoded = jwt.verify(tokrn, process.env.JWT_SECRET);

        if (decoded.email === process.env.SELLER_EMAIL) {
            next()
        }


    }
    catch (error) {
        console.error("Authentication error", error);
        return res.status(401).json({ message: "Unauthorizes", success: false })
    }
}