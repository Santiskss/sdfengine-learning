const CreateUserDto = require('../../../../application/useCases/user/dto/CreateUser.dto');

class UserController {
  /**
   * @param {object} params
   * @param {import('../../../../application/useCases/user/CreateUser.useCase')} params.createUserUseCase
   */
  constructor({ createUserUseCase }) {
    this.createUserUseCase = createUserUseCase;
  }

  /**
   * POST /api/users
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async create(req, res, next) {
    try {
      const dto = new CreateUserDto(req.body);
      const user = await this.createUserUseCase.execute(dto);

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
