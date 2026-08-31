export const roleCheck = (...allowedRoles) => {
  const result = (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ok: false, error: `requires one fo this roles ${allowedRoles.join(", ")}`})
    }
    next();
  }
  return result;
}
