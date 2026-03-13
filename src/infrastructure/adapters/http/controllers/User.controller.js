class UserController {
  constructor({ createUserUseCase }) {
    this.createUserUseCase = createUserUseCase;
  }

  async create(req, res, next) {
    try {
      const { name, email } = req.body;
      const user = await this.createUserUseCase.execute({ name, email });

      res.status(201).json({
        success: true,
        data: user.toJSON(),
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
