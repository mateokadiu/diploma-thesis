const authorizeRoles = (...roles: any) => {
  return (req: any, res: any, next: any) => {
    if (!roles.includes(res.locals.user.role)) {
      return res.status(403).send({
        message: `Role ${res.locals.user.role} is not allowed to access this resource!`,
      });
    }
    next();
  };
};

export default authorizeRoles;
